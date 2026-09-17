import { jest } from "@jest/globals";
import { DAO } from "./DAO.js";
import { TaskManager } from "./TaskManager.js";
import { Task } from "./Task.js";

// ==================== TESTS DE ADD TASK ====================

describe("add", () => {
  let manager: TaskManager;

  beforeEach(() => {
    manager = new TaskManager();

    //Simula que el json inicia vacío
    jest.spyOn(DAO.prototype, "loadTasks").mockResolvedValue([]);
    jest.spyOn(DAO.prototype, "saveTasks").mockResolvedValue(true);

    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    //Limpia el historial de simulaciones despues de cada prueba
    jest.restoreAllMocks();
  });

  //Happy path
  test("Debería añadir una nueva tarea correctamente", async () => {
    (manager as any).tasks = [];

    const NEW_ID = await manager.addTask("Buy groceries");

    //La nueva tarea debe tener el id 1
    expect(NEW_ID).toBe(1);

    const TASKS = (manager as any).tasks as Task[];
    const SAVED_TASK = TASKS.find((task) => task.id === NEW_ID);

    //Devolverá undefined si no encuentra la tarea.
    expect(SAVED_TASK).toBeDefined();
    expect(SAVED_TASK?.description).toBe("Buy groceries");
    expect(SAVED_TASK?.status).toBe("todo");
  });
  //Caso límite
  test("Debería lanzar un error si la descripción está vacía (Caso Límite del Diagrama)", async () => {
    await manager.load();

    await expect(manager.addTask("   ")).rejects.toThrow(
      "Error, empty description",
    );

    const TASKS = (manager as any).tasks as Task[];
    expect(TASKS.length).toBe(0);
  });
  //Límite de infraestructura
  test("Debería lanzar un error si el almacenamiento (DAO) falla", async () => {
    await manager.load();

    jest
      .spyOn(DAO.prototype, "saveTasks")
      //Simula que la escritura no pudo producirse
      .mockRejectedValue(new Error("Disk Full"));

    //Espera devolver un error crítico por fallo en la ejecución de
    //la función
    await expect(manager.addTask("Valid task description")).rejects.toThrow(
      "Disk Full",
    );
  });
});
// ==================== TESTS DE DELETE TASK ====================

describe("deleteTaskById", () => {
  let manager: TaskManager;

  beforeEach(() => {
    manager = new TaskManager();

    //Simula que el json inicia vacío
    jest.spyOn(DAO.prototype, "loadTasks").mockResolvedValue([]);
    jest.spyOn(DAO.prototype, "saveTasks").mockResolvedValue(true);
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    //Limpia el historial de simulaciones despues de cada prueba
    jest.restoreAllMocks();
  });

  //Probar que funciona
  test("Debería eliminar una tarea correctamente", async () => {
    //Inicia con 2 tareas
    (manager as any).tasks = [
      { id: 1, description: "Tarea 1", status: "todo" },
      { id: 2, description: "Tarea 2", status: "todo" },
    ];

    const IS_DELETED = await manager.deleteTaskById("1");

    expect(IS_DELETED).toBe(true);
    const TASKS = (manager as any).tasks as Task[];
    const DELETED_TASK = TASKS.find((task) => task.id === 1);

    //undefined si no encuentra la tarea
    expect(DELETED_TASK).toBeUndefined();
    //Solo debe quedar una tarea
    expect(TASKS.length).toBe(1);
  });
  //Probar detecta el false
  test("Debería devolver false si el id no exite", async () => {
    //Inicia con una tarea
    (manager as any).tasks = [
      { id: 1, description: "Tarea 1", status: "todo" },
    ];

    //Devuelve false si no encuentra el id
    const IS_DELETED = await manager.deleteTaskById("999");
    expect(IS_DELETED).toBe(false);

    //Comprobar que sigue habiendo una tarea
    //const TASKS = await manager.listAllTasks();
    const TASKS = (manager as any).tasks as Task[];
    expect(TASKS.length).toBe(1);
  });
  //Probar que captura el error crítico si la función falla
  test("Debería lanzar un error si el almacenamiento (DAO) falla", async () => {
    //Inicia con una tarea
    (manager as any).tasks = [
      { id: 1, description: "Tarea 1", status: "todo" },
    ];

    //Fuerza a guardar los cambios tras excluir la tarea a eliminar
    jest
      .spyOn(DAO.prototype, "saveTasks")
      .mockRejectedValue(new Error("Disk Full"));
    //Devuelve error de escritura en disco si la función no finalizó
    await expect(manager.deleteTaskById("1")).rejects.toThrow("Disk Full");
  });
});

// ==================== TESTS DE DELETE TASK ====================

describe("updateTaskById", () => {
  let manager: TaskManager;

  beforeEach(() => {
    manager = new TaskManager();

    //Simula que el json inicia vacío
    jest.spyOn(DAO.prototype, "loadTasks").mockResolvedValue([]);
    jest.spyOn(DAO.prototype, "saveTasks").mockResolvedValue(true);

    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    //Limpia el historial de simulaciones despues de cada prueba
    jest.restoreAllMocks();
  });
  test("Debería actualizar una tarea correctamente", async () => {
    (manager as any).tasks = [
      { id: 1, description: "Tarea 1", status: "todo" },
    ];
    const IS_UPDATED = await manager.updateTaskById(1, "Tarea actualizada");
    expect(IS_UPDATED).toBe(true);

    //Obtiene las tareas
    const TASKS = (manager as any).tasks as Task[];
    //Busca el id de la tarea actualizada
    const UPDATED_TASK = TASKS.find((task) => task.id === 1);

    expect(UPDATED_TASK).toBeDefined();
    expect(TASKS.length).toBe(1);

    //Comprueba que cambió la descripción
    expect(UPDATED_TASK?.description).toBe("Tarea actualizada");
  });
  test("Debería devolver false si no encuentra la tarea", async () => {
    //Inicializa una tarea
    (manager as any).tasks = [
      { id: 1, description: "Tarea 1", status: "todo" },
    ];
    //Ejecuta la actualización de un id inexistente
    const IS_UPDATED = await manager.updateTaskById(999, "Tarea 999");
    expect(IS_UPDATED).toBe(false);
    //Comprobar que la longitud de la lista no cambio
    const TASKS = (manager as any).tasks as Task[];
    expect(TASKS.length).toBe(1);
  });
  test("Debería lanzar un error si la descripción está vacía (Caso Límite del Diagrama)", async () => {
    (manager as any).tasks = [
      { id: 1, description: "Tarea 1", status: "todo" },
    ];

    await expect(manager.updateTaskById(1, "   ")).rejects.toThrow(
      "Error, empty description",
    );

    const TASKS = (manager as any).tasks as Task[];
    expect(TASKS.length).toBe(1);
  });
  test("Debería lanzar un error si el almacenamiento (DAO) falla", async () => {
    //Inicia con una tarea
    (manager as any).tasks = [
      { id: 1, description: "Tarea 1", status: "todo" },
    ];

    //Fuerza a guardar los cambios tras excluir la tarea a eliminar
    jest
      .spyOn(DAO.prototype, "saveTasks")
      .mockRejectedValue(new Error("Disk Full"));

    //Devuelve error de escritura en disco si la función no finalizó
    await expect(manager.updateTaskById(1, "Task 1")).rejects.toThrow(
      "Disk Full",
    );
  });
});
