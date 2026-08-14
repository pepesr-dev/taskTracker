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

const ARGUMENTS = process.argv.slice(2);
console.log(ARGUMENTS);
const ACTION = ARGUMENTS[0];
const ARGUMENT = ARGUMENTS[1];

//TODO: almacenar tarea completa en json
