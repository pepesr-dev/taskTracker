# TaskTracker - CLI
Aplicación con interfaz para gestionar mis tareas.

## ¿Cómo se usa?

Requisitos:

Instalar:

Configurar:

Iniciar:
`node TaskTracker.js`


# notas

## Indice:
- Almacenar en json
- Utilizar acciones por comando
- Utilizar acciones por parametro
- Almacenar varias tarea en json
- Glosario


[Documentación:](https://developer.mozilla.org/es/docs/Learn_web_development/Core/Scripting/JSON#resumen)


## Almacenar tarea en json


```
//Pide el archivo json
const fs = require("fs");
//Almacena los datos
const datos = { id: 1, producto: "Libro" };
//Crea el json y escribe los datos
fs.writeFileSync(
  "datos.json",
  //objeto,filtro(null), sangría por nivel
  JSON.stringify(datos, null, 2),
);

```

### Glosario
| Elemento | Acción | Sintaxis |
| :--- | :--- | :--- |
| **require("fs")**| Obtiene el archvivo con el que va a trabajar |`const fs = require("fs");` |
| **fs.writeFileSync("archivo.json",JSON.stringify(nuevosDatos,filtro,sangría))**| Escribe en el archivo |`fs.writeFileSync("datos.json",JSON.stringify(datos, null, 2));` |
| **JSON.stringify(nuevosDatos,filtro,sangría)**| Convierte los datos de array js a string |`JSON.stringify(datos, null, 2)` |
| **Date()**| Retorna la fecha actual ["2026-07-25T11:34:25.554Z"] |`let createdAt = new Date();` |


## Utilizar acciones por comando
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
### Glosario
| Elemento | Acción | Sintaxis |
| :--- | :--- | :--- |
`process.argv[2]`


# Utilizar acciones con parámetros
El usuario introduce el parametro
`node taskTracker.json addNewData salir`
Captura el parametro, valida, escribe e informa del resultado
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

## Glosario
| Elemento | Acción | Sintaxis |
| :--- | :--- | :--- |
---


# Retornar cadenas
Antes no usaba **return** solo un console.log() por ello recibía un **undefined** al intentar almacenar la acción y el parámetro en una variable.
```
//Almacena acciones
const actions = {
  //Acción con parametro
  add: (newTask) => {
    //Retornar cadenas
    return "Nueva entrada: " + newTask;
  },
};
```


# Cargar multiples tareas
- promises: Carga el modulo de promesas de node.js para trabajar con ellas en lugar de las callBacks tradicionales. Esto permite realizar peticiones asincronas.
- callback hell: Enredo de funciones anidadas.
- await: Permite pausar una función hasta que el archivo termine de leerse o escribirse.