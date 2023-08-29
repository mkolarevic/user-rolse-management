<script setup lang="ts">
import FormItem from '@/components/FormItem.vue';
import { reactive } from 'vue';

/* Setup */
const props = defineProps<{
  role?: any
  isEdit?: boolean
}>()

/* State */
const form = reactive({
  name: props.role?.name ?? '',
  type: props.role?.type ?? '',
  description: props.role?.description ?? '',
  editable: props.role?.editable ?? false,
  active: props.role?.active ?? false,
})

/* Events */
function submit() {
  emits('submit', form)
}

const emits = defineEmits<{
  (event: 'submit', value: any): void
}>()
</script>

<template>
  <form action="POST" @submit.prevent="submit" class="create-form">
    <FormItem label="Name" labelFor="name">
      <input v-model="form.name" type="text">
    </FormItem>

    <FormItem label="Type" labelFor="type">
      <input type="text" v-model="form.type">
    </FormItem>

    <FormItem label="Description" labelFor="description">
      <textarea rows="3" cols="30" v-model="form.description"></textarea>
    </FormItem>

    <FormItem v-if="!isEdit" label="Editable" labelFor="editable">
      <input type="checkbox" v-model="form.editable">
    </FormItem>

    <FormItem label="Active" labelFor="Active">
      <input type="checkbox" v-model="form.active">
    </FormItem>

    <div class="btns">
      <button type="submit" class="btn-create">
        {{ isEdit ? 'Edit' : 'Create' }}
      </button>

      <button type="reset" class="btn-reset">
        Reset form
      </button>
    </div>
  </form>
</template>

<style scoped>
.create-form {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.btns {
  display: flex;
  gap: 2rem;
}
</style>