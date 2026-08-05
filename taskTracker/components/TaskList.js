class TaskList {
  constructor() {
    this.newTaskList = [];
  }
  //Almacenar tareas en la lista
  store = (newTask) => {
    this.taskList.push(newTask);
    return taskList.length - 1;
  };

  //Mostrar todas las tareas almacenadas
  showTaskList = () => {
    for (let n = 0; n < this.taskList.length; n++) {
      console.log(this.taskList[n].description);
    }
  };
}
