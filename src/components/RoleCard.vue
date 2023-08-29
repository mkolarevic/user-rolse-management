<script lang="ts" setup>
import { computed } from 'vue';
import IconLock from './icons/IconLock.vue';

type UserType = {
  id: number,
  first_name: string,
  last_name: string,
  photo_url: string,
}

type RoleType = {
  id: number,
  name: string,
  type: string,
  description: string,
  editable: boolean,
  active: boolean,
  users: UserType[],
  created_on: string | Date
  modified_on: string | Date
}

const props = defineProps<{
  role: RoleType
}>()

const roleData = computed(() => {
  return {
    ...props.role,
    _modified_on: Intl.DateTimeFormat('en-US',
      {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      }).format(new Date(props.role.modified_on)),
    _users: {
      displayed: props.role.users.slice(0, 6),
      rest: {
        num: props.role.users.slice(6, -1).length
      }
    }
  }
})

const emits = defineEmits<{
  (event: 'delete', value: RoleType): void
}>()
</script>

<template>
  <article class="role-card">
    <header class="role-card__header">
      <div class="role-status" v-if="!roleData.active">Inactive</div>
    </header>

    <div class="role-card__body">
      <h2 class="role-name">{{ roleData.name }}</h2>
      <h3 class="role-type">{{ roleData.type }}</h3>

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

          <button class="btn delete" @click="emits('delete', props.role)">Delete</button>
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

/* HEADER */
.role-card__header {
  padding-inline: 1.5rem;
  padding-top: 1rem;
  min-height: 2.5rem;
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

/* BODY */
.role-card__body {
  padding-inline: 1.5rem;
  padding-bottom: 1rem;
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

/* FOOTER */
.role-card__footer {
  align-items: center;
  background-color: #F8F8F8;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1rem;
}

.role-modified {
  font-size: 0.8rem;
}

.actions {
  display: flex;
  gap: 12px;
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

/* SHARED */
.role-description,
.role-modified {
  color: var(--color-text-light);
}
</style>