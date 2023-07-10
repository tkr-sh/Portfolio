import * as THREE from 'three';

class Grass {
    private geometry: any;
    private material: THREE.MeshStandardMaterial;
    private mesh: THREE.Mesh;
    private windStrength: number = 0;
    private windFrequency: number = 0;
    private time: number = 0;

    constructor(x: number, y: number, z: number) {
        // Grass geometry with custom vertex positions
        this.geometry = new THREE.BufferGeometry();

        const width = Math.random() / 4 - Math.random() / 4;
        const height = - Math.random() / 1.5;

        const vertices = new Float32Array([
            -0.4 - width, 0, 0,     // Vertex 1
            0.4 + width, 0, 0,      // Vertex 2
            0, 1 + height, 0         // Vertex 3
        ]);
        this.geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        const triangleUvs = new Float32Array([
            0, 0,  // UV coordinate for Vertex 1
                1, 0,  // UV coordinate for Vertex 2
                    0, 1 // UV coordinate for Vertex 3
        ]);
        this.geometry.setAttribute('uv', new THREE.BufferAttribute(triangleUvs, 2));

        this.geometry.computeVertexNormals(); // Compute normals for shading


        const texture = new THREE.TextureLoader().load("grass_texture.jpg");
        this.material = new THREE.MeshStandardMaterial({
            map: texture,
            transparent: true, // Enable transparency
            opacity: 0.95,
            roughness: 1, // Increase roughness for less reflection
            metalness: 1.1, 
        }); // Adjust the material properties as needed

        this.mesh = new THREE.Mesh(this.geometry, this.material);

        // Set up grass animation properties
        this.windStrength = 0.002;
        this.windFrequency = 1.0;
        this.time = Math.random() * 100;

        // Modify the position
        const initialPosition = new THREE.Vector3(x, y, z);
        this.mesh.position.copy(initialPosition);

        // Update the grass animation in each frame
        this.animate();
    }

    private animate = () => {
        const positionAttribute = this.geometry.getAttribute('position');
        const positions = (positionAttribute as THREE.BufferAttribute).array as number[];

        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];
            const z = positions[i + 2];

            positions[i] = x + Math.sin(y * this.windFrequency + this.time) * this.windStrength;
        }

        positionAttribute.needsUpdate = true;

        this.time += 0.01; // Adjust the animation speed as needed

        // Call the animate function in the next frame
        requestAnimationFrame(this.animate);
    };

    public getMesh(): THREE.Mesh {
        return this.mesh;
    }
}

export default Grass;
