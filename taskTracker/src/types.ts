/**
 * Definir tipos de la entidad tarea
 */
//TODO: Demasiado pronto para codear, toca conocer el entorno 
//TODO: typescript y el trabajo con json desde typescript
export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: number;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}