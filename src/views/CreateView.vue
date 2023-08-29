<script setup lang="ts">
import FormItem from '@/components/FormItem.vue';

function submit() {
  return null
}
</script>
<template>
  <section class="create-page">
    <RouterLink class="backlink" to="/">
      Go back
    </RouterLink>

    <form action="POST" @submit.prevent="submit" class="create-form">
      <FormItem label="Name" labelFor="name">
        <input type="text">
      </FormItem>

      <FormItem label="Type" labelFor="type">
        <input type="text">
      </FormItem>

      <FormItem label="Editable" labelFor="editable">
        <input type="checkbox">
      </FormItem>

      <FormItem label="Active" labelFor="Active">
        <input type="checkbox">
      </FormItem>

      <div class="btns">
        <button class="btn-create">
          Create
        </button>

        <button class="btn-reset">
          Reset form
        </button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.create-page {
  background-color: #f3f3f3;
  margin-block: auto;
  padding: 2rem;
}

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

.backlink {
  color: black;
  text-decoration: none;
}
</style>