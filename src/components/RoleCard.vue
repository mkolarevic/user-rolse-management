<script lang="ts" setup>
import { computed } from 'vue';
import IconLock from './icons/IconLock.vue';

type UserType = {
  id: number,
  first_name: string,
  last_name: string,
  photo_url: string,
}

const props = defineProps<{
  name: string,
  roleType: string,
  description: string,
  editable: boolean,
  active: boolean,
  users: UserType[],
  created_on: string | Date
  modified_on: string | Date
}>()

const roleData = computed(() => {
  return {
    ...props,
    _modified_on: Intl.DateTimeFormat('en-US',
      {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      }).format(new Date(props.modified_on)),
    _users: {
      displayed: props.users.slice(0, 6),
      rest: {
        num: props.users.slice(6, -1).length
      }
    }
  }
})
</script>

<template>
  <article class="role-card">
    <header class="role-card__header">
      <div class="role-status" v-if="!roleData.active">Inactive</div>
    </header>

    <div class="role-card__body">
      <h2 class="role-name">{{ roleData.name }}</h2>
      <h3 class="role-type">{{ roleData.roleType }}</h3>

      <p class="role-description">{{ roleData.description }}</p>

      <div class="user-icons">
        <img class="user-icon" v-for="user in roleData._users.displayed" :key="user.id" :src="user.photo_url"
          :alt="`${user.first_name} ${user.last_name}`" :title="`${user.first_name} ${user.last_name}`">

        <div class="remaining-users" v-if="roleData._users.rest.num">
          {{ roleData._users.rest.num }}
        </div>
      </div>
    </div>

    <footer class="role-card__footer">
      <p class="role-modified">{{ roleData._modified_on }}</p>

      <div class="actions">
        <template v-if="roleData.editable">
          <button class="btn edit">Edit</button>

          <button class="btn delete">Delete</button>
        </template>

        <template v-else>
          <IconLock />
        </template>
      </div>
    </footer>
  </article>
</template>

<style scoped>
.role-card {
  min-height: 16rem;
  border: 1px solid #EFEFEF;
}

.role-card__header {
  padding-inline: 1.5rem;
  padding-top: 1rem;
  min-height: 2.5rem;
}

.role-card__body {
  padding-inline: 1.5rem;
  padding-bottom: 1rem;
}

.role-card__footer {
  align-items: center;
  background-color: #F8F8F8;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1rem;
}

.role-status {
  background-color: var(--color-danger);
  color: white;
  margin-left: auto;
  max-width: fit-content;
  padding: 0.25rem;
  text-transform: uppercase;
  border-radius: 0.25rem;
}

.role-name {
  color: var(--color-text-dark);
  font-weight: 400;
  margin-block: 0;
}

.role-type {
  color: var(--color-text-light);
  font-weight: 400;
  margin-block: 0;
}

.role-description {
  margin-top: 2.5rem;
}

.user-icons {
  display: flex;
  gap: 0.5rem;
  margin-top: 2rem;
}

.user-icons .user-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.remaining-users {
  background-color: gray;
  border-radius: 50%;
  height: 32px;
  width: 32px;
}

.actions {
  display: flex;
  gap: 12px;
}


.role-description,
.role-modified {
  color: var(--color-text-light);
}

.role-modified {
  font-size: 0.8rem;
}

.btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 0.25rem;
  text-transform: uppercase;
}

.btn.edit {
  color: var(--color-text-dark);
}

.btn.delete {
  color: var(--color-danger);
}
</style>