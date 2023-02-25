import * as THREE from 'three';

class Graph0 {
    constructor() {
        this.nodes = [];
        this.edges = [];
    }
}

class Node0 {
    constructor(p) {
        this.p = p;
        this.u = new THREE.Vector3();
        this.f = new THREE.Vector3();
    }
}

class Edge0 {
    constructor(n0, n1) {
        this.n0 = n0;
        this.n1 = n1;
        this.targetLength = 0.05;
        this.k = 0.5; // spring constant
        this.show = true;
    }
}

export {Graph0, Node0, Edge0};