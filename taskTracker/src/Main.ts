import { DAO } from "./DAO.js";
import { TaskManager } from "./TaskManager.js";
import { Task } from "./Task.js";
import type { TaskStatus } from "./Task.js";
//Importa el lector de la terminal
import * as rl from "readline";

// Configuramos la lectura de la terminal
const READ_LINE = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const dao = new DAO();
const manager = new TaskManager();

/**
 * Función que prepara el escenario para el usuario.
 * @returns
 */
async function main() {
  //Reduce el array de argumentos
  const ARGUMENTS = process.argv.slice(2);

  //Obtiene la acción introducida por el usuario
  const ACTION = ARGUMENTS[0]?.toLowerCase();

  //Forma la descripción completa de la acción introducida por el usuario
  const ARGUMENT = ARGUMENTS.slice(1).join(" ");

  //Carga la lista de tareas
  await manager.load();

  if (ACTION === "add") {
    if (!ARGUMENT) {
      console.log("Error, argument is empty");
      return;
    }
    //Agrega la tarea
    const NEW_ID = await manager.addTask(ARGUMENT);
    if (NEW_ID) {
      console.log(`Task added successfully (ID: ${NEW_ID})`);
    }
  }

  if (ACTION === "update") {
    //Forma la descripción completa de la acción introducida por el usuario
    const ID_STRING = ARGUMENTS[1];
    const NEW_DESCRIPTION = ARGUMENTS[2];

    if (!ARGUMENT || !NEW_DESCRIPTION || !ID_STRING) {
      console.log("Error, arguments are empty");
      return;
    }
    const ID_NUMBER: Number = Number(ID_STRING);
    //Agrega la tarea
    await manager.updateTaskById(ID_NUMBER, NEW_DESCRIPTION);
  }

  if (ACTION === "delete") {
    if (!ARGUMENT) {
      console.log("Error, argument is empty");
      return;
    }

    //Agrega la tarea
    await manager.deleteTaskById(ARGUMENT);
  }

  //Cierra el lector de
  READ_LINE.close();
}

await main();
