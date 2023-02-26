import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GUI} from 'three/addons/libs/lil-gui.module.min.js';
import './css/Graph.css';

import SIMSDATA from '../lib/SimMatData';
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
        let line;

        // instancing test
        let instance;
        let lineMaterial;
        const _dummy = new THREE.Object3D();
        const _matrix = new THREE.Matrix4();
        const _quaternion = new THREE.Quaternion();
        const _scale = new THREE.Vector3(1, 1, 1);
        const _axis = new THREE.Vector3();
        const _position = new THREE.Vector3();
        const _points = [];
        const nScale = 60;

        let labelRenderer;
        // let testMesh;

        const params = {
            nodeCount: MAX_NODES,
            threshold: 0.85,
        }

        const init = () => {
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xDEDEDE);

            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(225, 250, 100);
            camera.lookAt(0, 0, 0);

            const light = new THREE.HemisphereLight(0xFFFFFF, 0x999999);
            scene.add(light);

            renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );

            // 2D test
            labelRenderer = new CSS2DRenderer(); // 2D
            labelRenderer.setSize(window.innerWidth, window.innerHeight);
            labelRenderer.domElement.style.position = "absolute";
            labelRenderer.domElement.style.top = "0px";
            document.body.appendChild(labelRenderer.domElement);

            controls = new OrbitControls(camera, labelRenderer.domElement); // 2D
            controls.minDistance = 25;// zoom min
            controls.maxDistance = 700;// zoom max
            controls.target.set(0, 0, 0);
            controls.enableDamping = true;

            // Instanced Object
            instance = new THREE.InstancedMesh(
                new THREE.SphereGeometry(.65, 32, 16),
                new THREE.MeshPhongMaterial({color: 0xFFFFFF}),
                params.nodeCount
            );
            instance.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // will be updated every frame
            // instance.count = 0;
            scene.add(instance);

            // Line Object
            lineMaterial = new THREE.LineBasicMaterial({color: 0xCC00FF, transparent: true, opacity: 0.65});

            // set up GUI
            const gui = new GUI();
            // gui.add(instance, "count", 1, MAX_NODES, 10)
            gui.add(params, "threshold", 0.01, 0.99, 0.01).listen().onChange(() => {
                // params.threshold = value;
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
            // 2D
            const nodeDiv = document.createElement("div");
            nodeDiv.className = "label";
            nodeDiv.textContent = node.w;
            nodeDiv.style.marginTop = "-1em";
            const nodeLabel = new CSS2DObject(nodeDiv);
            nodeLabel.position.set(node.p.x, node.p.y, node.p.z);
            instance.add(nodeLabel);
        }

        const initNodes = () => {
            for (let i = 0; i < params.nodeCount; i++) {
                g.nodes.push(new WN(
                    new THREE.Vector3(
                        Math.random() * 200 - 10,
                        Math.random() * 200 - 10,
                        Math.random() * 200 - 50,
                        ), 
                    WORDS[i]));
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

        const initEdges = () => {
            for (let j = 0; j < params.nodeCount; j++) {
                const row = SIMSDATA[j];
                for (let i = j + 1; i < params.nodeCount; i++) {
                    const e = new WE(g.nodes[j], g.nodes[i])
                    g.edges.push(e);
                    const sim = row[i];
                    if (sim < params.threshold) {
                        e.k = 0.05;
                        e.targetLength = (1.0 - sim) * nScale * 2.0;
                        e.show = false;
                    } else {
                        _points.push(g.nodes[j].p)
                        e.k = 0.5;
                        e.targetLength = (1.0 - sim) * nScale;
                        e.show = true;
                    }
                }
            }

            drawEdges();
        }

        const drawEdges = () => {
            // update edges connections
            for (let i = 0; i < g.edges.length; i++) {
                if (g.edges[i].show) {
                    const pts = [g.edges[i].n0.p, g.edges[i].n1.p];
                    const geo = new THREE.BufferGeometry().setFromPoints(pts);
                    line = new THREE.Line(geo, lineMaterial);
                    
                    scene.add(line);
                }
            }
        }

        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth, window.innerHeight );

            // test
            labelRenderer.setSize(window.innerWidth, window.innerHeight);
        }

        const render = () => {
            if (instance) {
                // instance.rotation.y += 0.0005;
                // instance.updateMatrixWorld();
                scene.rotation.y += 0.0005;
                scene.updateMatrixWorld();
                instance.updateMatrixWorld();
            }

            renderer.render(scene, camera);
            labelRenderer.render(scene, camera); // 2D
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

            render();
            controls.update();
        }

        init();
        initNodes();
        initEdges();
        animate();

        return () => mRef.current.removeChild(renderer.domElement);
    }, []);

    return (
        <div id="Graph" ref={mountRef} />
    )
}

export default WordGraph;