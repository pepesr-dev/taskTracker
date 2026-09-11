import { DAO } from "./DAO.js";
import { Task } from "./Task.js";

/**
 * Clase que contiene las funciones para gestionar las tareas
 */
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
      const now = new Date().toLocaleString();

      const NEW_ID =
        this.tasks.length > 0
          ? Math.max(...this.tasks.map((task) => task.id)) + 1
          : 1;
      const NEW_TASK = new Task(NEW_ID, description, "todo", now, now);

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
   * @param {number} taskId - ID de la tarea
   * @param {string} newDescription - Nueva descripción de la tarea
   * @returns {Boolean} - Devuelve verdadero si la tarea fue actualizada
   */
  async updateTaskById(
    taskId: Number,
    newDescription: string,
  ): Promise<boolean> {
    const now = new Date().toLocaleString();

    const TASK_ID = Number(taskId);
    //Find ya pasa la nueva tarea a this.tasks
    const TASK_TO_UPDATE = this.tasks.find((task) => task.id === TASK_ID);

    if (!TASK_TO_UPDATE) {
      return false;
    }
    TASK_TO_UPDATE.description = newDescription;
    TASK_TO_UPDATE.updatedAt = now;
    await this.dao.saveTasks(this.tasks);
    return true;
  }
  /**
   * Elimina la tarea indicada por el usuario mediante el id
   * @param {string} idToDelete - ID introducido por el usuario
   * @returns {Promise<boolean>} Devuelve verdadero si la tarea existía y fue eliminada.
   */
  async deleteTaskById(idToDelete: string): Promise<boolean> {
    try {
      const TASK_ID = Number(idToDelete);

      //Sincroniza con el json para asegurar que trabaja con datos reales
      await this.load();

      // Guardamos cuántas tareas teníamos antes de borrar
      const TOTAL_TASKS = this.tasks.length;
      //Obtiene todas las tareas menos la que coincide con el id indicado
      this.tasks = this.tasks.filter((task) => task.id !== TASK_ID);

      //Verifica que el total de tareas haya variado
      if (this.tasks.length === TOTAL_TASKS) {
        return false;
      }

      //Guarda la lista sin la tarea indicada
      await this.dao.saveTasks(this.tasks);
      return true;
    } catch (error) {
      console.error(`Error al intentar eliminar la tarea`, error);
      throw error;
    }
  }

  /**
   * Actualiza el esto de una tarea a In-progress
   * @param {string} idToMarkAsInProgres
   * @returns
   */
  async markAsInProgress(idToMarkAsInProgres: string): Promise<Boolean> {
    const TASK_ID = Number(idToMarkAsInProgres);

    const TASK_TO_UPDATE = this.tasks.find((task) => task.id === TASK_ID);
    if (!TASK_TO_UPDATE) {
      return false;
    }

    TASK_TO_UPDATE.status = "in-progress";
    await this.dao.saveTasks(this.tasks);
    return true;
  }
  /**
   * Actualiza el esto de una tarea a Done
   * @param {string} idToMarkAsDone
   * @returns
   */
  async markAsDone(idToMarkAsDone: string): Promise<Boolean> {
    const TASK_ID = Number(idToMarkAsDone);

    const TASK_TO_UPDATE = this.tasks.find((task) => task.id === TASK_ID);
    if (!TASK_TO_UPDATE) {
      return false;
    }

    TASK_TO_UPDATE.status = "done";
    await this.dao.saveTasks(this.tasks);
    return true;
  }

  /**
   * Obtiene todas las tareas almacenadas en el archivo json
   * @returns
   */
  async listAllTasks(): Promise<Task[]> {
    await this.load();

    return this.tasks;
  }
  /**
   * Obtiene solo las tareas con estado Todo
   * @returns
   */
  async listTodoTasks(): Promise<Task[]> {
    await this.load();

    const TODO_TASKS = this.tasks.filter((task) => task.status === "todo");

    return TODO_TASKS;
  }
  /**
   * Obtiene solo las tareas con estado In-progress
   * @returns
   */
  async listInProgressTasks(): Promise<Task[]> {
    await this.load();

    const IN_PROGRESS_TASKS = this.tasks.filter(
      (task) => task.status === "in-progress",
    );

    return IN_PROGRESS_TASKS;
  }

  /**
   * Obtiene solo las tareas con estado done
   * @returns
   */
  async listDoneTasks(): Promise<Task[]> {
    await this.load();

    const DONE_TASKS = this.tasks.filter((task) => task.status === "done");

    return DONE_TASKS;
  }
}
