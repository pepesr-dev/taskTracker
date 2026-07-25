/**
 * TODO  cambiar a POO
 */

//Importado automáticamente
const { error } = require("console");
const { json } = require("stream/consumers");

//Pide el archivo json y el modulo de promesas
const fs = require("fs").promises;

//Almacenar entradas del dev
let description = "";
//TODO selector
//Status por defecto
let status = "todo";
//Fecha y hora actuales
let createdAt = new Date();
let updatedAt = new Date();

//Almacena acciones
const actions = {
  //Acción con parametro
  add: (newTask) => {
    //Retornar cadenas
    return "Nueva entrada: " + newTask;
  },
};

/**
 * Añade tareas al archivo json
 * @param {*} newTask
 */
async function add(newTask) {
  const filePath = "./tasks.json";
  try {
    //Almacenar el contenido del archivo
    const content = await fs.readFile(filePath, "utf-8");
    //Pasar el texto json a array js
    const arrayData = JSON.parse(content);
    //Empujar la nueva tarea
    arrayData.push(newTask);
    //Convertir el nuevo array a texto json
    const updatedJson = JSON.stringify(arrayData, null, 2);
    //Escribir el archivo completo con el nuevo texto
    await fs.writeFile(filePath, updatedJson, "utf-8");

    console.log("Tarea agregada con exito");
  } catch (error) {
    console.error("Error en la función addTask: ", error);
  }
}

/*
//node task.js addNewData salir
//-> nueva entrada: salir
const selectedFunction = process.argv[2];
const param = process.argv[3];

//Validar entrada
if (actions[selectedFunction]) {
  //Recoje la acción y el parámetro almacenado
  description = actions[selectedFunction](param);

  //Almacena tarea completa
  const tasks = [
    {
      id: 1,
      description: description,
      status: status,
      createdAt: createdAt,
      updatedAt: updatedAt,
    },
  ];

  //Crea el json y escribe los datos
  fs.writeFileSync(
    "tasks.json",
    //objeto,filtro(null), sangría por nivel
    JSON.stringify(tasks, null, 2),
  );

  console.log("Tarea agregada correctamente, id: ");
} else {
  console.log("Error: La función no existe");
}
*/
