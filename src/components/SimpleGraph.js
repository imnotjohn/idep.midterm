import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GUI} from 'three/addons/libs/lil-gui.module.min.js';
import './css/Graph.css';

import SIMSDATA from '../lib/SimMatData';
import WORDS from '../lib/SimWords';
// import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';


import {WG, WN, WE} from '../lib/SimpleGraphHelper';

const SimpleGraph = () => {
    const mountRef = useRef(null);
    const MAX_NODES = 400;

    useEffect( () => {
        let mRef = mountRef;
        let g = new WG();

        // reusable variables
        let camera, scene, renderer, controls; // threejs environment variables
        let lineSegments;
        const _points = [];
        const nScale = 60;

        const params = {
            nodeCount: 10,
            threshold: 0.65,
        }

        const init = () => {
            // threejs Environment
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

            controls = new OrbitControls(camera, renderer.domElement);
            controls.minDistance = 25;// zoom min
            controls.maxDistance = 700;// zoom max
            controls.target.set(0, 0, 0);
            controls.enableDamping = true;

            // set up GUI
            const gui = new GUI();
            // gui.add(sphereInstance, "count", 1, MAX_NODES, 10)
            gui.add(params, "threshold", 0.01, 0.99, 0.01).listen().onChange(() => {
                initEdges();
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

            updateNodes();

            // update position to centroid of nodes
            setTargetAverage();
        }

        const updateNodes = () => {
            for (let i = 0; i < g.nodes.length; i++) {
                let sphereMaterial = new THREE.MeshBasicMaterial();
                let sphereGeometry = new THREE.SphereGeometry(0.75, 32, 16);
                let sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
                sphereMesh.position.x = g.nodes[i].p.x;
                sphereMesh.position.y = g.nodes[i].p.y;
                sphereMesh.position.z = g.nodes[i].p.z;

                scene.add(sphereMesh);
            }
        }

        const initEdges = () => {
            if (g.edges.length > 0) {
                console.log("purged");
                g.PurgeEdges();
            }

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
            let lineNum = 0;

            if (!lineSegments) {
                for (let i = 0; i < g.edges.length; i++) {
                    if (g.edges[i].show) {
                        lineNum++;
                        const pts = [g.edges[i].n0.p, g.edges[i].n1.p];
                        const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
                        lineSegments = new THREE.LineSegments(lineGeo, 
                            new THREE.LineBasicMaterial({
                                color: 0xFF0033,
                                transparent: true,
                                opacity: 0.45,
                                depthWrite: false
                            }));
                        scene.add(lineSegments);
                    }
                } 
            } else {
                // lineSegments already exists
                for (let i = 0; i < scene.children.length; i++) {
                    if (scene.children[i].isLineSegments) {
                        const obj = scene.children[i];
                        obj.geometry.dispose();
                        obj.material.dispose();
                        scene.remove(obj);
                    }
                }
                
                // debugging
                // let lsCount = 0;
                // for (let i = 0; i < scene.children.length; i++) {
                //     if (scene.children[i].isLineSegments) {
                //         lsCount++;
                //     }
                // }
                // console.log(lsCount);
                // console.log(`number of children: ${scene.children.length}`);
                // if (lsCount > 0) {
                //     console.log(scene);
                // }

                for (let i = 0; i < g.edges.length; i++) {
                    if (g.edges[i].show) {
                        lineNum++;
                        const pts = [g.edges[i].n0.p, g.edges[i].n1.p];
                        const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
                        lineSegments.geometry = lineGeo;
                        lineSegments = new THREE.LineSegments(lineGeo, 
                            new THREE.LineBasicMaterial({
                                color: 0xFF0033,
                                transparent: true,
                                opacity: 0.45,
                                depthWrite: false
                            }));
                        scene.add(lineSegments);
                    }
                }
            }

            lineSegments.geometry.setDrawRange(0, lineNum);
            lineSegments.geometry.attributes.position.needsUpdate = true;
        }

        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth, window.innerHeight );
        }

        const render = () => {

            renderer.render(scene, camera);
        }

        const animate = () => {
            requestAnimationFrame(animate);

            render();
            // g.Move(0.95, 0.02);
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

export default SimpleGraph;