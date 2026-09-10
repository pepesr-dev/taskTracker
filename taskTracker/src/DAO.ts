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
   * Carga las tareas almacenada en json
   * @returns {Task}
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
      if (error.code === "ENOENT") {
        const EMPTY_TASK: Task[] = [];
        await this.saveTasks(EMPTY_TASK);
        return EMPTY_TASK;
      }
      throw error;
    }
  }

  /**
   * Almacena las tareas en el archivo json
   * @param {Task} tasks - Objeto tarea
   * @returns {boolean}- Devuelve verdadero si realizó la acción correctamente
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
