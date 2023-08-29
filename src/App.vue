<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
main {
  margin-inline: auto;
  max-width: 80rem;
  margin-bottom: 2rem;
}
</style>
