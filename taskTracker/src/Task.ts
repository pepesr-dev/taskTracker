

// Definimos los 3 estados permitidos
export type TaskStatus = "todo" | "in progress" | "done";

export class Task {
    constructor(
        public id: number,
        public description: string,
        public status: TaskStatus = "todo" ,
        public createdAt: string,
        public updatedAt: string,
        
    ) {}
}
