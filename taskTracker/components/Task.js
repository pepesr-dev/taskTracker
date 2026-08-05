export default class Task {
  constructor(description) {
    this.description = description;
  }

  //Getters & Setters
  getDescription() {
    return this.description;
  }

  setDescription(newDescription) {
    this.description = newDescription;
  }

  async read() {
    try {
      //Obtiene los datos
      const data = await fs.readFile(jsonPath, "utf-8");
      //Pasa los datos a formato objeto
      const json = JSON.parse(data);
      //Muestra
      console.log(json);
    } catch (error) {
      //Muestra un error si la función falla
      console.error("Error en la función read(): " + error);
    }
  }

  async store(newTask) {
    try {
      //Ejecuta la escritura y la serialización
      await fs.writeFile(jsonPath, JSON.stringify(newTask, null, 2));
      console.log("JSON guardado correctamente.");
    } catch (error) {
      console.error("Error en la función store: " + error);
    }
  }
}
