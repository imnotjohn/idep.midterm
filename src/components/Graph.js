import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import './css/Graph.css';

import {WGraph, WEdge, WNode} from '../lib/GraphHelper';

const Graph = () => {
    const mountRef = useRef(null);
    useEffect( () => {
        let mRef = mountRef;

    // camera params
    const fov = 75;
    const aspect = window.innerWidth/window.innerHeight;  // the canvas default
    const near = 0.1;
    const far = 100; // 5?

    // sphere params
    const radius = window.innerHeight/(10 * window.innerHeight);
    const widthSegments = 16 // 32 default
    const heightSegments = 16 // 16 default

    // light params
    const lightColor = 0xFFFFEE;
    const lightIntensity = 0.55;

    // scene params
    // const sceneBGColor = 0x282c34;
    const sceneBGColor = 0xcccccc;
    // let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    let geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    let renderer = new THREE.WebGLRenderer({alpha: true});
    let canvas = renderer.domElement;
    const light = new THREE.DirectionalLight(lightColor, lightIntensity);

    const wgraph = new WGraph();
    const scene = wgraph.scene;
    scene.add(light);
    scene.background = new THREE.Color(sceneBGColor);
    light.position.set(-1, 2, 4);
    camera.position.z = 18; 

    // TODO: how to set initial lookAt location?
    const calculateVecAverage = (points) => {
        const vec = new THREE.Vector3();
        const len = points.length;

        for (let i = 0; i < len; ++i) {
            vec.x += points[i].x;
            vec.y += points[i].y;
            vec.z += points[i].z;
        }

        return new THREE.Vector3(vec.x/len, vec.y/len, vec.z/len);
    }

    // generate nodes and edges
    const NODES_LENGTH = 1571; // similarityMatrix is 1571 x 1571
    const SCALE = 40.0;
    for (let i = 0; i < NODES_LENGTH; ++i) {
        wgraph.nodes.push(new WNode(new THREE.Vector3(Math.random() * SCALE, Math.random() * SCALE, Math.random() * SCALE)))
    }

    const points = [];
    for (let j = 0; j < NODES_LENGTH; ++j) {
        // const row = sims[j];
        for (let i = j + 1; i < NODES_LENGTH; ++i) {
            const edge = new WEdge(wgraph.nodes[j], wgraph.nodes[i])
            wgraph.edges.push(edge);
            // const sim = row[i];
            // similarity / connection threshhold 0.55
            // SCALE = 4.0
            // if (sim < 0.55) {
            const rndLength = Math.random();
            if (rndLength < 0.85) {
                edge.SpringConstant = 0.05;
                edge.TargetLength = (1.0 - rndLength) * SCALE * 2.0;
                edge.Show = false;
            } else {
                points.push(wgraph.nodes[j].p) // test
                edge.SpringConstant = 0.5;
                edge.TargetLength = (1.0 - rndLength) * SCALE;
                edge.Show = true;
            }
        }
    }

    // orbital controls
    let renderRequested = false; // should render params
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.enableDamping = true;
    renderer.setSize(window.innerWidth, window.innerHeight);   

    let requestRenderIfNotRequested = () => {
        if (!renderRequested) {
            renderRequested = true;
            requestAnimationFrame(animate);
        }
    }

    const resizeRendererToDisplaySize = (renderer) => {
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio;
        const w = canvas.clientWidth * pixelRatio | 0;
        const h = canvas.clientHeight * pixelRatio | 0;
        const needResize = canvas.width !== w || canvas.height !== h;
        if (needResize) {
            renderer.setSize(w, h, false);
        }
        return needResize;
    }

    const animate = () => {
        controls.update();
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        
        // loop
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };

    let onMouseMove = (e) => {
        console.log(`x: ${e.x}, y: ${e.y}`);
    }

    const makeNodeInstance = (scene, geometry, color, points) => {
        // Point
        // const material = new THREE.PointsMaterial();
        // const threeObj = new THREE.Points(geometry, material);
        // Sphere
        const material = new THREE.MeshPhongMaterial({color: color});
        const threeObj = new THREE.Mesh(geometry, material);
        threeObj.position.x = points.x;
        threeObj.position.y = points.y;
        threeObj.position.z = points.z;
        scene.add(threeObj);
    }

    for (let i = 0; i < wgraph.nodes.length; ++i) {
        makeNodeInstance(scene, geometry, 0x666666, wgraph.nodes[i].p);
    }

    // window event listeners
    window.addEventListener('resize', requestRenderIfNotRequested);
    window.addEventListener("mousemove", onMouseMove);
    // Orbital Controls event listeners
    controls.addEventListener('change', requestRenderIfNotRequested);
    document.body.appendChild(canvas);
    
    animate(); // only need to render once
    // wgraph.GetEdgeLines(); // TODO: how to avoid bug that makes initial loading so slow.
    wgraph.Step(0.95, 0.02);
    let centroidVec = calculateVecAverage(points);
    camera.lookAt(centroidVec);
    // clean up to prevent memory leaks
    return () => mRef.current.removeChild(renderer.domElement);
    }, []);

    return (
        <div id="Graph" ref={mountRef} />
    )
}

export default Graph;