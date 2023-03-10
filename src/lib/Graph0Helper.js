import * as THREE from 'three';

class Graph0 {
    constructor() {
        this.nodes = [];
        this.edges = [];
    }

    Move = (damping, dt) => {
        console.log("move...");

        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].f = new THREE.Vector3();
        }

        for (let i = 0; i < this.edges.length; i++) {
            const n0 = this.edges[i].n0;
            const n1 = this.edges[i].n1;
            const dp = n1.p.sub(n0.p);
            const dist = dp.length;
            dp.normalize();

            n0.f += dp * (dist - this.edges[i].targetLength) * this.edges[i].k;
            n1.f += dp * (dist - this.edges[i].targetLength) * this.edges[i].k;
        }

        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].u *= damping;
            this.nodes[i].u += this.nodes[i].f * dt;
            this.nodes[i].p += this.nodes[i].u * dt;
        }
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