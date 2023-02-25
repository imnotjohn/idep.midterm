import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GUI} from 'three/addons/libs/lil-gui.module.min.js';
import './css/Graph.css';

import {Graph0, Node0, Edge0} from '../lib/Graph0Helper';

const NodeSlider = () => {
    const mountRef = useRef(null);
    const MAX_NODES = 500;
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
            nodeCount: 150,
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

        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth, window.innerHeight );
        }

        const initNodes = () => {
            const position = new THREE.Vector3();
            const quaternion = new THREE.Quaternion();
            const scale = new THREE.Vector3( 1, 1, 1 );
            const matrix = new THREE.Matrix4();

            // instance.count = 0;

            for ( let i = 0; i < params.nodeCount; i ++ ) {
                position.randomDirection().multiplyScalar( 3.75 );
                matrix.compose( position, quaternion, scale );
                g.nodes.push(new Node0(position));
                instance.setMatrixAt( i, matrix );
            }
        }

        const updateNodes = () => {
            for (let i = 0; i < params.nodeCount; i++) {
                // get the current origin
                instance.getMatrixAt(i, _matrix);
                _matrix.decompose(_position, _quaternion, _scale);

                // rotate about the origin
                // const offset = 1e-4 * window.performance.now();
                // _axis.set(
                //     Math.sin(i * 100 + offset),
                //     Math.cos(-i * 10 + offset),
                //     Math.sin(i * 1 + offset),
                // ).normalize();
                // _position.applyAxisAngle(_axis, 0.001);
                const n = g.nodes[i].p;
                _position.x = n.x;
                _position.y = n.y;
                _position.z = n.z;

                // update the position
                _scale.setScalar(2.5);
                _matrix.compose(_position, _quaternion, _scale);
                instance.setMatrixAt(i, _matrix);
            }

            instance.instanceMatrix.needsUpdate = true;
            instance.geometry.attributes.position.needsUpdate = true;
        }

        const render = () => {

            if (instance) {
                instance.rotation.y += 0.0005;
            }

            updateNodes();

            renderer.render(scene, camera);
        }

        const animate = () => {
            requestAnimationFrame(animate);

            controls.update();
            render();
        }

        init();
        initNodes();
        animate();

        return () => mRef.current.removeChild(renderer.domElement);
    }, []);

    return (
        <div id="Graph" ref={mountRef} />
    )
}

export default NodeSlider;