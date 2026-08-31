import { Task } from "./Task.js";

describe("Pruebas unitarias del Gestor de Tareas", () => {
  // Test 1: Comprobar que la lógica de añadir funciona
  test("Debería añadir una nueva tarea correctamente", () => {
    const gestor = new GestorTareas();

    const nuevaTarea = gestor.agregarTarea("Estudiar TypeScript");

    expect(nuevaTarea.titulo).toBe("Estudiar TypeScript");
    expect(nuevaTarea.estado).toBe("todo"); // Estado inicial por defecto
    expect(gestor.obtenerTodas().length).toBe(1);
  });

  // Test 2: Comprobar las funciones de cambio de estado
  test("Debería cambiar el estado de una tarea existente", () => {
    const gestor = new GestorTareas();
    gestor.agregarTarea("Hacer ejercicio"); // ID: 1

    const exito = gestor.actualizarEstado(1, "in progress");
    const tareas = gestor.obtenerTodas();

    expect(exito).toBe(true);
    expect(tareas[0].estado).toBe("in progress");
  });

  // Test 3: Comprobar el manejo de errores lógicos
  test("Debería retornar false si intentamos actualizar una tarea que no existe", () => {
    const gestor = new GestorTareas();

    const exito = gestor.actualizarEstado(999, "done"); // ID inexistente

    expect(exito).toBe(false);
  });
});
