import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Object3D } from 'three';
import dataDocumentImport from "@/data/dataDocument.json";


const dataDocument: {[key: string]: {[key: string]: string}} = dataDocumentImport;



class DocumentObject {

    private loader = new GLTFLoader();
    private scene: any;
    private model: Object3D | null = null;

    constructor(scene: any){
        this.scene = scene;
    }

    public changeObject = (name: string) => {
        if (this.model !== null)
            this.scene.remove(this.model);


        // Load the GLTF model
        this.loader.load(
            `${name}.glb`,
            (gltf: any) => {
                this.model = gltf.scene;

                if (this.model === null) return;

                this.model.castShadow = true;
                this.model.receiveShadow = true;

                if (name in dataDocument) {
                    for (const key of Object.keys(dataDocument[name])) {
                        eval(`this.model.${key} = ${dataDocument[name][key]}`)
                    }
                }

                this.scene.add(this.model)
            },
            undefined,
            (error: any) => {
                console.error('Error loading GLTF model', error);
            }
        );
    }

    public animate = () => {
        if (this.model !== null && this.model !== undefined)
            this.model.rotation.y += 0.01;
    }
}

export default DocumentObject;
