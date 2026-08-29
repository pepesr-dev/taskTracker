
import { cargarJSON, zeroes } from "./TaskManager.js";
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Reemplazo moderno para __dirname en entornos ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


describe("Función zeroes", () => {
  test("Comprueba que la función existe", () => {
    
    expect(zeroes()).toBe(0); 
  });
});