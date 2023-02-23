import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GUI} from 'three/addons/libs/lil-gui.module.min.js';
import './css/Graph.css';

// Data Sources
import SIMSDATA from '../lib/SimMatData';
import WORDS from '../lib/SimWords';
import {WGraph, WEdge} from '../lib/GraphHelper';

// Add the extension functions
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast, MeshBVHVisualizer } from 'three-mesh-bvh';
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

const InstancedGraph = () => {
    const mountRef = useRef(null);
    useEffect( () => {
        const mRef = mountRef;

        let camera, scene, renderer;
        let mesh, helper;
        let sphereInstance, lineSegments;

        // reusable variables
        const _raycaster = new THREE.Raycaster();
        const _position = new THREE.Vector3();
        const _quaternion = new THREE.Quaternion();
        const _scale = new THREE.Vector3( 1, 1, 1 );
        const _matrix = new THREE.Matrix4();
        const _axis = new THREE.Vector3();
        const MAX_RAYS = 3000;
        const RAY_COLOR = 0x444444;

        const params = {

            count: 500,
            displayHelper: false,
            firstHitOnly: true,
            helperDepth: 10,

        };

        init();
        animate();

    function init() {

        // environment
        camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 100 );
        camera.position.z = 10;

        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xeeeeee );

        const ambient = new THREE.HemisphereLight( 0xffffff, 0x999999 );
        scene.add( ambient );

        // renderer
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

        // raycast visualizations
        const lineGeometry = new THREE.BufferGeometry();
        lineGeometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( MAX_RAYS * 2 * 3 ), 3 ) );
        lineSegments = new THREE.LineSegments( lineGeometry, new THREE.LineBasicMaterial( {
            color: RAY_COLOR,
            transparent: true,
            opacity: 0.25,
            depthWrite: false
        } ) );

        sphereInstance = new THREE.InstancedMesh(
            new THREE.SphereGeometry(),
            new THREE.MeshBasicMaterial( { color: RAY_COLOR } ),
            2 * MAX_RAYS
        );
        sphereInstance.instanceMatrix.setUsage( THREE.DynamicDrawUsage );
        sphereInstance.count = 0;

        scene.add( sphereInstance, lineSegments );

        // test
        const testGeometry = new THREE.SphereGeometry(window.innerHeight/(10 * window.innerHeight), 16, 16);
        const testMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color(0x000000)});
        mesh = new THREE.Mesh(testGeometry, testMaterial);
        scene.add(mesh);
        helper = new MeshBVHVisualizer(mesh);
        helper.color.set(0xE91E63);
        scene.add(helper);

        const controls = new OrbitControls( camera, renderer.domElement );
        controls.minDistance = 5;
        controls.maxDistance = 75;

        // set up gui
        const gui = new GUI();
        const rayFolder = gui.addFolder( 'Raycasting' );
        rayFolder.add( params, 'count', 1, MAX_RAYS, 1 );

        window.addEventListener( 'resize', onWindowResize );
        onWindowResize();

        initRays();

        }

    function initRays() {

        const position = new THREE.Vector3();
        const quaternion = new THREE.Quaternion();
        const scale = new THREE.Vector3( 1, 1, 1 );
        const matrix = new THREE.Matrix4();

        for ( let i = 0; i < MAX_RAYS * 2; i ++ ) {

            position.randomDirection().multiplyScalar( 3.75 );
            matrix.compose( position, quaternion, scale );
            sphereInstance.setMatrixAt( i, matrix );

        }

    }

    function updateRays() {

        if ( ! mesh ) return;

        _raycaster.firstHitOnly = params.firstHitOnly;
        const rayCount = params.count;

        let lineNum = 0;
        for ( let i = 0; i < rayCount; i ++ ) {

            // get the current ray origin
            sphereInstance.getMatrixAt( i * 2, _matrix );
            _matrix.decompose( _position, _quaternion, _scale );

            // rotate it about the origin
            const offset = 1e-4 * window.performance.now();
            _axis.set(
                Math.sin( i * 100 + offset ),
                Math.cos( - i * 10 + offset ),
                Math.sin( i * 1 + offset ),
            ).normalize();
            _position.applyAxisAngle( _axis, 0.001 );

            // update the position
            _scale.setScalar( 0.02 );
            _matrix.compose( _position, _quaternion, _scale );
            sphereInstance.setMatrixAt( i * 2, _matrix );

            // raycast
            _raycaster.ray.origin.copy( _position );
            _raycaster.ray.direction.copy( _position ).multiplyScalar( - 1 ).normalize();

            // update hits points and lines
            const hits = _raycaster.intersectObject( mesh );
            if ( hits.length !== 0 ) {

                const hit = hits[ 0 ];
                const point = hit.point;
                _scale.setScalar( 0.01 );
                _matrix.compose( point, _quaternion, _scale );
                sphereInstance.setMatrixAt( i * 2 + 1, _matrix );

                lineSegments.geometry.attributes.position.setXYZ( lineNum ++, _position.x, _position.y, _position.z );
                lineSegments.geometry.attributes.position.setXYZ( lineNum ++, point.x, point.y, point.z );

            } else {

                sphereInstance.setMatrixAt( i * 2 + 1, _matrix );
                lineSegments.geometry.attributes.position.setXYZ( lineNum ++, _position.x, _position.y, _position.z );
                lineSegments.geometry.attributes.position.setXYZ( lineNum ++, 0, 0, 0 );

            }

        }

        sphereInstance.count = rayCount * 2;
        sphereInstance.instanceMatrix.needsUpdate = true;

        lineSegments.geometry.setDrawRange( 0, lineNum );
        lineSegments.geometry.attributes.position.needsUpdate = true;

    }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function animate() {

        requestAnimationFrame( animate );

        render();

    }

    function render() {

        if ( mesh ) {

            mesh.rotation.y += 0.002;
            mesh.updateMatrixWorld();

        }

        updateRays();

        renderer.render( scene, camera );
    }

        return () => mRef.current.removeChild(renderer.domElement);
    }, []);

    return (
        <div id="Graph" ref={mountRef} />
    )
}

export default InstancedGraph;