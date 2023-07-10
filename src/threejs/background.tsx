import * as THREE from "three";

const background = () => {

  const bgTexture = new THREE.TextureLoader().load("background.jpg");

  // Bubble info
  const bubbleGeometry = new THREE.SphereGeometry(100, 32, 32);
  const bubbleMaterial = new THREE.MeshStandardMaterial({ map: bgTexture, side: THREE.BackSide });
  const bubbleMesh = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
  bubbleMesh.rotation.z = 20

  return bubbleMesh;
}

export default background;
