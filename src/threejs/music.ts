import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const music = (scene: any, x: number, y: number, z: number, selected: number) => {

   const loader = new GLTFLoader();

   // Load the GLTF model
   loader.load(
      'music.glb',
      (gltf: any) => {
         let model = gltf.scene;
         const scale = 2;

         const lampLight = new THREE.PointLight(0xcc55ff, 1, 10);
         lampLight.position.set(x, y + 3.05, z);
         lampLight.castShadow = true;
         scene.add(lampLight);

         // Modify the scale
         model.scale.set(scale, scale, scale);
         model.position.set(x, y, z);
         model.castShadow = true;
         model.receiveShadow = true;
         model.rotation.y = -Math.PI / 2;


         loader.load(
            "vinyle.glb",
            (gltf: any) => {
               let modelBis = gltf.scene;
               let scaleBis = 0.7;

               modelBis.scale.set(scaleBis, scaleBis, scaleBis);
               modelBis.position.set(0, 3.87, z - 1.5);
               // modelBis.rotation.x = Math.PI / 2;


               scene.add(modelBis);
      
               const animate = () => {
                  modelBis.rotation.y += 0.02;
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

export default music;
