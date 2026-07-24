//Pide el archivo json
const fs = require("fs");

//Almacenar entradas del dev
let description = "Programar lista de tareas";
//TODO selector
let status = "todo";
//Fecha y hora actuales
let createdAt = new Date();
let updatedAt = new Date();

//Almacena tarea completa
const tasks = {
  id: 1,
  description: description,
  status: status,
  createdAt: createdAt,
  updatedAt: updatedAt,
};

//Almacena acciones
const actions = {
  //Acción con parametro
  addNewData: (newData) => console.log("Nueva entrada: " + newData),
};
//node task.js addNewData salir
//-> nueva entrada: salir
const selectedFunction = process.argv[2];
const param = process.argv[3];

if (actions[selectedFunction]) {
  //Recoje la acción y el parámetro almacenado
  actions[selectedFunction](param);
} else {
  console.log("Error: La función no existe");
}

//Crea el json y escribe los datos
fs.writeFileSync(
  "tasks.json",
  //objeto,filtro(null), sangría por nivel
  JSON.stringify(tasks, null, 2),
);
