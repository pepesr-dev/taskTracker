//Conexión con json
/**
 * Definición de parametros y tipos de dato de una tarea
 * @typedef {Object} Task - Objeto tarea
 * @property {number} id - ID del Objeto
 * @property {string} description - Descripción de la tarea
 * @property {boolean} status - Estado de la tarea
 * @property {string} createAt - Fecha de creación de la tarea
 * @property {string} updateAt - Fecha de actualización de la tarea
 */
//Importa modulo de promesas
import fs from "node:fs/promises";

//Importar modulo de rutas absolutas
import path from "node:path";

//Almacena la ruta permanente
const JSON_PATH = path.join(import.meta.dirname, "db", "tasks.json");

const ACTIONS_LIST = {
  /**
   *
   * @param {string} newDescription - Descripción de la nueva tarea
   * @returns
   */
  add: (newDescription) => {
    if (!newDescription) {
      return console.log("Error: Descripción no añadida");
    }
    console.log(`Tarea agregada con exito: ${newDescription}`);
  },
};
/**
 * Devuelve la fecha actual personalizada
 * @returns {string} formattedDateTime - Fecha formateada
 */
const formattedDateTime = () => {
  const now = new Date();

  const formatter = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    //Fuerza el formato 24h
    hour12: false,
  });

  //Cambia las "/" por "-"
  //Quita las comas
  const formattedDateTime = formatter
    .format(now)
    .replace(/\//g, "-")
    .replace(",", "");

  return formattedDateTime;
};

/**
 * Lee todo el contenido del json y devuelve un
 * objeto js
 * @returns JSON_DATA | {Array[]} - Objeto js o array vacío
 */
async function read() {
  try {
    //Obtiene los datos
    const DATA = await fs.readFile(JSON_PATH, "utf-8");
    //Pasa los datos a formato objeto
    const JSON_DATA = JSON.parse(DATA);

    return JSON_DATA;
  } catch (error) {
    return [];
  }
}

/**
 *Almacena tareas
 * @param {Task[]} tasks - Lista de tareas a guardar
 */
async function store(tasks) {
  //Ejecuta la escritura y la serialización
  await fs.writeFile(JSON_PATH, JSON.stringify(tasks, null, 2));
}

/**
 * Inserta un id nuevo
 * @param {Task[]} Tasks - Tareas almacenadas como objetos.js
 * @return {number} newId - Nuevo id generado
 *
 */
function generateId(Tasks) {
  return Tasks.length > 0 ? Math.max(...Tasks.map((task) => task.id)) + 1 : 1;
}

//Inicializa el objeto tarea
let tasks = [];
//Almaceno las tareas existentes
tasks = await read();

//Empuja la nueva tarea
tasks.push({
  id: generateId(tasks),
  description: "Quemar un coche",
  status: false,
  createdAt: formattedDateTime(),
  updatedAt: formattedDateTime(),
});

await store(tasks);
console.log(await read());
