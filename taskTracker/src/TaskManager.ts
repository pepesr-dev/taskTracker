import { DAO } from "./DAO.js";
import { Task } from "./Task.js";
import type { TaskStatus } from "./Task.js";

export class TaskManager {
  private tasks: Task[] = [];
  private dao = new DAO();

  async load(): Promise<void> {
    this.tasks = await this.dao.loadTasks();
  }

  async addTask(description: string): Promise<boolean> {
    try {
      const newTask = new Task(
        999,
        description,
        "todo",
        "fechaActual",
        "fechaActual",
      );
      this.tasks.push(newTask);
      await this.dao.saveTasks(this.tasks);
      console.log("Tarea almacenada correctamente");
      return true;
    } catch (error) {
      console.error("Error al crear la nueva tarea: " + error);
      throw error;
    }
  }
}
