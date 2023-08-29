<script setup lang="ts">
import { onBeforeMount, reactive, ref, watch } from 'vue';
import IconSearch from '../components/icons/IconSearch.vue'
import RoleCard from '../components/RoleCard.vue'
import { useRolesStore } from '@/stores/roles';
import router from '@/router';

/* Setup */
const store = useRolesStore()

/* State */
const searchInput = ref('')
const statusSelect = ref('both')
const debounce = reactive({
  timerId: 0,
  clear: () => {
    clearTimeout(debounce.timerId)
  },
  start: (fn: Function) => {
    if (debounce.timerId) debounce.clear()

    debounce.timerId = setTimeout(() => {
      fn()
    }, 500);
  }
})

/* Data */
const data = ref<typeof store.roles>([])

function getData() {
  const query = {
    search: searchInput.value || undefined,
    status: statusSelect.value === 'both' ? undefined : statusSelect.value
  }

  router.push({
    path: '',
    query
  })
  data.value = store.filteredRoles(query.search, query.status)
}

/* LCH */
onBeforeMount(() => {
  getData()
})

/* Side-effects */
watch(
  searchInput, (_x) => {
    debounce.start(getData)
  }
)
watch(
  statusSelect, (_x) => {
    getData()
  }
)
</script>

<template>
  <main>
    <h1>User Roles Management</h1>

    <div class="menu">
      <div class="search-and-filters">
        <div class="search-input">
          <input @change="getData" v-model="searchInput" type="text" placeholder="search">
          <IconSearch />
        </div>

        <div class="status-select">
          <label for="roleStatus">Role status</label>

          <select v-model="statusSelect" name="roleStatus" id="roleStatus">
            <option value="both">Active and Inactive</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <RouterLink to="/create">
        <button class="btn-create" tabindex="-1">
          Create new role
        </button>
      </RouterLink>
    </div>

    <div class="roles-wrapper">
      <RoleCard v-for="role in data" :key="role.id" :name="role.name" :roleType="role.type"
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
  padding: 6px 12px;
  text-transform: uppercase;
  align-self: flex-end;
}

.roles-wrapper {
  margin-top: 3rem;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(3, 1fr);
}

@media screen and (max-width: 900px) {
  .roles-wrapper {
    grid-template-columns: 1fr;
  }
}
</style>