import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const settings = (scene: any, x: number, y: number, z: number, selected: number) => {

   const loader = new GLTFLoader();

   // Load the GLTF model
   loader.load(
      'settings-low.glb',
      (gltf: any) => {
         let model = gltf.scene;
         const scale = 2;

         const lampLight = new THREE.PointLight(0xccff55, 1, 10);
         lampLight.position.set(x, y + 3.05, z);
         lampLight.castShadow = true;
         scene.add(lampLight);

         // Modify the scale
         model.scale.set(scale, scale, scale);
         model.position.set(x, y, z);
         model.castShadow = true;
         model.receiveShadow = true;
         model.rotation.y = Math.PI / 2;


         loader.load(
            "engrenage.glb",
            (gltf: any) => {
               let modelBis = gltf.scene;
               let scaleBis = 1.3;

               modelBis.scale.set(scaleBis, scaleBis, scaleBis);
               modelBis.position.set(0, 5, z + 2);
               // modelBis.rotation.x = Math.PI / 2;


               scene.add(modelBis);
      
               const animate = () => {
                  modelBis.rotation.z += 0.02;
                  requestAnimationFrame(animate);
               }

               animate();
            },
            undefined,
            (error: any) => {
               console.error('Error loading GLTF model', error);
            }
         );


         // Add the loaded model to your scene
         scene.add(model);

      },
      undefined,
      (error: any) => {
         console.error('Error loading GLTF model', error);
      }
   );
}

export default settings;
