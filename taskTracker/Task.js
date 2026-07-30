export default class Task {
  constructor(description) {
    this.description = description;
  }
  getDescription() {
    return this.description;
  }

  setDescription(newDescription) {
    this.description = newDescription;
  }
}

//Lista
const taskList = [];
