import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GUI} from 'three/addons/libs/lil-gui.module.min.js';
import './css/Graph.css';

import WORDS from '../lib/SimWords';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';


import {WG, WN, WE} from '../lib/WordGraphHelper';

const WordGraph = () => {
    const mountRef = useRef(null);
    const MAX_NODES = 400;

    useEffect( () => {
        let mRef = mountRef;
        let camera, scene, renderer, controls;
        let g = new WG();

        // instancing test
        let instance;
        const _dummy = new THREE.Object3D();
        const _matrix = new THREE.Matrix4();
        const _quaternion = new THREE.Quaternion();
        const _scale = new THREE.Vector3(1, 1, 1);
        const _axis = new THREE.Vector3();
        const _position = new THREE.Vector3();

        let labelRenderer;
        let testMesh;

        const params = {
            nodeCount: 300,
        }

        const init = () => {
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xFEFEFE);

            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(100, 50, 130);
            camera.lookAt(0, 0, 0);

            const light = new THREE.HemisphereLight( 0xffffff, 0x999999 );
            scene.add(light);

            renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );

            // test
            labelRenderer = new CSS2DRenderer();
            labelRenderer.setSize(window.innerWidth, window.innerHeight);
            labelRenderer.domElement.style.position = "absolute";
            labelRenderer.domElement.style.top = "0px";
            document.body.appendChild(labelRenderer.domElement);

            // controls = new OrbitControls(camera, renderer.domElement);
            controls = new OrbitControls(camera, labelRenderer.domElement);
            controls.minDistance = 50;
            controls.maxDistance = 500;
            controls.target.set(0, 0, 0);
            controls.enableDamping = true;

            // Instanced Object
            instance = new THREE.InstancedMesh(
                new THREE.SphereGeometry(.65, 32, 16),
                new THREE.MeshPhongMaterial({color: 0xEEEEEE}),
                params.nodeCount
            );
            instance.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // will be updated every frame
            // instance.count = 0;

            const testGeom = new THREE.SphereGeometry(3, 32, 16);
            const testMaterial = new THREE.MeshPhongMaterial({color: 0xFF0000});
            testMesh = new THREE.Mesh(testGeom, testMaterial);
            
            scene.add(instance, testMesh);

            // set up GUI
            const gui = new GUI();
            gui.add(params, "nodeCount", 1, MAX_NODES, 10).onChange( function(value) {
                params.nodeCount = value;
            });
        
            window.addEventListener( 'resize', onWindowResize );
            onWindowResize();
        }

        const setTargetAverage = () => {
            const vec = new THREE.Vector3();
            const len = g.nodes.length;
    
            for (let i = 0; i < len; ++i) {
                vec.x += g.nodes[i].p.x;
                vec.y += g.nodes[i].p.y;
                vec.z += g.nodes[i].p.z;
            }

            camera.lookAt(vec.x/len, vec.y/len, vec.z/len);
        }

        const initLabel = (node) => {
            const nodeDiv = document.createElement("div");
            nodeDiv.className = "label";
            nodeDiv.textContent = node.w;
            nodeDiv.style.marginTop = "-1em";
            const nodeLabel = new CSS2DObject(nodeDiv);
            nodeLabel.position.set(node.p.x, node.p.y, node.p.z);
            instance.add(nodeLabel);
        }

        // const nNodes = 20;
        const rnd = Math.random();
        const nScale = 60;
        const initNodes = () => {
            for (let i = 0; i < params.nodeCount; i++) {
                g.nodes.push(new WN(new THREE.Vector3(Math.random() * (Math.random() * 1.75) * nScale, Math.random() * (Math.random() * 1.75) *nScale, Math.random() * (Math.random() * 1.75) * nScale), WORDS[i]));
            }

            for (let i = 0; i < params.nodeCount; i++) {

                const n = g.nodes[i];
                initLabel(n);
                _dummy.position.set(n.p.x, n.p.y, n.p.z);
                _dummy.updateMatrix();
                instance.setMatrixAt(i, _dummy.matrix);
            }

            instance.instanceMatrix.needsUpdate = true;
            instance.geometry.attributes.position.needsUpdate = true;

            // update position to centroid of nodes
            setTargetAverage();
        }

/*
        const initEdges = () => {
            // implement edges
            // const lmat = new THREE.LineBasicMaterial({color: 0xFF0000, transparent: true, opacity: 0.45});

            // for (let i = 0; i < g.edges.length; i++) {
            //     if (g.edges[i].show) {
            //         const pts = [g.edges[i].n0.p, g.edges[i].n1.p];
            //         const geo = new THREE.BufferGeometry().setFromPoints(pts);
            //         const line = new THREE.Line(geo, lmat);
                    
            //         scene.add(line);
            //     }
            // }
        }
*/

        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth, window.innerHeight );

            // test
            labelRenderer.setSize(window.innerWidth, window.innerHeight);
        }

        const render = () => {

            if (instance) {
                instance.rotation.y += 0.0005;
                instance.updateMatrixWorld();
            }

            renderer.render(scene, camera);
            labelRenderer.render(scene, camera);
        }
/*
        const move = () => {
            if (!instance) return;

            instance.getMatrixAt(0, _matrix); // extract position from transformationMatrix
            _position.x += 0.01; // move
            _matrix.setPosition(_position); // write new position to transformationMatrix
            
            instance.setMatrixAt(0, _matrix);
        }
*/

        const animate = () => {
            requestAnimationFrame(animate);

            controls.update();
            // move();
            render();
        }

        init();
        initNodes();
        // move();
        animate();

        return () => mRef.current.removeChild(renderer.domElement);
    }, []);

    return (
        <div id="Graph" ref={mountRef} />
    )
}

export default WordGraph;