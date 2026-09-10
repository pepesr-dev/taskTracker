export class Task {
  constructor(
    public id: number,
    public description: string,
    public status: string = "todo",
    public createdAt: string,
    public updatedAt: string,
  ) {}
}
