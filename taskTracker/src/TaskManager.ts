import { DAO } from "./DAO.js";
import { Task } from "./Task.js";
import type { TaskStatus } from "./Task.js";

export class TaskManager {
  private tasks: Task[] = [];
  //Inicializa el objeto dao
  private dao = new DAO();

  //Carga las tareas al inicio
  async load(): Promise<void> {
    this.tasks = await this.dao.loadTasks();
  }

  /**
   * Función que almacena una tarea en el archivo json
   * @param {String} description - Descripción de la tarea
   * @returns {boolean} - Devuelve true si el proceso se completó adecuadamente
   */
  async addTask(description: string): Promise<Number> {
    try {
      const NEW_TASK = new Task(
        829,
        description,
        "todo",
        "fechaActual",
        "fechaActual",
      );

      this.tasks.push(NEW_TASK);

      await this.dao.saveTasks(this.tasks);

      return Number(NEW_TASK.id);
    } catch (error) {
      console.error("Error creating new task: " + error);
      throw error;
    }
  }
  /**
   * Actualiza la descripción de la tarea que corresponde al
   * id introducido
   * @param taskId
   * @param newDescription
   * @returns {Boolean} - true | false
   */
  async updateTaskById(
    taskId: Number,
    newDescription: string,
  ): Promise<boolean> {
    const TASK_ID = Number(taskId);
    //Find ya pasa la nueva tarea a this.tasks
    const TASK_TO_UPDATE = this.tasks.find((task) => task.id === TASK_ID);

    if (!TASK_TO_UPDATE) {
      return false;
    }
    TASK_TO_UPDATE.description = newDescription;
    await this.dao.saveTasks(this.tasks);
    return true;
  }
  /**
   * Elimina la tarea con el id indicado
   * @param idToDelete
   * @returns
   */
  async deleteTaskById(idToDelete: string): Promise<boolean> {
    try {
      const NUMBER: number = Number(idToDelete);
      this.tasks = this.tasks.filter((task) => task.id !== NUMBER);

      await this.dao.saveTasks(this.tasks);
      return true;
    } catch (error) {
      console.error("Error deleting task " + error);
      throw error;
    }
  }
}
