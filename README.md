# [taskTracker - cli(roadmap.sh)](https://roadmap.sh/projects/task-tracker)

Aplicación que gestiona tareas almacenadas en formato json.


## 🛠️ Tecnologías utilizadas
typescript, jest, JSON, bash


## 📦 Instalación

- Descarga el repositorio: `gh repo clone pepesr-dev/taskTracker`
- Entra en la carpeta específica de la app: `cd taskTracker`
- Ejemplo de ejecución: `npm run task-cli -- add "Insertar nueva tarea"`


## Contribuciones
Esta app no acepta contribuciones.

---

# TaskTracker - CLI (descripción de *roadma.sh*)
Aplicación con interfaz para gestionar mis tareas.

## Requisitos
- [X]  Ejecución mediante línea de comandos
- [X]  Aceptar acciones y entradas como argumento
`node TaskTracker.js add "Iniciar proyecto"`
- [X]  Almacenar tareas en un JSON

## Funciones:
- [X]  Add, Update, and Delete tasks
- [X]  Mark a task as in progress or done
- [X]  List all tasks
- [ ]  List all tasks that are done
- [ ]  List all tasks that are not done
- [ ]  List all tasks that are in progress

## Restricciones

- [X]  You can use any programming language to build this project.
***Lenguaje escogido: typeScript***
- [X]  Use positional arguments in command line to accept user inputs.
`TaskTracker.js update 1 "Iniciar proyecto TaskTracker.js"`
- [X]  Use a JSON file to store the tasks in the current directory.
- [X]  The JSON file should be created if it does not exist.
- [X]  Use the native file system module of your programming language to interact with the JSON file.
- [X]  Do not use any external libraries or frameworks to build this project.
- [ ]  Ensure to handle errors and edge cases gracefully.

## Ejemplo

Lista de comandos y su uso:

```bash
# Adding a new task
task-cli add "Buy groceries"
# Output: Task added successfully (ID: 1)
# Updating and deleting tasks
task-cli update 1 "Buy groceries and cook dinner"
task-cli delete 1
# Marking a task as in progress or done
task-cli mark-in-progress 1
task-cli mark-done 1
# Listing all tasks
task-cli list
# Listing tasks by status
task-cli list done
task-cli list todo
task-cli list in-progress
```

## Propiedades de las tareas

- **`id`**: A unique identifier for the task
- **`description`**: A short description of the task
- **`status`**: The status of the task (**`todo`**, **`in-progress`**, **`done`**)
- **`createdAt`**: The date and time when the task was created
- **`updatedAt`**: The date and time when the task was last updated

# Empezar

**Consejos**:

- [X]  Instalar mi entorno de desarrollo(TSdocs + TS-jest)
- [X]  Crear el directorio para el proyecto y el controlador de versiones.
- [ ]  Implementar funciones básicas y probarlas todas una a una.
- [ ]  Test y debug

**Para terminar:**

- [ ]  Asegurarme de que cada funcionalidad ha sido testeada.
- [ ]  Limpiar código y agregar comentarios necesarios.
- [ ]  Escribir un buen readme.md sobre como usar mi TaskTracker - CLI.



# Ejemplo de ejecución
```bash
# Adding a new task
npm run task-cli -- add "buy groceries"
# Output: Task added successfully (ID: 1)
# Updating and deleting tasks
npm run task-cli -- update 1 "Buy groceries and cook dinner"
npm run task-cli -- delete 1
# Marking a task as in progress or done
npm run task-cli -- mark-in-progress 1
npm run task-cli -- mark-done 1
# Listing all tasks
npm run task-cli -- list
# Listing tasks by status
npm run task-cli -- list done
npm run task-cli -- list todo
npm run task-cli -- list in-progress
```