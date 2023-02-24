import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GUI} from 'three/addons/libs/lil-gui.module.min.js';
import './css/Graph.css';

import {Graph0, Node0, Edge0} from '../lib/Graph0Helper';

const Graph0Component = () => {
    const mountRef = useRef(null);
    useEffect( () => {
        let mRef = mountRef;
        let camera, scene, renderer, controls;
        let averagedPoints;
        let g = new Graph0();

        const init = () => {
            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
            camera.position.set( 25, 25, 25 );
            camera.lookAt( 0, 0, 0 );

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
            camera.rotation.z = 0;
        }

        const initNodes = () => {
            g.nodes.push(new Node0(new THREE.Vector3(1 * 10,0,0), null))
            g.nodes.push(new Node0(new THREE.Vector3(0,1 * 10,0), null))
            g.nodes.push(new Node0(new THREE.Vector3(0.5 * 10,2 * 10,0), null))
        
            g.edges.push(new Edge0(g.nodes[0], g.nodes[1]))
            g.edges.push(new Edge0(g.nodes[1], g.nodes[2]))
            g.edges.push(new Edge0(g.nodes[2], g.nodes[0]))

            const geometry = new THREE.SphereGeometry(window.innerHeight/(.5*window.innerHeight), 16, 16);
            const material = new THREE.MeshPhongMaterial({color: 0x00FF00});
            const sphereMesh = new THREE.Mesh(geometry, material);

            for (let i = 0; i < g.nodes.length; i++) {
                const sm = sphereMesh.clone();
                sm.position.x = g.nodes[i].p.x;
                sm.position.y = g.nodes[i].p.y;
                sm.position.z = g.nodes[i].p.z;

                scene.add(sm);
            }

            // update position to centroid of nodes
            setTargetAverage();
        }

        const initEdges = () => {
            // TODO: implement edges
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