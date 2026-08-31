import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Task } from "./Task.js";
import type { TaskStatus } from "./Task.js";

//Obtiene la ruta del archivo JSON
const __FILE_NAME = fileURLToPath(import.meta.url);
const __DIR_NAME = path.dirname(__FILE_NAME);
const FILE_PATH = path.join(__DIR_NAME, './db/tasks.json');


export class DAO {

  async loadTasks(): Promise<Task[]> {
    try {
      const TEXT_DATA = await fs.readFile(FILE_PATH, 'utf-8');
      const TASKS = JSON.parse(TEXT_DATA);
      return TASKS;
    } catch (error) {
      console.error('Error al cargar el archivo JSON:', error);
      throw error;
    }
  }

  async saveTasks(tasks: Task[]): Promise<boolean> {
    try {
      const TEXT_DATA = JSON.stringify(tasks, null, 2);
      await fs.writeFile(FILE_PATH, TEXT_DATA, 'utf-8');
      return true;
    } catch (error) {
      console.error('Error al guardar en el archivo JSON:', error);
      throw error;
    }
  }

}

