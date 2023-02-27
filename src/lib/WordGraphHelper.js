import * as THREE from 'three';

// word graph
class WG {
    constructor() {
        this.nodes = [];
        this.edges = [];
        this.fixed = false;
    }

    Purge = () => {
        this.nodes = [];
        this.edges = [];
    }

    PurgeEdges = () => {
        this.edges = [];
    }

    Move = (damping, dt) => {
        if (this.fixed) return;

        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].f = new THREE.Vector3();
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
                        color: 0xFF0033,
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
    }
}

// word edge
class WE {
    constructor(n0, n1) {
        this.n0 = n0;
        this.n1 = n1;
        this.targetLength = 0.05;
        this.k = 0.5; // spring constant
        this.show = false;
    }

    ApplySpringForce = () => {
        for (let i = 0; i < this.edges.length; i++) {
            const n0 = this.edges[i].n0;
            const n1 = this.edges[i].n1;
            const forceDir = n1.p.sub(n0.p); // forceDir
            const dist = forceDir.length(); // currentLength
            // const strain = this.edges[i].targetLength - currLength;
            const strain = (dist - this.edges[i].targetLength) * this.edges[i].k;
            forceDir.normalize();
            forceDir.multiplyScalar(strain)

            n0.f.add(forceDir);
            n1.f.sub(forceDir);
        }
    }
}

export {WG, WN, WE};