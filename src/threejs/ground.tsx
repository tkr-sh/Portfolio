
import * as THREE from "three";

const ground = () => {

  const width: number = 200;
  // // info
  const geometry = new THREE.BoxGeometry(width, 0.1, width);
  const material = new THREE.MeshStandardMaterial({ color: 0x226054,});
  const mesh = new THREE.Mesh(geometry, material);

  // mesh.position.y = -5;
  mesh.receiveShadow = true;
  mesh.castShadow = true;

  return mesh;
}

export default ground;
