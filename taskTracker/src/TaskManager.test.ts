import { jest } from "@jest/globals"; // Importación obligatoria en entornos ESM
import { DAO } from "./DAO.js";
import { Task } from "./Task.js";
import { TaskManager } from "./TaskManager.js";

describe("Pruebas unitarias del TaskManager", () => {
  let manager: TaskManager;

  beforeEach(() => {
    manager = new TaskManager();

    //Simula que el json inicia vacío
    jest.spyOn(DAO.prototype, "loadTasks").mockResolvedValue([]);
    jest.spyOn(DAO.prototype, "saveTasks").mockResolvedValue(true);
  });

  afterEach(() => {
    //Limpia el historial de simulaciones despues de cada prueba
    jest.restoreAllMocks();
  });

  test("Debería añadir una nueva tarea correctamente", async () => {
    await manager.load();

    // 1. Guardamos el ID que devuelve tu método
    const NEW_ID = await manager.addTask("Buy groceries");

    // 2. Verificamos que el ID numérico generado sea el 1
    expect(NEW_ID).toBe(1);

    // 3. Obtenemos la lista interna para validar que el objeto se creó con éxito
    const listaActual = await manager.listAllTasks();
    const tareaGuardada = listaActual.find((t) => t.id === NEW_ID);

    // 4. Aseguramos a TypeScript que la tarea existe y validamos sus datos
    expect(tareaGuardada).toBeDefined();
    expect(tareaGuardada?.description).toBe("Buy groceries");
    expect(tareaGuardada?.status).toBe("todo");
  });
});
