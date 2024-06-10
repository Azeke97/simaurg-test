<template>
  <button class="btn--primary" :class="computedClass" @click="handleClick" :type="type" :disabled="disabled">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps<{
  type?: 'button' | 'submit' | 'reset';
  color?: 'primary';
  disabled?: boolean;
}>();

const emit = defineEmits(['click']);

const computedClass = computed(() => {
  return {
    'button-ui--primary': props.color === 'primary',
    'button-ui--disabled': props.disabled,
  };
});

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>

<style lang="scss">
@import '@/assets/style.scss';
</style>