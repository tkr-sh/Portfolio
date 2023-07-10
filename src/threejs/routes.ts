import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import getMeshInScene from '@/utils/getMesh';




const routes = (scene: any) => {
  // Instantiate the GLTF loader
  const loader = new GLTFLoader();

  // Load the GLTF model
  loader.load(
    'route-low.glb',
    (gltf: any) => {
      let model = gltf.scene;
      const scale = 1.5;

      // Modify the scale
      model.scale.set(scale, scale, scale);
      model.position.y = -0.1;
      model.rotation.y = Math.PI;
      model.castShadow = true;
      model.receiveShadow = true;

      const lightsCorr = [
         [0, 4.5, 2],
         [0  , 4.5, -2],
      ]

      
      lightsCorr.forEach(e => {
         const tempLamp = new THREE.SpotLight(0xff9900, 1.8, 10, Math.PI / 4);

         tempLamp.castShadow = true;
         tempLamp.position.set(e[0], e[1], e[2]);


         const targetObject = new THREE.Object3D(); 
         targetObject.position.set(e[0], e[1] - 1, e[2]);
         scene.add(targetObject);

         tempLamp.target = targetObject;

         scene.add(tempLamp);
      });

      // Add the loaded model to your scene
      scene.add(model);
    },
    undefined,
    (error: any) => {
      console.error('Error loading GLTF model', error);
    }
  );
}

export default routes;
