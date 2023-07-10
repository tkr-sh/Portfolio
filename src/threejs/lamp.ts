import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import getMeshInScene, { getMeshes } from '@/utils/getMesh';




export const lamp0 = (scene: any, x: number, y: number, z: number) => {
    // Instantiate the GLTF loader
    const loader = new GLTFLoader();

    // Load the GLTF model
    loader.load(
        // 'torii/scene.gltf',
        // 'japan/scene.gltf',
        'long-lamp.glb',
        (gltf: any) => {
            let model = gltf.scene;
            // const scale = 0.013;
            const scale = 0.9;

            // model = getMeshInScene(model, "Shrine_Statue_1_MainMaterial_0")[0];


            const lampLight = new THREE.PointLight(0xffAA55, 2, 10);
            lampLight.position.set(x, y + 4.05, z);
            lampLight.castShadow = true;
            scene.add(lampLight);

            // Modify the scale
            model.scale.set(scale, scale, scale);
            model.position.set(x, y, z);
            model.castShadow = true;
            model.receiveShadow = true;



            // Add the loaded model to your scene
            scene.add(model);
        },
        undefined,
        (error: any) => {
            console.error('Error loading GLTF model', error);
        }
    );
}



export const lamp1 = (scene: any, x: number, y: number, z: number) => {
    // Instantiate the GLTF loader
    const loader = new GLTFLoader();

    // Load the GLTF model
    loader.load(
        // 'torii/scene.gltf',
        // 'japan/scene.gltf',
        'lamp.glb',
        (gltf: any) => {
            let model = gltf.scene;

            // const scale = 0.013;
            const scale = 0.75;

            // model = getMeshInScene(model, "Shrine_Statue_3_MainMaterial_0")[0];



            const lampLight = new THREE.PointLight(0xffAA55, 3, 10);
            lampLight.position.set(x, y + 2.50, z);
            lampLight.castShadow = true;
            scene.add(lampLight);

            // Modify the scale
            model.scale.set(scale, scale, scale);
            model.position.set(x, y, z);
            model.castShadow = true;
            model.receiveShadow = true;



            // Add the loaded model to your scene
            scene.add(model);
        },
        undefined,
        (error: any) => {
            console.error('Error loading GLTF model', error);
        }
    );
}



/*
 * This function load the 4 lamps in the middle at once so its faster and takes less ressource to compute
 */
export const Lamp4In1 = (scene: any) => {
    // Instantiate the GLTF loader
    const loader = new GLTFLoader();
    const x = -10;
    const y = 0;
    const z = 10;

    // Load the GLTF model
    loader.load(
        '4-in-1-lamp.glb',
        (gltf: any) => {
            let model = gltf.scene;
            const scale = 0.9;

            model.traverse((n: any) => {
                console.error(n)
                if ( n.isMesh && n.name !== "Cube001" ) {
                    n.castShadow = true; 
                    n.receiveShadow = true;
                }
            });

            // Adding the 4 lamps to the scene
            for (let i : number = 0; i < 4; i++) {
                const lampLight = new THREE.PointLight(0xffAA55, 2, 12);
                lampLight.position.set(x + i%2 * 20, y + 4.05, z + Math.floor(i/2) * -20);
                lampLight.castShadow = true;
                scene.add(lampLight);
            }

            // Modify the scale
            model.scale.set(scale, scale, scale);
            model.position.set(x, y, z);
            model.castShadow = true;
            model.receiveShadow = true;



            // Add the loaded model to your scene
            scene.add(model);
        },
        undefined,
        (error: any) => {
            console.error('Error loading GLTF model', error);
        }
    );
}


export const Lamp8in1 = (scene: any, x: number, y: number, z: number) => {
    // Instantiate the GLTF loader
    const loader = new GLTFLoader();

    // Load the GLTF model
    loader.load(
        // 'torii/scene.gltf',
        // 'japan/scene.gltf',
        '8-in-1-lamp.glb',
        (gltf: any) => {
            let model = gltf.scene;

            const scale = 0.75;

            model.rotation.y = - Math.PI / 2;

            model.traverse((n: any) => {
                if ( n.isMesh && n.name !== "Cube001" ) {
                    n.castShadow = true; 
                    n.receiveShadow = true;
                }
            });

            for (let i: number = 0; i < 8; i++) {
                const lampLight = new THREE.PointLight(0xffAA55, 1.1, 11);
                lampLight.position.set(x + Math.floor(i / 2) * 7.5, y + 2.3, z + i % 2 * 12);
                lampLight.castShadow = true;

                // lampLight.shadow.type = THREE.VSMShadowMap;
                scene.add(lampLight);
            }

            // Modify the scale
            model.scale.set(scale, scale, scale);
            model.position.set(x, y, z);
            // model.castShadow = true;
            // model.receiveShadow = true;



            // Add the loaded model to your scene
            scene.add(model);
        },
        undefined,
        (error: any) => {
            console.error('Error loading GLTF model', error);
        }
    );
}

