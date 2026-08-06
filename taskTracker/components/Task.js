/**
 * @module Task
 */

export default class Task {
  /**
   * Constructor de la clase Task
   * @param {string} description - Descripción de la tarea
   */
  constructor(description) {
    /** @type {number} */
    this.id = 0; // Propiedad requerida por el JSON

    /** @type {string} */
    this.description = description;

    /** @type {boolean} */
    this.status = false; // Lógica de estados: "Por defecto sin completar"

    /** @type {string} */
    this.createdAt = new Date().toISOString(); // ¡Añadido! Fecha y hora de creación fija

    /** @type {string} */
    this.updatedAt = new Date().toISOString(); // ¡Añadido! Fecha y hora de última modificación
  }

  // Getters & Setters

  /**
   * Retorna la descripción de la tarea
   * @returns {string}
   */
  getDescription() {
    return this.description;
  }

  /**
   * Modifica la descripción de la tarea y actualiza la fecha de modificación
   * @param {string} newDescription - Descripción de la nueva tarea
   */
  setDescription(newDescription) {
    this.description = newDescription;
    this.updatedAt = new Date().toISOString(); // Actualiza el timestamp de modificación
  }

  /**
   * Obtiene la fecha de creación formateada (DD/MM/AAAA)
   * @returns {string} Ejemplo: "06/08/2026"
   */
  getCreationDate() {
    const date = new Date(this.createdAt);
    return date.toLocaleDateString("es-ES");
  }

  /**
   * Obtiene la hora de creación formateada (HH:MM:SS)
   * @returns {string} Ejemplo: "23:22:15"
   */
  getCreationTime() {
    const date = new Date(this.createdAt);
    return date.toLocaleTimeString("es-ES");
  }
}
