# TaskTracker - CLI
Aplicación con interfaz para gestionar mis tareas.

## ¿Cómo se usa?

Requisitos:

Instalar:

Configurar:

Iniciar:
`node TaskTracker.js`


# notas

Documentación:
https://developer.mozilla.org/es/docs/Learn_web_development/Core/Scripting/JSON#resumen


# Utilizar acciones por comando
Almaceno la acción add()
La capturo
Y muestro el resultado de la validación.
ejecuto: node task.js add 
//-> tarea agregada
```

//Almacena acciones
const actions = {
  //Acción sin parametros
  add: () => console.log("tarea agregada"),
};
//Las acciones comienzan a partir del indice 2
//0 -> ruta del ejecutable node
//1 -> ruta del archivo js
//2 -> primer argumento real
const selectedFunction = process.argv[2];

if (actions[selectedFunction]) {
  actions[selectedFunction]();
} else {
  console.log("Error: La función no existe");
}

```


# Utilizar acciones con parámetros

```

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
```