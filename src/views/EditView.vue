<script setup lang="ts">
import CreateEditForm from '@/components/CreateEditForm.vue';
import router from '@/router';
import { useRolesStore } from '@/stores/roles';
import { onBeforeMount, ref } from 'vue';

/* LCH */
onBeforeMount(() => {
  data.value = useRolesStore().findRole(parseInt(router.currentRoute.value.params.id as string))
})

/* Data */
const data = ref<any>()

/* API */
function submit(formData: any) {
  let res = useRolesStore().addRole(formData)
  if (res === 'success') {
    router.push('/')
  }
}
</script>
<template>
  <section class="create-page">
    <RouterLink class="backlink" to="/">
      Go back
    </RouterLink>

    <template v-if="data">
      <CreateEditForm :btn-label="`Edit`" :role="data" @submit="submit" />
    </template>
  </section>
</template>

<style scoped>
.create-page {
  background-color: #f3f3f3;
  margin-block: auto;
  padding: 2rem;
}

.backlink {
  color: black;
  text-decoration: none;
}
</style>