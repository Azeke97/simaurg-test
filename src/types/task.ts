export interface Task {
    id?: number | string;
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
}