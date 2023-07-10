import * as THREE from 'three';




const stone = (width: number, length: number, rotation: number, x: number, z: number) => {
   // The geometry of the stone
   const geometry = new THREE.BoxGeometry(width, 0.2, length);
   const material = new THREE.MeshStandardMaterial({ color: 0x777777 });

   const mesh = new THREE.Mesh(geometry, material);


   mesh.position.x = x;
   mesh.position.z = z;

   mesh.rotation.y = rotation;

   return mesh;
}




export const rectangleCobble = (xStart: number, zStart: number, xEnd: number, zEnd: number, scene: any, rotated: boolean) => {
   // if the start is bigger than the end
   if (xStart > xEnd) [xStart, xEnd] = [xEnd, xStart];
   if (zStart > zEnd) [zStart, zEnd] = [zEnd, zStart];


   // Get the width and length of the road*
   const width: number = xEnd - xStart;
   const length: number = zEnd - zStart;


   let it = 0;

   if (!rotated) {
      for (let j = zStart; j < zEnd; j++, it++) {
         for (let i = xStart; i < xEnd; i += 1.6) {
            const stoneMesh = stone(1.4, 0.8, 0, i + (it % 2 < 1 ? 0.5 : 0), j);
            scene.add(stoneMesh);
         }
      }
   } else {
      for (let j = xStart; j < xEnd; j++, it++) {
         for (let i = zStart; i < zEnd; i += 1.6) {
            const stoneMesh = stone(0.8, 1.4, 0, j, i + (it % 2 < 1 ? 0.5 : 0));
            scene.add(stoneMesh);
         }
      }
   }
}


export const circleCobble = (x: number, z: number, width: number, scene: any) => {
   for (let i = 0; i < width / 2; i++) {
      for (let j = 0; j < Math.PI * 2 * i; j++) {
         const stoneMesh = stone(0.7, 0.8, -j / i, x + Math.cos(j / i) * i, z +Math.sin(j / i) * i);
         scene.add(stoneMesh);
      }
   }
}
