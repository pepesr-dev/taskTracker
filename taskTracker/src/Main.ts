#!/usr/bin/env node
import { TaskManager } from "./TaskManager.js";
import { DAO } from "./DAO.js";
import * as rl from "readline";
import { Task } from "./Task.js";
import type { TaskStatus } from "./Task.js";

// Configuramos la lectura de la terminal
const READ_LINE = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const dao = new DAO();
const manager = new TaskManager();

async function main() {
  const args = process.argv.slice(2);

  // Obtenemos la primera palabra (el comando: "add", "delete", etc.)
  const ACTION = args[0]?.toLowerCase();

  // Unimos el resto de palabras con espacios para formar la descripción de la tarea
  const DESCRIPTION = args.slice(1).join(" ");

  await manager.load();

  if (ACTION === "add") {
    if (!DESCRIPTION) {
      console.log("Error al agregar la nueva tarea.");
      return;
    }

    await manager.addTask(DESCRIPTION);
    console.log("Tarea agregada: " + DESCRIPTION);
  }

  READ_LINE.close();
}
/*
function mostrarMenu(): void {
    console.log("\n--- CLI GESTOR DE TAREAS ---");
    console.log("Agregar una tarea nueva: add \" tareaNueva\"");
    //console.log("2. Cambiar estado de una tarea");
    //console.log("3. Listar todas las tareas");
    console.log("4. Salir");
    
    READ_LINE.question("\nSelecciona una opción (1-4): ", (opcion) => {
        const OPCION = opcion.trim();
        
        if (OPCION === "1") {
            READ_LINE.question("Escribe el título de la tarea: ", (titulo) => {
                const nueva = app.agregarTarea(titulo);
                console.log(`\n✅ Tarea creada con ID: ${nueva.id}`);
                mostrarMenu();
            });
        } 
        else if (OPCION === "2") {
            READ_LINE.question("Introduce el ID de la tarea: ", (idStr) => {
                const id = parseInt(idStr);
                READ_LINE.question("Introduce el nuevo estado (todo / in progress / done): ", (estado) => {
                    const est = estado.trim() as EstadoTarea;
                    
                    // Validación básica del estado antes de enviarlo
                    if (est === "todo" || est === "in progress" || est === "done") {
                        const exito = app.actualizarEstado(id, est);
                        if (exito) {
                            console.log("\n🔥 Estado actualizado con éxito.");
                        } else {
                            console.log("\n❌ No se encontró ninguna tarea con ese ID.");
                        }
                    } else {
                        console.log("\n❌ Estado no válido. Usa: todo, in progress o done.");
                    }
                    mostrarMenu();
                });
            });
        } 
        else if (OPCION === "3") {
            console.log("\n--- LISTA DE TAREAS ---");
            const tareas = app.obtenerTodas();
            if (tareas.length === 0) {
                console.log("No hay tareas registradas.");
            } else {
                tareas.forEach(t => {
                    let icono = t.estado === "todo" ? "⚪" : t.estado === "in progress" ? "🟡" : "🟢";
                    console.log(`${icono} ID: ${t.id} | ${t.titulo} [${t.estado}]`);
                });
            }
            mostrarMenu();
        } 
        else if (OPCION === "4") {
            console.log("\n👋 ¡Hasta luego!");
            READ_LINE.close();
        } 
        else {
            console.log("\n⚠️ Opción inválida.");
            mostrarMenu();
        }
    });
}


*/

// Arranca la aplicación CLI
//mostrarMenu();

await main();
