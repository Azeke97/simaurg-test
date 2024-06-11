<template>
  <div class="task-list">
    <div class="search-section">
      <input type="text" v-model="searchQuery" placeholder="Поиск" />
      <button-ui class="btn --primary custom" @click="openModal(undefined)">ДОБАВИТЬ ЗАДАЧУ</button-ui>
    </div>
    <ul>
      <TaskItem v-for="task in filteredTasks" :key="task.id" :task="task" @edit="openModal" @delete="confirmDeleteTask" @update="updateTaskStatus" />
    </ul>
    <p v-if="filteredTasks.length === 0" class="no-results">Нет результатов</p>
    <TaskModal v-if="modalVisible" :task="selectedTask" @close="closeModal" @save="saveTask" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useTaskStore } from '@/store/taskStore';
import type { Task } from '@/types/task';
import TaskItem from '@/components/TaskItem.vue';
import TaskModal from '@/components/TaskModal.vue';
import ButtonUi from "@/components/ui/ButtonUi.vue";

const taskStore = useTaskStore();
const searchQuery = ref('');
const modalVisible = ref(false);
const selectedTask = ref<Task | undefined>(undefined);

const filteredTasks = computed(() =>
    taskStore.tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
);

const openModal = (task: Task | undefined) => {
  selectedTask.value = task;
  modalVisible.value = true;
};

const closeModal = () => {
  modalVisible.value = false;
  selectedTask.value = undefined;
};

const saveTask = async (task: Task) => {
  if (task.id) {
    await taskStore.updateTask(task);
  } else {
    await taskStore.addTask(task);
  }
  closeModal();
};

const updateTaskStatus = async (task: Task) => {
  await taskStore.updateTask(task);
};

const confirmDeleteTask = (taskId: string | number) => {
  if (confirm('Вы уверены что хотите удалить задачу?')) {
    deleteTask(taskId);
  }
};

const deleteTask = async (taskId: string | number) => {
  await taskStore.deleteTask(taskId);
};

onMounted(() => {
  taskStore.fetchTasks();
});
</script>

<style lang="scss">
@import '@/assets/style.scss';
</style>
