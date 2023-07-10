import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Object3D } from 'three';

class Leaf {
  private time: number = Math.random() * 360;
  // private speed: number = 0.18;
  private speed: number = 0.10 + Math.random() / 10;
  private model: Object3D | null = null;
  private tempoDiff: number = Math.random();
  private width: number = 50;
  private offsetY: number = 10 + Math.random() * 10;
  private offsetZ: number = Math.random() * this.width - Math.random() * this.width;

  constructor(scene: any) {
     
    // Instantiate the GLTF loader
    const loader = new GLTFLoader();

    // Load the GLTF model
    loader.load(
      // 'torii/scene.gltf',
      'leaf_blender/leaf.glb',
      (gltf: any) => {
        this.model = gltf.scene;
        // const scale = 0.013;
        const scale = 1.5;


        console.log(this.model)


        this.model?.traverse((node: any) => {
          if (node.isMesh) {
            // Access the material(s) of the mesh
            const materials = Array.isArray(node.material) ? node.material : [node.material];

            // Modify the reflectivity of each material
            materials.forEach((material: any) => {
              // Set the desired reflectivity value
              material.reflectivity = 0.5; // Example: 0.5 reflectivity
            });
          }
        });


        const lampLight = new THREE.PointLight(0xffAA55, 7, 10);
        lampLight.position.set(0, 50, 0);
        lampLight.castShadow = true;
        scene.add(lampLight);

        // Modify the scale
        if (this.model === null) return;
        this.model.scale.set(scale, scale / 2, scale);
        this.model.position.y = 10;
        this.model.castShadow = true;
        this.model.receiveShadow = true;
        this.model.rotation.y = Math.PI / 2;


        // Add the loaded model to your scene
        scene.add(this.model);
      },
      undefined,
      (error: any) => {
        console.error('Error loading GLTF model', error);
      }
    );



//    // Grass geometry with custom vertex positions
//    this.geometry = new THREE.BufferGeometry();

//    const leafVertices = new Float32Array([
//      // -1, 0, 0,
//      // 1, 0, 0,
//      0, 1, 2,
//      0, 0, 0,    // Vertex 1
//      //
//      -1, 0.5, 0, 
//      -0.5, 1, 0, 
//      0, 1, 0, 
//      0.5, 1, 0, 
//      1, 0.5, 0, 
//      0, 0, 0,
//    ]);

//    this.geometry.setAttribute('position', new THREE.BufferAttribute(leafVertices, 7));
//    // const vertices = new Float32Array([
//    //   -1, 0, 0,
//    //   1, 0, 0,
//    //   0, 1, 2,
//    //   0, 1, 5, 
      
//    // ]);
//    // this.geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
//    // const triangleUvs = new Float32Array([
//    //   0, 0,  // UV coordinate for Vertex 1
//    //   1, 0,  // UV coordinate for Vertex 2
//    //   0, 1 // UV coordinate for Vertex 3
//    // ]);
//    // this.geometry.setAttribute('uv', new THREE.BufferAttribute(triangleUvs, 2));

//    this.geometry.computeVertexNormals(); // Compute normals for shading


//    const texture = new THREE.TextureLoader().load("grass_texture.jpg");
//    this.material = new THREE.MeshStandardMaterial({
//      map: texture,
//      transparent: true, // Enable transparency
//      opacity: 0.95,
//      roughness: 1, // Increase roughness for less reflection
//      metalness: 1.1, // 
//    }); // Adjust the material properties as needed
//    this.material.roughness = 1;

 
//    const mesh = new THREE.Mesh(this.geometry, this.material);
//    mesh.position.set(0, 10, 0);

//    scene.add(mesh);

  }


  public animate = () => {
    if (this.model !== null) {
      this.model.position.y = this.offsetY + Math.sin(this.time ) / 2 + Math.cos(this.time + this.tempoDiff) / 4;
      this.model.position.x += this.speed;
      this.model.position.z = this.offsetZ + Math.sin(this.time ) / 2 + Math.cos(this.time + this.tempoDiff) / 4;
      this.model.rotation.z = Math.sin(this.time);
      this.model.rotation.x = Math.sin(this.time) / 2 + Math.cos(this.time + this.tempoDiff) / 4;

      if (this.model.position.x > this.width) {
        this.model.position.x = -this.width;
        this.offsetY = 10 + Math.random() * 10;
        this.offsetZ = Math.random() * this.width - Math.random() * this.width;
      }
    }
    
    this.time += 0.03;
    
  }
}

export default Leaf;
