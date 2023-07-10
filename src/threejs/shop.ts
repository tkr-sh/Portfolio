import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';



class ItemShop {
   private name: string;
   private scale: number;
   private scene: any;
   private model: any;
   
   constructor( name: string, scale: number, scene: any, col: number, row: number, offsetY: number, offsetX: number) {
      // Load
      const loader = new GLTFLoader();

      this.name = name;
      this.scale = scale; 
      this.scene = scene;


      // Load the GLTF model
      loader.load(
         // 'torii/scene.gltf',
         `${name}.glb`,
         (gltf: any) => {
            let model = gltf.scene;
            model.scale.set(scale, scale, scale);
            model.position.set(2.6 + offsetX, 5.4 - row * 2 + offsetY * 2, (col - 1) * 3.2);

            this.model = model;

            // Add the loaded model to your scene
            scene.add(model);

            this.animate();
         },
         undefined,
         (error: any) => {
            console.error('Error loading GLTF model', error);
         }
      );

      console.log(row, Math.floor(row))

      // Load the GLTF model
      loader.load(
         // 'torii/scene.gltf',
         `${name}_text.glb`,
         (gltf: any) => {
            let model = gltf.scene;
            model.scale.set(0.3, 0.3, 0.3);
            model.position.set(2.1 + offsetX, 4.5 - Math.floor(row) * 2.5, (col - 1) * 3.2);
            model.rotation.set( Math.PI / 2, 0, Math.PI / 2);

            // Add the loaded model to your scene
            scene.add(model);
         },
         undefined,
         (error: any) => {
            console.error('Error loading GLTF model', error);
         }
      );
   }


   private animate = () => {
      this.model.rotation.y += 0.02;
      requestAnimationFrame(this.animate);
   }
}

const shop = (scene: any, x: number, y: number, z: number, selected: number) => {


   const items: string[] = ["weekgolf", "flag", "cube", "python", "computer", "github"];
   // const items: string[] = [];
   const scales: number[] = [0.6, 0.2, 0.4, 1.6, 0.37, 1.6];
   const offsetY: number[] = [0, 0.4, 0.6, 0.2, -0.2, 0.5];
   const models: any[] = [];


   items.forEach((item, i: number) => {
         const model = new ItemShop(item, scales[i], scene, i%3, i/3, offsetY[i], x, );

         models.push(model);
      }
    );


   const loader = new GLTFLoader();

   // Load the GLTF model
   loader.load(
      // 'torii/scene.gltf',
      'shop-low.glb',
      (gltf: any) => {
         let model = gltf.scene;
         const scale = 2;



         const lampLight = new THREE.PointLight(0xffAA55, 1, 10);
         lampLight.position.set(x, y + 3.05, z);
         lampLight.castShadow = true;
         scene.add(lampLight);

         // Modify the scale
         model.scale.set(scale, scale, scale);
         model.position.set(x, y, z);
         model.castShadow = true;
         model.receiveShadow = true;
         model.rotation.y = Math.PI;


         // Add the loaded model to your scene
         scene.add(model);

      },
      undefined,
      (error: any) => {
         console.error('Error loading GLTF model', error);
      }
   );


}


export default shop;
