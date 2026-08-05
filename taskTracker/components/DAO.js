import fs from "node:fs/promises";

export default class DAO {
  constructor(jsonPath) {
    this.jsonPath = jsonPath;
  }

  /**
   * Obtiene el contenido del archivo json
   * @returns json | array
   */
  async readAll() {
    try {
      //Obtiene los datos
      const data = await fs.readFile(this.jsonPath, "utf-8");
      //Pasa los datos a formato objeto de js
      const json = JSON.parse(data);

      return json;
    } catch (error) {
      console.error("Error en la función read(): " + error);

      return [];
    }
  }

  /**
   * Almacena una tarea
   * @param {*} jsonPath Ruta del archivo json
   * @param {*} newTask Tarea nueva
   */
  async store(jsonPath, newTask) {
    try {
      //Almacena el objeto completo
      let TASKS = await this.readAll();

      //Si no contiene datos retorna un array vacío en lugar
      //de undefined
      if (!Array.isArray(TASKS)) {
        TASKS = [];
      }

      //Empuja la nueva tarea
      TASKS.push(newTask);

      //Escribe el objeto completo en el json
      await fs.writeFile(
        this.jsonPath,
        JSON.stringify(TASKS, null, 2),
        "utf-8",
      );

      console.log("JSON guardado correctamente.");
    } catch (error) {
      console.error("Error en la función store: " + error);
    }
  }
}
