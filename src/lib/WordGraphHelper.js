import * as THREE from 'three';
// Labels
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

// word graph
class WG {
    constructor() {
        this.nodes = [];
        this.edges = [];
        this.fixed = false; // when to stop loops
        this.scene = new THREE.Scene();
    }

    Purge = () => {
        this.nodes = [];
        this.edges = [];
    }

    PurgeEdges = () => {
        this.edges = [];
    }
    test() {
        console.log("test");
    }
    // internal functions
    initLabels = (node) => {
        // 2D
        const nodeDiv = document.createElement("div");
        nodeDiv.className = "label";
        nodeDiv.textContent = node.w;
        nodeDiv.style.marginTop = "-1em";
        const nodeLabel = new CSS2DObject(nodeDiv);
        nodeLabel.position.set(node.p.x, node.p.y, node.p.z);
        // sphereInstance.add(nodeLabel);
        this.scene.add(nodeLabel);        
    }
    removeLabels = () => {
        const sc = this.scene.children;
        for (let i = 0; i < sc.length; i++) {
            if (sc[i].isCSS2DObject) {
                this.scene.remove(sc[i]);
            }
        }
    }

    PurgeLabels = () => {
        this.removeLabels();
    }

    UpdateLabels = () => {
        this.removeLabels();
        
        for (let i = 0; i < this.nodes.length; i++) {
            this.initLabels(this.nodes[i]);
        }
    }

    Move = (damping, dt) => {
        if (this.fixed) return;
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].f = new THREE.Vector3(0.0, 0.0, 0.0);
            this.initLabels(this.nodes[i]);
        }

       for (let i = 0; i < this.edges.length; i++) {
           this.edges[i].ApplySpringForce();
        }

        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].Move(damping, dt);
        }
    }

    GetEdgeLines = () => {
        for (let i = 0; i < this.edges.length; i++) {
            if (this.edges[i].show) {
                const pts = [this.edges[i].n0.p, this.edges[i].n1.p];
                const lineGeometry = new THREE.BufferGeometry().setFromPoints(pts);
                const lineSegment = new THREE.LineSegments( // add to scene?
                    lineGeometry,
                    new THREE.LineBasicMaterial({
                        color: 0xedf1e5,
                        transparent: true,
                        opacity: 0.45,
                        depthWrite: false,
                    })
                )
            }
        }
    }
}

// word node
class WN {
    constructor(p, w) {
        this.p = p;
        this.w = w;
        this.u = new THREE.Vector3();
        this.f = new THREE.Vector3();
    }

    Move = (damping, dt) => {
        this.u.multiplyScalar(damping);
        this.u.add(this.f.multiplyScalar(dt));
        this.p.add(this.u.multiplyScalar(dt));
        //this.p.add(new THREE.Vector3(0.5, 0.0, 0.0));
    }
}

// word edge
class WE {
    constructor(n0, n1) {
        this.n0 = n0;
        this.n1 = n1;
        this.targetLength = 100.0;
        this.k = 0.15; // spring constant
        this.show = false;
    }

    ApplySpringForce = () => {
        let forceDir = this.n1.p.clone()
        forceDir.sub(this.n0.p); // forceDir
        const dist = forceDir.length(); // currentLength
        const strain = (dist - this.targetLength) * this.k;
        forceDir.normalize();
        forceDir.multiplyScalar(strain)

        this.n0.f.add(forceDir);
        this.n1.f.sub(forceDir);
    }
}

export {WG, WN, WE};