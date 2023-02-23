import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

class WordVec {
    constructor(word, vector) {
        this.word = word;
        this.vector = vector;
    }
}

class WNode {
    constructor(p, wordvec) {
        this.p = p;
        this.u = new THREE.Vector3();
        this.f = new THREE.Vector3();
        this.w = wordvec.word;
    }

    Move = (damping, dt) => {
        this.damping = damping;
        this.dt = dt;

        this.u *= this.damping;
        this.u += this.f * this.dt;
        this.p += this.u * this.dt;
    }
}

class WEdge {
    constructor(node0, node1) {
        this.node0 = node0;
        this.node1 = node1;
        this.TargetLength = 0.05;
        this.SpringConstant = 0.5;
        this.Show = true;
    }

    ApplySpringForce = () => {
        this.dp = this.node1.p.sub(this.node0.p);
        this.dist = this.dp.length;
        this.dp.normalize();

        this.node0.f += this.dp * (this.dist - this.TargetLength) * this.SpringConstant;
        this.node1.f += this.dp * (this.dist - this.TargetLength) * this.SpringConstant;
    }
}

class WGraph {
    constructor() {
        this.nodes = [];
        this.edges = [];
        this.scene = new THREE.Scene();
        this.lineMaterial = new THREE.LineBasicMaterial({color: 0x0000ff, transparent: true, opacity: 0.25});
    }

    AddNode = (p, u, w) => {
        this.p = p;
        this.u = u;
        this.w = w;
        this.n = new WNode(this.p, this.u, this.w);
        this.nodes.push(this.n);
    }

    Step = (damping, dt) => {
        this.damping = damping;
        this.dt = dt;
    
        for (let i = 0; i < this.nodes.length; ++i) {
            this.nodes[i].f = new THREE.Vector3(); // set forces to 0
        }
    
        for (let i = 0; i < this.edges.length; ++i) {
            this.edges[i].ApplySpringForce();
        }
    
        for (let i = 0; i < this.nodes.length; ++i) {
            this.nodes[i].Move(damping, dt);
        }
    }
    
    GetNodeLabels = () => {
        for (let i = 0; i < this.nodes.length; ++i) {
            const nodeDiv = document.createElement("div");
            nodeDiv.className = "label";
            nodeDiv.textContent = this.nodes[i].w;
            nodeDiv.style.marginBottom  = "-1em";

            const nodeLabel = new CSS2DObject(nodeDiv);
            nodeLabel.position.set(this.nodes[i].p); 
            this.nodes[i].add(nodeLabel);
            nodeLabel.layers.set(1);

            const labelRenderer = new CSS2DRenderer();
            labelRenderer.setSize(window.innerWidth, window.innerHeight);
            labelRenderer.domElement.style.position = "absolute";
            labelRenderer.domElement.style.top = "0px";
            document.body.appendChild(labelRenderer.domElement);
        }
    }

    // TODO: how to avoid the loading bugs...
    GetEdgeLines = () => {
        for (let i = 0; i < this.edges.length; ++i) {
            if (this.edges[i].Show) {
                this.points = [this.edges[i].node0.p, this.edges[i].node1.p]
                this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);
                this.line = new THREE.Line(this.geometry, this.lineMaterial);
                this.scene.add(this.line);
            }
        }
    }
}

export {WGraph, WNode, WEdge};