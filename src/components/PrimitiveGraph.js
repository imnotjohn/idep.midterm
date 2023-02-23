import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GUI} from 'three/addons/libs/lil-gui.module.min.js';
import './css/Graph.css';

import {WGraph, WEdge} from '../lib/PrimitiveGraphHelper';
import SIMSDATA from '../lib/SimMatData';
import WORDS from '../lib/SimWords';

const PrimitiveGraph = () => {
    const mountRef = useRef(null);

    useEffect( () => {
        let mRef = mountRef;
        let camera, scene, renderer, labelRenderer, controls;
        let wgraph = new WGraph();
        let points = [];

        const api = {
            
            count: 400,
            simThreshold: 0.75,
            distribution: 'random',
            resample: resample,
            surfaceColor: 0xFFF784,
            backgroundColor: 0xCCCCCC,
        
        };
        
        let nodeMesh;
        let nodeGeometry;
        let nodeMaterial;
        
        const count = api.count;
        const threshold = api.simThreshold;
        const radius = window.innerHeight/(10 * window.innerHeight);

        // initialize Meshes
        const initializeMeshes = () => {
        
            // const _stemMesh = gltf.scene.getObjectByName( 'Stem' );
            // const _blossomMesh = gltf.scene.getObjectByName( 'Blossom' );
        
            // lineGeometry = _stemMesh.geometry.clone();
            nodeGeometry = new THREE.SphereGeometry(radius, 16, 16);
        
            // lineMaterial = _stemMesh.material;
            nodeMaterial = new THREE.MeshLambertMaterial({color: api.surfaceColor, wireframe: false});
        
            // stem -> lineMesh
            // blossom -> nodeMesh
            // lineMesh = new THREE.InstancedMesh( lineGeometry, lineMaterial, count );
            nodeMesh = new THREE.InstancedMesh( nodeGeometry, nodeMaterial, count );
        
            // Instance matrices will be updated every frame.
            // nodeMesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage ); // not sure...
        
            resample();
            
            init();
            animate();
        };

        const generateEdges = () => {
            for (let j = 0; j < count; j++) {
                const row = SIMSDATA[j];
                for (let i = j + 1; i < count; i++) {
                    const edge = new WEdge(wgraph.nodes[j], wgraph.nodes[i]);
                    wgraph.edges.push(edge);
                    const sim = row[i];
                    if (sim < threshold) {
                        edge.SpringConstant = 0.05;
                        edge.TargetLength = (1.0 - sim) * 40.0 * 2.0;
                        edge.Show = false;
                    } else {
                        if (wgraph.nodes.length > 0) {
                            points.push(wgraph.nodes[j].p)
                            edge.SpringConstant = 0.5;
                            edge.TargetLength = (1.0 - sim) * 40.0;
                            edge.Show = true;
                        }
                    }
                }
            }
            
            wgraph.GetEdgeLines();
        }

        const makeNodeInstance = (n) => {
            // Sphere
            const _nodeMesh = nodeMesh.clone();
            _nodeMesh.position.x = n.p.x;
            _nodeMesh.position.y = n.p.y;
            _nodeMesh.position.z = n.p.z;

            // Labels
            // const nodeDiv = document.createElement("div");
            // nodeDiv.className = "label";
            // nodeDiv.textContent = n.w;
            // nodeDiv.style.marginBottom = "-1em";

            // const nodeLabel = new CSS2DObject(nodeDiv);
            // nodeLabel.position.set(n.p); 
            // _nodeMesh.add(nodeLabel);
            // nodeLabel.layers.set(1);

            scene.add(_nodeMesh);
        }

        // const makeNodeWordInstance = (node) => {
        //     // Words
        //     const nodeDiv = document.createElement("div");
        //     nodeDiv.className = "label";
        //     nodeDiv.textContent = node.w;
        //     nodeDiv.style.marginBottom = "-1em";

        //     const nodeLabel = new CSS2DObject(nodeDiv);
        //     nodeLabel.position.set(node.p); 
        //     nodeMesh.add(nodeLabel);
        //     nodeLabel.layers.set(1);
        // }

        const generateNodePositions = (count) => {
            for (let i = 0; i < count; i++) {
                const _p = new THREE.Vector3(Math.random() * 40.0, Math.random() * 40.0, Math.random() * 40.0)
                const _u = 1.0;
                const _w = WORDS[i];
                wgraph.AddNode(_p, _u, _w);
            }

            if (wgraph.nodes.length > 0) {
                for (let i = 0; i < wgraph.nodes.length; i++) {
                    makeNodeInstance(wgraph.nodes[i]);
                    // makeNodeWordInstance(wgraph.nodes[i]);
                }
            } else {
                console.log("poops");
            }

            generateEdges();
        }
        
        const initScene = () => {
            scene.background = new THREE.Color( api.backgroundColor );        
            const pointLight = new THREE.PointLight( 0xAA8899, 0.75 );
            pointLight.position.set( 50, - 25, 75 );
            scene.add( pointLight );
            scene.add( new THREE.HemisphereLight() );
        }

        const initLabelRenderer = () => {
            labelRenderer.setSize(window.innerWidth, window.innerHeight);
            labelRenderer.domElement.style.position = "absolute";
            labelRenderer.domElement.style.top = "0px";
            document.body.appendChild(labelRenderer.domElement);
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
            gui.add( api, 'simThreshold', 0, 1.0, 0.05).onChange( function (value) {
                api.simThreshold = value;
            } );
        
            // gui.add( api, 'distribution' ).options( [ 'random', 'weighted' ] ).onChange( resample );
            gui.add( api, 'resample' );
        
            //

            // generateNodePositions(count);
        
            renderer = new THREE.WebGLRenderer( { alapha: true, antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );
        
            //

            // adding labelRenderer creates significant lag
            // labelRenderer = new CSS2DRenderer();
            // initLabelRenderer();

            //

            controls = new OrbitControls(camera, renderer.domElement);
            controls.target.set(0, 0, 0);
            controls.enableDamping = true;
        
            window.addEventListener( 'resize', onWindowResize );
        }
        
        function resample() {
            
            points = [];
            wgraph = new WGraph();
            scene = wgraph.scene;
            initScene(scene);
            generateNodePositions(api.count);
        
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
                nodeMesh.instanceMatrix.needsUpdate = true;
        
            }
        
            renderer.render( scene, camera );
            // labelRenderer.render( scene, camera );
        }

        initializeMeshes();
        generateNodePositions(count);

        return () => mRef.current.removeChild(renderer.domElement);
    }, []);

    return (
        <div id="Graph" ref={mountRef} />
    )
}

export default PrimitiveGraph;