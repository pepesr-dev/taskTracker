import { DAO, Task, TaskList } from "./components/index.js";
//Obtiene el módulo de rutas
import path from "node:path";

//Almacena la ruta permanente
const JSON_PATH = path.join(import.meta.dirname, "db", "tasks.json");

//Almacena el objeto que realiza la conexión
const CONN = new DAO(JSON_PATH);

//Ejecuta la lectura completa de la lista
console.log();
console.log("Resultado de la función readAll():");
console.log(await CONN.readAll());
console.log();

let newTask = new Task("Talar");

//Ejecuta el guardado de una tarea
console.log();
console.log("Resultado de la función store():");
console.log(await CONN.store(newTask));
console.log();
