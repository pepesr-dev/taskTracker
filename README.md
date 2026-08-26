# [taskTracker(roadmap.sh)](https://roadmap.sh/projects/task-tracker)

Aplicación que gestiona tareas almacenadas en formato json.
POO


# TaskTracker - CLI

Aplicación con interfaz para gestionar mis tareas.

## Requisitos
- [ ]  Ejecución mediante línea de comandos
- [ ]  Aceptar acciones y entradas como argumento
`node TaskTracker.js add "Iniciar proyecto"`
- [ ]  Almacenar tareas en un JSON

## Funciones:
- [ ]  Add, Update, and Delete tasks
- [ ]  Mark a task as in progress or done
- [ ]  List all tasks
- [ ]  List all tasks that are done
- [ ]  List all tasks that are not done
- [ ]  List all tasks that are in progress

## Restricciones

- [ ]  You can use any programming language to build this project.
***Lenguaje escogido: typeScript***
- [ ]  Use positional arguments in command line to accept user inputs.
`TaskTracker.js update 1 "Iniciar proyecto TaskTracker.js"`
- [ ]  Use a JSON file to store the tasks in the current directory.
- [ ]  The JSON file should be created if it does not exist.
- [ ]  Use the native file system module of your programming language to interact with the JSON file.
- [ ]  Do not use any external libraries or frameworks to build this project.
- [ ]  Ensure to handle errors and edge cases gracefully.

## Ejemplo

Lista de comandos y su uso:

```
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

- [ ]  Instalar mi entorno de desarrollo(jsdocs + jest)
- [ ]  Crear el directorio para el proyecto y el controlador de versiones.
- [ ]  Implementar funciones básicas y probarlas todas una a una.
- [ ]  Test y debug

**Para terminar:**

- [ ]  Asegurarme de que cada funcionalidad ha sido testeada.
- [ ]  Limpiar código y agregar comentarios necesarios.
- [ ]  Escribir un buen readme.md sobre como usar mi TaskTracker - CLI.