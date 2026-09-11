import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Task } from "./Task.js";

//Obtiene la ruta del archivo JSON
const __FILE_NAME = fileURLToPath(import.meta.url);
const __DIR_NAME = path.dirname(__FILE_NAME);
const FILE_PATH = path.join(__DIR_NAME, "./db/tasks.json");

export class DAO {
  /**
   * Carga las tareas almacenadas en el archivo JSON.
   * @returns {Promise<Task[]>} Arreglo de instancias de Task.
   * @throws {SyntaxError} Si el archivo JSON está corrupto.
   * @throws {Error} Si ocurre un fallo crítico de lectura o permisos.
   */
  async loadTasks(): Promise<Task[]> {
    try {
      //Lee el archivo json
      const TEXT_DATA = await fs.readFile(FILE_PATH, "utf-8");

      //Controla errores por archivo json vacío
      if (!TEXT_DATA.trim()) {
        const EMPTY_TASK: Task[] = [];
        await this.saveTasks(EMPTY_TASK);
        return EMPTY_TASK;
      }
      //Conviete a array de objetos planos
      const TASKS = JSON.parse(TEXT_DATA);

      //Convierte a instancia
      return TASKS.map(
        (task: any) =>
          new Task(
            task.id,
            task.description,
            task.status,
            task.createdAt,
            task.updatedAt,
          ),
      );
    } catch (error: any) {
      //Captura los errores por mal formato de las tareas
      if (error instanceof SyntaxError) {
        console.error("Error, las tareas no mantienen el formato adecuado.");
        throw error;
      }
      //Captura el error ENOENT de JSON vacío o inesistente
      //y crea uno con un array vacío
      if (error.code === "ENOENT") {
        const EMPTY_TASK: Task[] = [];
        await this.saveTasks(EMPTY_TASK);
        return EMPTY_TASK;
      }
      //Cualquier otro error se propaga hacia el main
      throw error;
    }
  }

  /**
   * Almacena las tareas en el archivo JSON.
   * @param {Task[]} tasks - Arreglo de instancias de Task a persistir.
   * @returns {Promise<boolean>} Devuelve verdadero si realizó la acción correctamente.
   * @throws {Error} Si falla la escritura en el disco duro.
   */
  async saveTasks(tasks: Task[]): Promise<boolean> {
    try {
      const TEXT_DATA = JSON.stringify(tasks, null, 2);
      await fs.writeFile(FILE_PATH, TEXT_DATA, "utf-8");
      return true;
    } catch (error) {
      console.error("Error al guardar en el archivo JSON:", error);

      throw error;
    }
  }
}
