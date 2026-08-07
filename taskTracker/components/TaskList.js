/**
 * @module TaskList
 */
import Task from "./Task";

export default class TaskList {
  constructor() {
    /**@type {Array<Task>} */
    this.taskList = [];
  }
  /**
   *
   * @param {Task} newTask - Nueva tarea
   * @return {number}
   */
  store = (newTask) => {
    this.taskList.push(newTask);
    return this.taskList.length - 1;
  };

  /**
   *
   */
  showTaskList = () => {
    for (let n = 0; n < this.taskList.length; n++) {
      console.log(this.taskList[n].description);
    }
  };
}
