import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GUI} from 'three/addons/libs/lil-gui.module.min.js';
import './css/Graph.css';

import {WGraph, WEdge, WNode} from '../lib/GraphHelper';
import SIMSDATA from '../lib/SimMatData';

const Graph = () => {
    const mountRef = useRef(null);
    useEffect( () => {
        let mRef = mountRef;

    // camera params
    const fov = 75;
    const aspect = window.innerWidth/window.innerHeight;  // the canvas default
    const near = 10;
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

    // orbital controls
    let renderRequested = false; // should render params
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.enableDamping = true;
    renderer.setSize(window.innerWidth, window.innerHeight);  

    // generate nodes and edges
    const NODES_LENGTH = SIMSDATA.length; // similarityMatrix is 1571 x 1571
    const SCALE = 40.0;
    for (let i = 0; i < NODES_LENGTH; ++i) {
        wgraph.nodes.push(new WNode(new THREE.Vector3(Math.random() * SCALE, Math.random() * SCALE, Math.random() * SCALE)))
        const _p = new THREE.Vector3(Math.random() * SCALE, Math.random() * SCALE, Math.random() * SCALE)
        const _u = 1.0;
        wgraph.AddNode(_p, _u);
    }

    // TEST GUI:
    // let sim = 0.995;
    const panel = new GUI({width: 300});
    // create folders for control categories
    const f0 = panel.addFolder("Similarity Threshhold");

    let settings = {
        threshhold: 0.65,
        // add mass?
    };
    const setThreshhold = (value) => {
        settings["threshhold"] = value;
    }
    const requestRenderIfValueChanged = (value) => {
        if (!renderRequested) {
            renderRequested = true;
            settings["threshhold"] = value;
            wgraph.GetEdgeLines();
            requestAnimationFrame(animate);
        }
        console.log(`value: ${value}`);
    }
    f0.add(settings, "threshhold", 0.15, 0.80, 0.005).onChange(requestRenderIfValueChanged)
    f0.open();


    const points = [];
    for (let j = 0; j < NODES_LENGTH; ++j) {
        const row = SIMSDATA[j];
        for (let i = j + 1; i < NODES_LENGTH; ++i) {
            const edge = new WEdge(wgraph.nodes[j], wgraph.nodes[i])
            wgraph.edges.push(edge);
            const sim = row[i];
            // const rndLength = Math.round(Math.random()*1000)/1000; // 3 decimal places
            if (sim < settings["threshhold"]) {
                edge.SpringConstant = 0.05;
                edge.TargetLength = (1.0 - sim) * SCALE * 2.0;
                edge.Show = false;
            } else {
                points.push(wgraph.nodes[j].p) // test
                edge.SpringConstant = 0.5;
                edge.TargetLength = (1.0 - sim) * SCALE;
                edge.Show = true;
            }
        }
    } 

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
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    let onMouseMove = (e) => {
        console.log(`x: ${e.x}, y: ${e.y}`);
    }

    const makeNodeInstance = (scene, geometry, color, points) => {
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

    wgraph.GetEdgeLines();
    wgraph.Step(0.95, 0.02);
    animate();
    
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