import { jest } from "@jest/globals";
import { DAO } from "./DAO.js";
import { Task } from "./Task.js";
import fs from "node:fs/promises";

//Simula el módulo de archivos
jest.mock("node:fs/promises");

describe("Pruebas Unitarias - Capa de Datos (DAO)", () => {
  //Prepara las pruebas DAO
  let dao: DAO;
  beforeEach(() => {
    //Inicializa DAO
    dao = new DAO();
    //Limpia el historial de llamadas hantes de cada test
    jest.clearAllMocks();
  });

  //Tests: loadTasks()
  test("loadTasks: Debería crear un archivo nuevo vacío si el JSON no existe (ENOENT)", async () => {
    // Simulamos que fs.readFile lanza un error de archivo inexistente
    const ERROR_ENOENT = new Error("File not found");
    (ERROR_ENOENT as any).code = "ENOENT";

    //Vigila fs, en cuanto loadTask intente ejecutar fs.readFile()
    //no leas el disco duro real; Lanzale el error ficticio ENOENT
    jest.spyOn(fs, "readFile").mockRejectedValue(ERROR_ENOENT);
    //Vigila fs, al ejecutar writeFile Lanzalé el resultado undefined
    jest.spyOn(fs, "writeFile").mockResolvedValue(undefined);

    //Carga las tareas
    const TASKS = await dao.loadTasks();

    //Verifica que devuelve un array vacío
    expect(TASKS).toEqual([]);
    //Verifica que intentó escribir
    expect(fs.writeFile).toHaveBeenCalled();
  });

  test("loadTasks: Debería inicializar el archivo con [] si está completamente vacío", async () => {
    //Simula que lee espacios en blanco y devuelve undefined
    jest.spyOn(fs, "readFile").mockResolvedValue("   ");
    jest.spyOn(fs, "writeFile").mockResolvedValue(undefined);

    const TASKS = await dao.loadTasks();

    expect(TASKS).toEqual([]);
    expect(fs.writeFile).toHaveBeenCalled();
  });

  test("loadTasks: Debería lanzar un SyntaxError si el archivo JSON está corrupto", async () => {
    // Simulamos un archivo con texto roto
    jest.spyOn(fs, "readFile").mockResolvedValue("{ id: 1, texto_roto... ");

    // Verificamos que la promesa sea rechazada con un SyntaxError
    await expect(dao.loadTasks()).rejects.toThrow(SyntaxError);
  });

  test("loadTasks: Debería parsear el texto y devolver instancias reales de Task", async () => {
    const FAKE_JSON = JSON.stringify([
      {
        id: 1,
        description: "Test",
        status: "todo",
        createdAt: "hoy",
        updatedAt: "hoy",
      },
    ]);

    //Simula una tarea tipo string
    jest.spyOn(fs, "readFile").mockResolvedValue(FAKE_JSON);

    //Carga las tareas
    const TASKS = await dao.loadTasks();
    //Verifica aumentó la cantidad de tareas
    expect(TASKS.length).toBe(1);
    //Verifica que devuelve un objeto tarea
    expect(TASKS[0]).toBeInstanceOf(Task);
    expect(TASKS[0]?.description).toBe("Test");
  });

  // TEST: saveTasks
  test("saveTasks: Debería lanzar un error si la escritura en el disco falla", async () => {
    //Información que lanzará el error
    const WRITE_FILE_ERROR = new Error("Disk full or permission denied");
    //Ejecuta la simulación de escritura rechazada e informa
    jest.spyOn(fs, "writeFile").mockRejectedValue(WRITE_FILE_ERROR);

    const FAKE_TASK = [new Task(1, "Guardar", "todo", "hoy", "hoy")];

    await expect(dao.saveTasks(FAKE_TASK)).rejects.toThrow(
      "Disk full or permission denied",
    );
  });

  test("saveTasks: Debería convertir el array a texto formateado y escribirlo en disco", async () => {
    //Cuando los writeFile funcionan devuelven undefined Promises "Dispara y olvida"
    jest.spyOn(fs, "writeFile").mockResolvedValue(undefined);

    const FAKE_TASK = [new Task(1, "Guardar", "todo", "hoy", "hoy")];
    const IS_SUCESSFULL = await dao.saveTasks(FAKE_TASK);

    expect(IS_SUCESSFULL).toBe(true);
    //Verifica datos que intentó escribir
    expect(fs.writeFile).toHaveBeenCalledWith(
      //JSON ruta. Texto válido, no importa el tipo
      expect.any(String),
      expect.stringContaining('"description": "Guardar"'),
      "utf-8",
    );
  });
});
