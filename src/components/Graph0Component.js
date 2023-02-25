import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import './css/Graph.css';

import {Graph0, Node0, Edge0} from '../lib/Graph0Helper';

const Graph0Component = () => {
    const mountRef = useRef(null);
    useEffect( () => {
        let mRef = mountRef;
        let camera, scene, renderer, controls;
        let g = new Graph0();

        const init = () => {
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xFEFEFE);

            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set( 25, 25, 100);
            camera.lookAt( 0, 0, 0 );

            const light = new THREE.HemisphereLight(0xFFFFFF, 0.55);
            scene.add(light);

            renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );

            controls = new OrbitControls(camera, renderer.domElement);
            controls.target.set(0, 0, 0);
            controls.enableDamping = true;
        
            window.addEventListener( 'resize', onWindowResize );
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

        const nNodes = 20;
        const rnd = Math.random();
        const nScale = 40;
        const initNodes = () => {

            // g.nodes.push(new Node0(new THREE.Vector3(1 * 10,0,0), null))
            // g.nodes.push(new Node0(new THREE.Vector3(0,1 * 10,0), null))
            // g.nodes.push(new Node0(new THREE.Vector3(0.5 * 10,2 * 10,0), null))
            for (let i = 0; i < nNodes; i++) {
                g.nodes.push(new Node0(new THREE.Vector3(Math.random() * nScale, Math.random() * nScale, Math.random() * nScale)))
            }
        
            g.edges.push(new Edge0(g.nodes[0], g.nodes[1]))
            g.edges.push(new Edge0(g.nodes[1], g.nodes[2]))
            g.edges.push(new Edge0(g.nodes[2], g.nodes[0]))

            const geometry = new THREE.SphereGeometry(1.5, 32, 16);
            const material = new THREE.MeshPhongMaterial({color: 0xEEEEEE});
            const sphereMesh = new THREE.Mesh(geometry, material);

            // implement spheres
            for (let i = 0; i < g.nodes.length; i++) {
                // TODO: implement with InstancedMesh instead to reduce number of draw calls.
                const sm = sphereMesh.clone();
                sm.position.x = g.nodes[i].p.x;
                sm.position.y = g.nodes[i].p.y;
                sm.position.z = g.nodes[i].p.z;

                scene.add(sm);
            }

            // implement edges
            const lmat = new THREE.LineBasicMaterial({color: 0xFF0000, transparent: true, opacity: 0.45});

            for (let i = 0; i < g.edges.length; i++) {
                if (g.edges[i].show) {
                    const pts = [g.edges[i].n0.p, g.edges[i].n1.p];
                    const geo = new THREE.BufferGeometry().setFromPoints(pts);
                    const line = new THREE.Line(geo, lmat);
                    
                    scene.add(line);
                }
            }

            // update position to centroid of nodes
            setTargetAverage();
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

            controls.update();
            g.Move(0.95, 0.02);
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

export default Graph0Component;