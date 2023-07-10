import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import getMeshInScene from '@/utils/getMesh';




const torii = (scene: any) => {
  // Instantiate the GLTF loader
  const loader = new GLTFLoader();

  // Load the GLTF model
  loader.load(
    // 'torii/scene.gltf',
    // 'japan/scene.gltf',
    'torii.glb',
    (gltf: any) => {
      let model = gltf.scene;
      // const scale = 0.017;
      const scale = 0.9;

      // model = getMeshInScene(model, "Shrine_Gate_1_MainMaterial_0")[0];

      // Modify the scale
      model.scale.set(scale, scale, scale);
      model.rotation.y = Math.PI / 2;
      model.position.x = -50;
      model.position.y = 0.4;
      model.castShadow = true;
      model.receiveShadow = true;

      model.traverse((n: any) => { if ( n.isMesh ) {
        n.castShadow = true; 
        n.receiveShadow = true;
        if(n.material.map) n.material.map.anisotropy = 16; 
      }});
        // cameraLight.shadow.type = THREE.VSMShadowMap;

//      const planeSize = 100;
//      const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
//      //const planeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide});
//      const planeMat = new THREE.ShadowMaterial();
//      planeMat.opacity = 0.5;
//      let plane = new THREE.Mesh(planeGeo, planeMat);
//      plane.rotateX(-Math.PI / 2);
//      //plane.layers.enable(1); plane.layers.disable(0); // it makes the object invisible for the raycaster
//      plane.receiveShadow = true;
//      scene.add(plane);

      // Add the loaded model to your scene
      scene.add(model);
    },
    undefined,
    (error: any) => {
      console.error('Error loading GLTF model', error);
    }
  );
}

export default torii;
