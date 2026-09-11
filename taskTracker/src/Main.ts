/**
 * Aplicación que sirve para gestionar tareas a través de la
 * terminal del sistema.
 */
import { DAO } from "./DAO.js";
import { TaskManager } from "./TaskManager.js";
import { Task } from "./Task.js";
//Importa el lector de la terminal
import * as rl from "readline";

//Configura el lector de la terminal
const READ_LINE = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Carga las clases de acceso y gestión de datos
const dao = new DAO();
const manager = new TaskManager();

/**
 * Función que prepara el escenario para el usuario.
 * @returns
 */
async function main() {
  //Obtiene las acciones introducidas por el usuario
  const ARGUMENTS = process.argv.slice(2);
  const ACTION = ARGUMENTS[0]?.toLowerCase();
  const ARGUMENT = ARGUMENTS.slice(1).join(" ");

  //Obtiene todas las tareas
  await manager.load();

  //Acciones básicas
  if (ACTION === "add") {
    if (!ARGUMENT) {
      console.log("Error, argument is empty");
      return;
    }
    const NEW_ID = await manager.addTask(ARGUMENT);
    if (NEW_ID) {
      console.log(`Task added successfully (ID: ${NEW_ID})`);
    }
  }

  if (ACTION === "update") {
    const ID_STRING = ARGUMENTS[1];
    const NEW_DESCRIPTION = ARGUMENTS[2];

    if (!ARGUMENT || !NEW_DESCRIPTION || !ID_STRING) {
      console.log("Error, arguments are empty");
      return;
    }
    const ID_NUMBER: Number = Number(ID_STRING);

    await manager.updateTaskById(ID_NUMBER, NEW_DESCRIPTION);
  }

  if (ACTION === "delete") {
    if (!ARGUMENT) {
      console.log("Error, argument is empty");
      return;
    }

    await manager.deleteTaskById(ARGUMENT);
  }

  //Acciones de actualización del estado de las tareas
  if (ACTION === "mark-in-progress") {
    const ID_STRING = ARGUMENTS[1];

    if (!ID_STRING) {
      console.log("Error, arguments are empty");
      return;
    }

    await manager.markAsInProgress(ID_STRING);
  }

  if (ACTION === "mark-done") {
    const ID_STRING = ARGUMENTS[1];

    if (!ID_STRING) {
      console.log("Error, arguments are empty");
      return;
    }
    await manager.markAsDone(ID_STRING);
  }

  //Acciones de listar tareas con o sin filtro
  if (ACTION === "list") {
    const FILTER = ARGUMENTS[1]?.toLowerCase();
    if (FILTER === "todo") {
      console.table(await manager.listTodoTasks());
    } else if (FILTER === "in-progress") {
      console.table(await manager.listInProgressTasks());
    } else if (FILTER === "done") {
      console.table(await manager.listDoneTasks());
    } else {
      console.table(await manager.listAllTasks());
    }
  }

  //Cierra el lector de
  READ_LINE.close();
}

await main();
