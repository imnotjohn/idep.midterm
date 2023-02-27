import * as THREE from 'three';

// word graph
class WG {
    constructor() {
        this.nodes = [];
        this.edges = [];
    }

    Purge = () => {
        this.nodes = [];
        this.edges = [];
    }

    // Skeleton:
    // for (let i=0; i<this.nodes.length; ++i) {
    //     this.nodes[i].f = new THREE.Vector3(0,0,0) //set force to zero
    // }

    // for (let i=0; i<this.edges.length; ++i) {
    //     var e = this.edges[i]
    //     var n0 = e.node0
    //     var n1 = e.node1
        
    //     var currentLength = THREE.Vector3.distance(n0.p, n1.p)
    //     var forceDir = THREE.Vector3.Subtract(n1.p, n0.p)
    //     forceDir.normalize()

    //     var strain = (e.targetLength = currentLength)*e.k;

    //     forceDir.scale(strain);

    //     n0.f.add(forceDir)
    //     n1.f.subtract(forceDir)


    //     this.nodes[i].f = new THREE.Vector3(0,0,0) //set force to zero
    // }

    // for (let i=0; i<this.nodes.length; ++i) {
    //     this.nodes[i].u.scale(damping) //deccelaration
    //     this.nodes[i].u.addMult(this.nodes[i].f, dt)
    //     this.nodes[i].p.addMult(this.nodes[i].u, dt)
        
    // }

    Move = (damping, dt) => {

        // set forces to 0
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].f = new THREE.Vector3();
        }

        for (let i = 0; i < this.edges.length; i++) {
            const n0 = this.edges[i].n0;
            const n1 = this.edges[i].n1;
            const forceDir = n1.p.sub(n0.p); // forceDir
            const currLength = forceDir.length(); // currentLength
            // const strain = this.edges[i].targetLength - currLength;
            const strain = (this.edges[i].targetLength - currLength) * this.edges[i].k;
            forceDir.normalize();
            forceDir.multiplyScalar(strain)

            n0.f.add(forceDir);
            n1.f.add(forceDir);
        }

        // TODO: double check algorithm from grasshopper.
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].u.add(this.nodes[i].f.multiplyScalar(dt));
            this.nodes[i].u.multiplyScalar(damping);
            this.nodes[i].p.add(this.nodes[i].u.multiplyScalar(dt));
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
}

export {WG, WN, WE};