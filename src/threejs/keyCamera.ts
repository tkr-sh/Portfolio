




const keyCamera = (press: boolean, camera: any, controls: any, xStart: number, zStart: number, xEnd: number, zEnd: number, toX: number, toY: number, toZ: number, lookAtX: number, lookAtY: number, lookAtZ: number): boolean | number => {
   // If the user is in the zone
   if (camera.position.x < xEnd && camera.position.x > xStart && camera.position.z > zStart && camera.position.z < zEnd) {
      if (press) {
         controls.unlock();
         camera.position.set(toX, toY, toZ);
         camera.lookAt(lookAtX, lookAtY, lookAtZ);
         return 2
      } else {
         return true;
      }
   }

   return false;
}


export default keyCamera;
