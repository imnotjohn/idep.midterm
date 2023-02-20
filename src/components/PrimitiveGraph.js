import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js';
import {GUI} from 'three/addons/libs/lil-gui.module.min.js';
import './css/Graph.css';

import {WGraph, WEdge} from '../lib/GraphHelper';
import SIMSDATA from '../lib/SimMatData';

const PrimitiveGraph = () => {
    const mountRef = useRef(null);

    useEffect( () => {
        let mRef = mountRef;
        let camera, scene, renderer, controls;
        let wgraph = new WGraph();
        const points = [];

        const api = {
        
            count: 400,
            simThreshhold: 0.65,
            distribution: 'random',
            resample: resample,
            surfaceColor: 0xFFF784,
            backgroundColor: 0xCCCCCC,
        
        };
        
        let nodeMesh;
        let nodeGeometry;
        let nodeMaterial;
        
        // let sampler;
        const count = api.count;
        const radius = window.innerHeight/(10 * window.innerHeight);
        const dummy = new THREE.Object3D();
        
        const nodeRadius = window.innerHeight/(10 * window.innerHeight);
        const nodeSurfaceGeometry = new THREE.SphereGeometry( nodeRadius, 16, 16 ).toNonIndexed();
        const nodeSurfaceMaterial = new THREE.MeshLambertMaterial( { color: api.surfaceColor, wireframe: false } );
        const nodeSurface = new THREE.Mesh( nodeSurfaceGeometry, nodeSurfaceMaterial );

        // initialize Meshes
        const initializeMeshes = () => {
        
            // const _stemMesh = gltf.scene.getObjectByName( 'Stem' );
            // const _blossomMesh = gltf.scene.getObjectByName( 'Blossom' );
        
            // lineGeometry = _stemMesh.geometry.clone();
            nodeGeometry = new THREE.SphereGeometry(radius, 16, 16);
        
            // lineMaterial = _stemMesh.material;
            nodeMaterial = new THREE.MeshPhongMaterial({color: api.surfaceColor});
        
            // stem -> lineMesh
            // blossom -> nodeMesh
            // lineMesh = new THREE.InstancedMesh( lineGeometry, lineMaterial, count );
            nodeMesh = new THREE.InstancedMesh( nodeGeometry, nodeMaterial, count );
        
            // Instance matrices will be updated every frame.
            // lineMesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage );
            nodeMesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage );
        
            resample();
            
            init();
            animate();
        };

        const generateEdges = (wg) => {
            for (let j = 0; j < count; j++) {
                const row = SIMSDATA[j];
                for (let i = j + 1; i < count; i++) {
                    const edge = new WEdge(wg.nodes[j], wg.nodes[i]);
                    wg.edges.push(edge);
                    const sim = row[i];
                    if (sim < api["simThreshhold"]) {
                        edge.SpringConstant = 0.05;
                        edge.TargetLength = (1.0 - sim) * 40.0 * 2.0;
                        edge.Show = false;
                    } else {
                        console.log(wg);
                        points.push(wg.nodes[j].p)
                        edge.SpringConstant = 0.5;
                        edge.TargetLength = (1.0 - sim) * 40.0;
                        edge.Show = true;
                    }
                }
            }
            
            wg.GetEdgeLines();
        }

        const makeNodeInstance = (p) => {
            // Sphere
            const _nodeMesh = nodeMesh.clone();
            _nodeMesh.position.x = p.x;
            _nodeMesh.position.y = p.y;
            _nodeMesh.position.z = p.z;
            scene.add(_nodeMesh);
        }

        const generateNodePositions = (count) => {
            for (let i = 0; i < count; i++) {
                const _p = new THREE.Vector3(Math.random() * 40.0, Math.random() * 40.0, Math.random() * 40.0)
                const _u = 1.0;
                wgraph.AddNode(_p, _u);
            }

            for (let i = 0; i < wgraph.nodes.length; i++) {
                makeNodeInstance(wgraph.nodes[i].p);
            }

            generateEdges(wgraph);
        }
        
        const initScene = () => {
            scene.background = new THREE.Color( api.backgroundColor );        
            const pointLight = new THREE.PointLight( 0xAA8899, 0.75 );
            pointLight.position.set( 50, - 25, 75 );
            scene.add( pointLight );
            scene.add( new THREE.HemisphereLight() );
        }

        function init() {
        
            camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 );
            camera.position.set( 25, 25, 25 );
            camera.lookAt( 0, 0, 0 );
        
            //
        
            // scene = new THREE.Scene();
            scene = wgraph.scene;
            initScene(scene);
        
            //
        
            const gui = new GUI({width: 150});
            gui.add( api, 'count', 0, count ).onChange( function () {
                // lineMesh.count = api.count;
                nodeMesh.count = api.count;
        
            } );
        
            // gui.add( api, 'distribution' ).options( [ 'random', 'weighted' ] ).onChange( resample );
            gui.add( api, 'resample' );
        
            //

            generateNodePositions(count);
        
            renderer = new THREE.WebGLRenderer( { alapha: true, antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );
        
            //

            controls = new OrbitControls(camera, renderer.domElement);
            controls.target.set(0, 0, 0);
            controls.enableDamping = true;
        
            window.addEventListener( 'resize', onWindowResize );
        }
        
        function resample() {
            
            wgraph = new WGraph();
            scene = wgraph.scene;
            initScene(scene);
            generateNodePositions(api.count);
            // generateNodePositions(api.count);
        
        }
        
        function onWindowResize() {
        
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        
            renderer.setSize( window.innerWidth, window.innerHeight );
        
        }
        
        //
        
        function animate() {
            
            controls.update();

            requestAnimationFrame( animate );
        
            render();
        
        }
        
        function render() {
        
            // if ( lineMesh && nodeMesh ) {
            if ( nodeMesh ) {    
        
                const time = Date.now() * 0.0001;
        
                // scene.rotation.x = Math.sin( time / 4 );
                scene.rotation.x = Math.sin( time / 8 );
        
                // lineMesh.instanceMatrix.needsUpdate = true;
                // nodeMesh.instanceMatrix.needsUpdate = true;
        
            }
        
            renderer.render( scene, camera );
        
        }

        initializeMeshes();

        return () => mRef.current.removeChild(renderer.domElement);
    }, []);

    return (
        <div id="Graph" ref={mountRef} />
    )
}

export default PrimitiveGraph;