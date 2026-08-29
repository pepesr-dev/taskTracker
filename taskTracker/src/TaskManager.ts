import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Reemplazo moderno para __dirname en entornos ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function cargarJSON() {
  try {
    const filePath = path.join(__dirname, './db/tasks.json');
    
    const content = await fs.readFile(filePath, 'utf-8');
    
    const data = JSON.parse(content);
    
    return data;
  } catch (error) {
    console.error('Error al leer el archivo JSON:', error);
  }
}

export function zeroes(){
    return 0;
}

cargarJSON();
