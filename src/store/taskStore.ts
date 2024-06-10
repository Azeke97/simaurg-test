import { defineStore } from 'pinia';
import axios from 'axios';
import type { Task } from '@/types/task';

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [] as Task[]
    }),
    actions: {
        async fetchTasks() {
            const response = await axios.get('http://localhost:3000/tasks');
            this.tasks = response.data;
        },
        async addTask(task: Task) {
            const response = await axios.post('http://localhost:3000/tasks', task);
            this.tasks.push(response.data);
        },
        async updateTask(task: Task) {
            const response = await axios.put(`http://localhost:3000/tasks/${task.id}`, task);
            const index = this.tasks.findIndex(t => t.id === task.id);
            this.tasks[index] = response.data;
        },
        async deleteTask(taskId: number | string) {
            await axios.delete(`http://localhost:3000/tasks/${taskId}`);
            this.tasks = this.tasks.filter(t => t.id !== taskId);
        }
    }
});