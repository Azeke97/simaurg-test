<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <button class="close-button" @click="close">&times;</button>
      <form @submit.prevent="save">
        <label>
          НАЗВАНИЕ
          <input v-model="task.title" required />
        </label>
        <label>
          ОПИСАНИЕ
          <input v-model="task.description" required />
        </label>
        <label>
          СРОК ВЫПОЛНЕНИЯ
          <input type="date" v-model="task.dueDate" required />
        </label>
        <div class="modal-actions">
          <button-ui class="btn --primary custom" type="submit">СОХРАНИТЬ</button-ui>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import type { Task } from '@/types/task';
import ButtonUi from "@/components/ui/ButtonUi.vue";

const props = defineProps<{ task: Task | undefined }>();
const emits = defineEmits(['close', 'save']);

const task = ref<Task>(props.task ? { ...props.task } : { title: '', description: '', dueDate: '', completed: false } as Task);

watch(props, (newProps) => {
  task.value = newProps.task ? { ...newProps.task } : { title: '', description: '', dueDate: '', completed: false } as Task;
});

const save = () => {
  emits('save', task.value);
  alert(task.value.id ? 'Задача успешно обновлена!' : 'Задача успешно создана!');
};

const close = () => emits('close');
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';
</style>