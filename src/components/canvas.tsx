"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import keys from "../data/keys.json";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import background from "../assets/background.jpg";
import backgroundThree from "../threejs/background";
import { playAudioLoop } from '../threejs/audio';
import Grass from '@/threejs/grass';
import ground from '@/threejs/ground';
import MouseControls from '@/threejs/firstPersonView';
import torii from '@/threejs/torii';
import menu from '@/threejs/menu';
import { lamp0, lamp1, Lamp4In1, Lamp8in1 } from '@/threejs/lamp';
import Leaf from '@/threejs/leaf';
import { circleCobble, rectangleCobble } from '@/threejs/cobble';
import shop from '@/threejs/shop';
import keyCamera from '@/threejs/keyCamera';
import routes from '@/threejs/routes';
import settings from '@/threejs/settings';
import music from '@/threejs/music';


const keysTyped: {[key: string]: string} = keys


// Array of collisions of objects
const collisions: number[][] = [
    // Sign
    [-1, -3, 1, 3],
    // Middle lights
    [-11, -11, -9, -9],
    [-11, 9, -9, 11],
    [9, -11, 11, -9],
    [9, 9, 11, 11],
    // Shop
    //// Menu
    [25, -7, 35, 7, ],
    //// Settings
    [-7, 25, 7, 35],
    //// Music 
    [-7, -35, 7, -25],
];



// Function to modify camera position based on key input
const modifyCameraPosition = (camera: THREE.PerspectiveCamera, key: string, delta: number) => {

    // Speed of the camera
    const cameraStep = 0.2 * delta / 25;

    camera.up.set(0, 1, 0);

    // Store the previous position of x and z.
    const previousPosition: {[key: string]: number} = {
        x: camera.position.x,
        z: camera.position.z,
    }

    // Keys
    if (key === getKey("forward") || key === 'ArrowUp') {
        camera.position.z -= Math.cos(camera.rotation.y) * cameraStep;
        camera.position.x -= Math.sin(camera.rotation.y) * cameraStep;
    } else if (key === getKey("back") || key === 'ArrowDown') {
        camera.position.z += Math.cos(camera.rotation.y) * cameraStep;
        camera.position.x += Math.sin(camera.rotation.y) * cameraStep;
    } else if (key === getKey("left") || key === 'ArrowLeft') {
        camera.position.z += Math.sin(camera.rotation.y) * cameraStep;
        camera.position.x -= Math.cos(camera.rotation.y) * cameraStep;
    } else if (key === getKey("right") || key === 'ArrowRight') {
        camera.position.z -= Math.sin(camera.rotation.y) * cameraStep;
        camera.position.x += Math.cos(camera.rotation.y) * cameraStep;
    } else if (key === getKey("jump")) {
        camera.position.y += cameraStep;
    } else if (key === 'b') {
        camera.position.y -= cameraStep;
    }


    // If the camera is in a collision with an object
    if (
        collisions.some(coor => 
            coor[0] < camera.position.x && 
            coor[1] < camera.position.z && 
            coor[2] > camera.position.x && 
            coor[3] > camera.position.z
        )
    ) {
        camera.position.x = previousPosition.x;
        camera.position.z = previousPosition.z;
    }

    if (
        Math.sqrt(
            camera.position.x * camera.position.x +
            camera.position.z * camera.position.z 
        )
            > 57
    ) {
        camera.position.x = previousPosition.x;
        camera.position.z = previousPosition.z;
    }
};



const modifyControllerPosition = (controller: any, key: string) => {
    const step: number = 0.1;

    console.error(controller);

    if (key === getKey("forward") || key === 'ArrowUp') {
        // controller.moveForward( Math.cos(controller.get().rotation.y) * step);
        controller.moveForward(step);
        // controller.getObject().position.z -= Math.cos(controller.getObject().rotation.y) * step;
        // controller.getObject().position.x -= Math.sin(controller.getObject().rotation.y) * step;
    }
}

const getKey = (name: string) => {
    const localStorageStr: string | null = localStorage.getItem("keys");

    // If there are no keys in the local storage
    if (localStorageStr === null) {
        return keysTyped[name];
    }
    
    const localKeys: {[key: string]: string} = JSON.parse(localStorageStr);
    
    return name in localKeys ? localKeys[name] : keysTyped[name];
}




// Component
const Main = ({
    selectedProject,
    startRef,
    clickHereRef,
    hoverProject,
    setDisplayE,
    setMenuOpened,
    settingsOpened,
    setSettingsOpened,
    musicOpened,
    setMusicOpened,
    setLoaded,
    loaded,
}: any) => {
    // Hooks 
    //// Ref (yeah ref are bad)
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const lightShopRef = useRef<THREE.PointLight | null>(null);
    const inMenu = useRef<boolean>(false);
    const inSettings = useRef<boolean>(false);
    const inMusic = useRef<boolean>(false);
    const cameraRef = useRef<THREE.Object3D| null>(null);
    const controlsRef = useRef<any>(null);
    const loadedRef = useRef<number>(0);
    //// States
    const delta = useRef<number>((new Date()).getTime());
    const [previousSelectedProject, setPreviousSelectedProject] = useState<any>(null);
    // Global constant that remains unchanged
    const OFFSET_X_SHOP: number = 30.5;


    // onMount
    useEffect(() => {

        if (typeof window === 'undefined') return;

        let keyE = false;

        // Initialize the scene
        const scene = new THREE.Scene();

        // Add a fog
        scene.fog = new THREE.FogExp2(0, 0.01);

        THREE.DefaultLoadingManager.onProgress = ( _: string, loaded: number, total: number ) => {
            setLoaded(100 * loaded / total);
        };

        // The renderer
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current as HTMLCanvasElement, antialias: true  });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Set up the shadow
        renderer.shadowMap.enabled = true;
        // renderer.shadowMap.type = THREE.PCFSoftShadowMap;;
        renderer.shadowMap.type = THREE.VSMShadowMap;
        renderer.sortObjects = false;


        // Camera light
        const cameraLight = new THREE.PointLight(0xffffff, 0.5, 50);
        cameraLight.castShadow = true;
        scene.add(cameraLight);




        // Menu light
        // scene.add(menu());

        // Add light for the comete
        const redLight = new THREE.PointLight(0xff5533, 0.5, 45);
        redLight.position.set(55, 79, 19);
        scene.add(redLight)


        // Add light
        const lightSky = new THREE.PointLight(0x88eeff, 1, 120);
        lightSky.position.set(0, 100, 0);

        scene.add(lightSky)


        // Add grid
        // const gridHelper = new THREE.GridHelper(400, 100);
        // scene.add( gridHelper );



        // The shop
        shop(scene, OFFSET_X_SHOP, 0, 0, 4);

        // The settings 
        settings(scene, 0, 0, OFFSET_X_SHOP, 4);

        // The music 
        music(scene, 0, 0, -OFFSET_X_SHOP, 4);


        const lampLight = new THREE.PointLight(0xffbb88, 5, 10);
        lampLight.castShadow = true;

        lightShopRef.current = lampLight;
        scene.add(lampLight);


        // The routes
        routes(scene);



        // Lamps around the central place
        Lamp4In1(scene);

        // Lamps
        Lamp8in1(scene, -45, 0, -6);


        // Add the torii
        torii(scene);


        // Add leafs
        const leafs: Leaf[] = [];
        for (let i = 0; i < 10; i++)
            leafs.push(new Leaf(scene));

        // Add background and ground
        scene.add(backgroundThree());
        scene.add(ground());
        
        // Coordinates
        const coor: number[][] = [
            [-60, -2.5, -12, 2.7, 0],
            [-4, -13.5, 4, -26, 1],
            [-4, 14, 4, 26, 1],
            [13.5, -4, 26, 4, 0],
        ];

        coor.forEach(c => rectangleCobble(c[0], c[1], c[2], c[3], scene, c[4] === 1));
        circleCobble(0, 0, 25, scene);


        // Play sound
        playAudioLoop();

        // Grass array
        let grassArray: Grass[] = [];
        const size: number = 100;
        for (let i = 0; i < 1_000; i++) {
            const tempX = Math.random() * size - Math.random() * size;
            const tempZ = Math.random() * size - Math.random() * size;
            let valid: boolean = true;


            for (const c of coor) {
                // If it's in the triangle
                if (tempX + 1 > c[0] && tempZ + 1 > c[1] && tempX - 1 < c[2] && tempZ - 1 < c[3]) {
                    valid = false;
                    break;
                }

            }

            if (tempX * tempX + tempZ * tempZ < 200) {
                valid = false;
            }

            // If the grass placement is valid, add it
            if (valid) {
                grassArray.push(new Grass(tempX, 0, tempZ));
                scene.add(grassArray[i].getMesh());
            } else {
                i--;
            }
        }




        // The camera of the player
        const playerCamera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );


        playerCamera.rotation.order = "YXZ";
        setTimeout(() => {
            playerCamera.position.set(-57, 4.5, 0);
            playerCamera.lookAt(-49, 4.5, 0);
        }, 100);
        cameraRef.current = playerCamera;


        const controls = new PointerLockControls(playerCamera,  renderer.domElement); 

        if (startRef?.current !== null && startRef?.current !== undefined) {
            startRef?.current?.addEventListener("click", () => {
                if (loadedRef.current === 100)
                    controls.lock()
            });
        } else {
            setTimeout(
                () => {
                    startRef?.current?.addEventListener("click", () => loadedRef.current === 100 && controls.lock());
                },
                1000
            );
        }

        setTimeout(() => {
            clickHereRef?.current?.addEventListener("click", () => controls.lock());
        }, 2000);

        scene.add( controls.getObject() );
        controlsRef.current = controls;


        // Animate the cube
        const animate = () => {
            // Animate "animate" again
            requestAnimationFrame(animate);


            // Update controls and camera
            cameraLight.position.copy(playerCamera.position);

            // Update leafs
            leafs.forEach(l => l.animate());

            // Update the grass
            for (let i: number = 0; i < 1000; i++) {
                grassArray[i].getMesh().lookAt(playerCamera.position);
            }


            // If you are on the zone
            let onZone: boolean = false;
            let tempReturn: boolean | number = false;

            
            // Menu SHOP
            ////////////////
            tempReturn = keyCamera(
                keyE, playerCamera, controls,
                // Zone where its active
                17, -6, 26, 6,
                // Where the camera needs to be at
                28, 5, 0,
                // Where the camera needs to look at
                100, -10, 0
            );

            if (tempReturn === 2) {
                setMenuOpened(true);
                inMenu.current = true;
            }

            onZone ||= tempReturn as boolean;
            ///////////////////////////////////


            // Settings
            /////////////////
            tempReturn = keyCamera(
                keyE, playerCamera, controls,
                // Zone where its active
                -6, 17, 6, 26,
                // Where the camera needs to be at
                0, 5, 28,
                // Where the camera needs to look at
                0, 5, 100
            );

            if (tempReturn === 2) {
                setSettingsOpened(true);
                inSettings.current = true;
            }

            onZone ||= tempReturn as boolean;
            ///////////////////////////////////


            // Music 
            /////////////////
            tempReturn = keyCamera(
                keyE, playerCamera, controls,
                // Zone where its active
                -6, -26, 6, -17,
                // Where the camera needs to be at
                0, 5, -28,
                // Where the camera needs to look at
                0, 5, -100
            );


            if (tempReturn === 2) {
                setMusicOpened(true);
                inMusic.current = true;
            }

            onZone ||= tempReturn as boolean;
            ///////////////////////////////////


            setDisplayE(onZone);



            // Re render everything after update
            renderer.render(scene, playerCamera);
        };

        animate();





        // Key down
        //// Handle keydown event to modify camera position
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key !== getKey('menu')) {
                if (inMenu.current && (event.key === "Escape" || getKey("exit") === event.key )) {
                    setMenuOpened(false);
                    inMenu.current = false;
                    cameraRef.current?.position.set(23, 4.5, 0,); 
                    controls.lock();
                }

                if (inSettings.current && (event.key === "Escape" || getKey("exit") === event.key)) {
                    setSettingsOpened(false);
                    inSettings.current = false;
                    cameraRef.current?.position.set(0, 4.5, 23,); 
                    controls.lock();
                }

                if (inMusic.current && (event.key === "Escape" || getKey("exit") === event.key)) {
                    setMusicOpened(false);
                    inMusic.current = false;
                    cameraRef.current?.position.set(0, 4.5, -23,); 
                    controls.lock();
                }


                if (!inMenu.current && !inSettings.current && !inMusic.current) {
                    

                    if ((new Date()).getTime() - delta.current > 200) {
                        console.log("TOO BIG")
                        delta.current = new Date().getTime();
                    }

                    modifyCameraPosition(playerCamera, event.key, (new Date()).getTime() - delta.current);
                }
            }

            delta.current = (new Date()).getTime()
        };


        //// Handle key for the E key
        const pressE = (event: KeyboardEvent) => { keyE = event.key == getKey('menu') ? true : keyE; };
        const upE = (event: KeyboardEvent) => {
            keyE = event.key == getKey('menu') ? false : keyE
            // inMenu.current = ! inMenu.current;
            
            if (event.key !== getKey('menu')) {
                console.warn(event.key);
            }
        }

        // Attach keydown event listener
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keydown', pressE);
        document.addEventListener('keyup', upE);


        console.log(scene.children.length);

        setTimeout(() => console.log(scene.children.length), 1000);

        setTimeout(() => console.log(scene.children.length), 10000);
        setTimeout(() => console.log(scene.children.length), 15000);
        setTimeout(() => console.log(scene.children.length), 20000);




        // Clean up Three.js resources when the component is unmounted
        return () => {
            // Clean up on component unmount
            // scene.remove(renderer.domElement);
            renderer.dispose();

            // Clean up keydown event listener
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keydown', pressE);
            document.removeEventListener('keyup', upE);
        };
    }, []);


    useEffect(() => {
        loadedRef.current = loaded ?? 0;
    }, [loaded]);


    useEffect(() => {
        if (loadedRef.current === 100 && !settingsOpened) {
            cameraRef.current?.position.set(0, 4.5, 23)
            controlsRef.current.lock();
            inSettings.current = false;
        }
    }, [settingsOpened]);

    useEffect(() => {
        if (loadedRef.current === 100 && !musicOpened) {
            cameraRef.current?.position.set(0, 4.5, -23)
            controlsRef.current.lock();
            inMusic.current = false;
        }
    }, [musicOpened]);



    /*const
     * This effect, changes when the user click on a project, the camera and the light move to the selected project
     */
    useEffect(() => {

        if (selectedProject === null) {
            cameraRef.current?.position.set(23, 4.5, 0,); 
            controlsRef.current.lock();
            inMenu.current = false;
            return;
        }

        if (selectedProject === -1) {
            cameraRef.current?.position.set(28, 5, 0,); 

            return;
        }
        
        // Update the position of the light
        if (lightShopRef.current) {
            lightShopRef
            .current
            .position
            .set(
                2.1 + OFFSET_X_SHOP,
                6.5 - Math.floor(selectedProject / 3) * 2.8,
                (selectedProject % 3 - 1) * 3.2
            );
        }

        if (cameraRef.current && selectedProject !== null) {
            cameraRef
            .current
            .position
            .set(
                2.1 + OFFSET_X_SHOP - 2,
                5.5 - Math.floor(selectedProject / 3) * 2.4,
                (selectedProject % 3 - 1) * 3.2 + Math.min(window.innerWidth / 1100, 2)
            );
        }
    }, [selectedProject]);



    /*
     * This effect is here to update the light when you hover an item, so the user knows which project the cursor is hover.
     */
    useEffect(() => {
        // Update the position of the light
        if (lightShopRef.current) {
            lightShopRef
            .current
            .position
            .set(
                2.1 + OFFSET_X_SHOP,
                6.5 - Math.floor(hoverProject / 3) * 2.8,
                (hoverProject % 3 - 1) * 3.2
            );
        }
    }, [hoverProject])

    return <canvas ref={canvasRef} />;
};

export default Main;
