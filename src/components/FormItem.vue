<script setup lang="ts">
defineProps<{
  labelFor: string
  label: string
}>()
</script>

<template>
  <div class="form-item">
    <label :for="labelFor">{{ label }}</label>
    <slot />
  </div>
</template>

<style scoped>
.form-item {
  align-items: start;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.form-item>label {
  font-size: 0.8rem;
  color: var(--color-text-dark);
}
</style>