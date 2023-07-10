export const getMeshes = (scene: any) => {
  const models: any[] = [];
  
  scene.traverse((object: any) => {
    // Check if the object represents a model
    if (object.isMesh) {
      models.push(object);
    }
  });

  return models;
}



const getMeshInScene = (scene: any, name: string) => {
  const models: any[] = [];
  
  scene.traverse((object: any) => {
    // Check if the object represents a model
    if (object.isMesh) {
      if (object['name'] === name)  
        models.push(object);
    }
  });

  return models;
}

export default getMeshInScene;
