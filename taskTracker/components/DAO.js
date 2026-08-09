import fs from "node:fs/promises";
/** @typedef {module:Task} Task */

export default class DAO {
  /**
   * Constructor de la clase DAO que recibe
   * la ruta del archivo json
   * @param {string} jsonPath
   */
  constructor(jsonPath) {
    this.jsonPath = jsonPath;
  }

  /**
   * Retorna la ruta del archivo json
   * @returns {string}
   */
  getJsonPath() {
    return this.jsonPath;
  }

  /**
   * Inserta la ruta del archivo json
   * @param {string} newPath
   */
  setJsonPath(newPath) {
    this.jsonPath = newPath;
  }

  /**
   * Obtiene el contenido del archivo json
   * @returns {Promise<Task[]>}
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
   * @param {Task} newTask Tarea nueva
   * @returns {Promise<void>}
   */
  async store(newTask) {
    try {
      //Almacena el objeto completo
      let TASKS = await this.readAll();

      //Si no contiene datos retorna un array vacío en lugar
      //de undefined
      if (!Array.isArray(TASKS)) {
        TASKS = [];
      }

      const lastId = TASKS.length > 0 ? Math.max(...TASKS.map((t) => t.id)) : 0;
      newTask.id = lastId + 1;

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

module.exports = DAO;
