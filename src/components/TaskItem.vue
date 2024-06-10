<template>
  <div class="task-item" :class="{ overdue: isOverdue && !task.completed }">
    <div class="task-item__left">
      <input type="checkbox" :checked="task.completed" @change="toggleStatus" />
      <div>
        <h3 :class="{ completed: task.completed }">{{ task.title }}</h3>
        <p>{{ task.dueDate }}</p>
      </div>
    </div>
    <div class="task-item__right">
      <button-ui class="btn --primary custom" @click="deleteTask">УДАЛИТЬ</button-ui>
      <button-ui class="btn --primary custom" @click="editTask">РЕДАКТИРОВАТЬ</button-ui>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonUi from "@/components/ui/ButtonUi.vue";
import { defineProps, defineEmits, computed } from 'vue';
import type { Task } from '@/types/task';

const props = defineProps<{ task: Task }>();
const emits = defineEmits(['edit', 'delete', 'update']);

const isOverdue = computed(() => new Date(props.task.dueDate) < new Date());

const editTask = () => emits('edit', props.task);
const deleteTask = () => emits('delete', props.task.id!);
const toggleStatus = () => {
  emits('update', { ...props.task, completed: !props.task.completed });
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';
</style>