import DocumentObject from "@/threejs/documentObject";
import { useEffect, useRef, useState } from "react"
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


interface param {
    objectName: string
}

const ShowObject = ({ objectName }: param) => {

    const canvasRef = useRef<null | HTMLCanvasElement>(null);
    const documentObject = useRef<null | DocumentObject>(null);


    useEffect(() => {
        documentObject.current?.changeObject(objectName);
    }, [objectName])



    useEffect(() => {

        if (typeof window === 'undefined') return;

        // Initialize the scene
        const scene = new THREE.Scene();

        // Add a fog
        scene.fog = new THREE.FogExp2(0, 0.01);

        // The renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current as HTMLCanvasElement,
            antialias: true
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth / 5, window.innerHeight);

        // Set up the shadow
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.VSMShadowMap;
        renderer.sortObjects = false;

        // Light //
        const light = new THREE.SpotLight(0xddaaff, 1, 10);
        light.position.set(2, 1, 0);

        scene.add(light)


        // Camera //
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / 1.9 / window.innerHeight,
            0.1,
            1000
        );

        camera.rotation.order = "YXZ";
        setTimeout(() => {
            camera.position.set(3, 0, 0);
            camera.lookAt(0, 0, 0);
        }, 100);
        scene.add(camera);
        

        // Add grid
        // const gridHelper = new THREE.GridHelper(400, 100);
        // scene.add( gridHelper );

        


        const temp = new DocumentObject(scene);
        
        temp.changeObject("python");

        documentObject.current = temp;



        // TEST ///

        // const controls = new OrbitControls(camera, renderer.domElement)

        // const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
        // const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

        // const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        // scene.add(cube);


        /////////////




        // Animate the cube
        const animate = () => {
            // Animate "animate" again
            requestAnimationFrame(animate);

            // Re render everything after update
            renderer.render(scene, camera);

            documentObject.current?.animate()

            // controls.update()
        }

        animate();



    }, []);

    return <canvas ref={canvasRef}/>
}


export default ShowObject;
