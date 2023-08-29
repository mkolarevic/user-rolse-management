<script setup lang="ts">
import { ref } from 'vue';
import IconSearch from '../components/icons/IconSearch.vue'
import RoleCard from '../components/RoleCard.vue'
import { useRolesStore } from '@/stores/roles';
const store = useRolesStore()

const searchInput = ref('')


const statusSelect = ref('both')
</script>

<template>
  <main>
    <h1>User Roles Management</h1>

    <div class="menu">
      <div class="search-and-filters">
        <div class="search-input">
          <input :value="searchInput" type="text" placeholder="search">
          <IconSearch />
        </div>

        <div class="status-select">
          <label for="roleStatus">Role status</label>

          <select :value="statusSelect" name="roleStatus" id="roleStatus">
            <option value="both">Active and Inactive</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <button class="btn-create">
        Create new role
      </button>
    </div>

    <div class="roles-wrapper">
      <RoleCard v-for="role in store.roles" :key="role.id" :name="role.name" :roleType="role.type"
        :description="role.description" :editable="role.editable" :active="role.active" :users="role.users"
        :created_on="role.created_on" :modified_on="role.modified_on" />
    </div>
  </main>
</template>

<style scoped>
.menu {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
}

.search-and-filters {
  display: flex;
  gap: 2rem;
}

.search-input {
  display: flex;
}

.search-input input {
  border: none;
  border-bottom: 1px solid var(--color-primary);
}

.status-select label {
  font-size: 14px;
}

.status-select select {
  background-color: white;
  border-bottom: 1px solid var(--color-primary);
  border-left: none;
  border-right: none;
  border-top: none;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.btn-create {
  background-color: var(--color-primary);
  border-radius: 4px;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px 12px;
}

.roles-wrapper {
  margin-top: 3rem;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(3, 1fr);
}
</style>