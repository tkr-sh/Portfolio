import * as THREE from "three";

class MouseControls {
  private camera: THREE.Camera;
  private domElement: HTMLElement;
  private mouseX: number;
  private mouseY: number;
  private sensitivity: number;
  private diffX: number = 0;
  private diffY: number = 0;

  constructor(camera: THREE.Camera, domElement: HTMLElement) {
    this.camera = camera;
    this.domElement = domElement;
    this.mouseX = -1;
    this.mouseY = -1;
    this.sensitivity = 0.003;

    // Bind event listeners
    this.domElement.addEventListener('mousemove', this.onMouseMove.bind(this), false);
  }

  private onMouseMove(event: MouseEvent) {
    if (this.mouseX === -1 || this.mouseY === -1) {
      this.mouseX = (event.clientX);
      this.mouseY = (event.clientY);
    } else {
      this.diffX = -event.movementX;
      this.diffY = -event.movementY;
      console.warn(this.diffX);
      // this.diffX = this.mouseX - event.clientX;
      // this.diffY = this.mouseY - event.clientY;
      this.mouseX = (event.clientX);
      this.mouseY = (event.clientY);
    }
  }

  public update() {
    // this.camera.rotation.y += (window.innerWidth / 2 - this.mouseX) * this.sensitivity;
    // this.camera.rotation.y += this.diffX * this.sensitivity;
    // this.camera.rotation.x += this.diffY * this.sensitivity;


    const euler = new THREE.Euler(0, 0, 0, 'ZYX');

    euler.setFromQuaternion(this.camera.quaternion);

    // Adjust rotation based on mouse or input movement
    euler.y += this.diffX * this.sensitivity;
    euler.x += this.diffY * this.sensitivity;

    // Limit the vertical rotation within a certain range
    euler.x = Math.max(-Math.PI, Math.min(Math.PI, euler.x));


    console.warn(euler, this.diffX)

    this.camera.quaternion.setFromEuler(euler);


    console.warn(this.camera.quaternion)
    console.warn("=====================+")
    console.warn("=====================+")
    console.error(this.camera.rotation)

    // this.camera.rotation.y = euler.y;
    console.warn("=====================+")
    console.warn("=====================+")

    // this.camera.rotation.x += this.diffY * this.sensitivity;
    this.diffX = 0;
    this.diffY = 0;
    // this.camera.rotation.y -= (window.innerHeight / 2 - this.mouseY / 2) * this.sensitivity;

    // this.camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.camera.rotation.x));
  }
}


export default MouseControls;
