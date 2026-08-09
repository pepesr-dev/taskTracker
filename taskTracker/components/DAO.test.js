import { DAO } from "./index.js";
describe("Pruebas de la clase DAO", () => {
  test("Debe guardar y devolver la ruta del archivo JSON", () => {
    const miDAO = new DAO("./datos.json");
    expect(miDAO.getJsonPath()).toBe("./datos.json");
  });
});
