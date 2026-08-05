import { DAO, Task, TaskList } from "./components/index.js";

//Obtiene el módulo de rutas
import path from "node:path";

//Almacena la ruta permanente
const JSON_PATH = path.join(import.meta.dirname, "db", "tasks.json");

//Almacena el objeto que realiza la conexión
const CONN = new DAO(JSON_PATH);
