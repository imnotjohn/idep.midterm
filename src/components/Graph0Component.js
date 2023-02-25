import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GUI} from 'three/addons/libs/lil-gui.module.min.js';
import './css/Graph.css';

import {Graph0, Node0, Edge0} from '../lib/Graph0Helper';

const Graph0Component = () => {
    const mountRef = useRef(null);
    const MAX_NODES = 5000;
    useEffect( () => {
        let mRef = mountRef;
        let camera, scene, renderer, controls;
        let g = new Graph0();

        // instancing test
        let instance;
        const _dummy = new THREE.Object3D();
        const _matrix = new THREE.Matrix4();
        const _quaternion = new THREE.Quaternion();
        const _scale = new THREE.Vector3(1, 1, 1);
        const _axis = new THREE.Vector3();
        const _position = new THREE.Vector3();

        const params = {
            nodeCount: 1500,
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

            controls = new OrbitControls(camera, renderer.domElement);
            controls.minDistance = 50;
            controls.maxDistance = 500;
            controls.target.set(0, 0, 0);
            controls.enableDamping = true;

            // Instanced Object
            instance = new THREE.InstancedMesh(
                new THREE.SphereGeometry(.75, 32, 16),
                new THREE.MeshPhongMaterial({color: 0xEEEEEE}),
                params.nodeCount
            );
            instance.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // will be updated every frame
            // instance.count = 0;

            scene.add(instance);

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

        // const nNodes = 20;
        const rnd = Math.random();
        const nScale = 60;
        const initNodes = () => {
            for (let i = 0; i < params.nodeCount; i++) {
                g.nodes.push(new Node0(new THREE.Vector3(Math.random() * (Math.random() * 1.75) * nScale, Math.random() * (Math.random() * 1.75) *nScale, Math.random() * (Math.random() * 1.75) * nScale)))
            }

            for (let i = 0; i < params.nodeCount; i++) {
                const n = g.nodes[i].p;
                _dummy.position.set(n.x, n.y, n.z);
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
        }

        const render = () => {

            if (instance) {
                instance.rotation.y += 0.0005;
                instance.updateMatrixWorld();
            }

            renderer.render(scene, camera);
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

export default Graph0Component;