import * as THREE from 'three';

class WordVec {
    constructor(word, vector) {
        this.word = word;
        this.vector = vector;
    }
}

class WNode {
    // constructor(p, wordvec) {
    constructor(p) {
        this.p = p;
        this.u = new THREE.Vector3();
        this.f = new THREE.Vector3();
        // this.wordvec = wordvec;
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
        // this.k = 0.5; // spring stiffness
        // this.targetLength = 0.5;
        this.TargetLength = 0.05;
        this.SpringConstant = 0.5;
        this.Show = true;
    }

    // TargetLength = 0.05;
    // SpringConstant = 0.5;
    // Show = true;

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
    // Scene = new THREE.Scene();

    AddNode = (p, u) => {
        this.p = p;
        this.u = u;
        const n = new WNode(p, u);
        this.nodes.push(n);
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