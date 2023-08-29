import { ref } from 'vue'
import { defineStore } from 'pinia'
import userRoles from '../assets/user_roles.json' assert {type: 'json'}

export const useRolesStore = defineStore('roles', () => {
  const roles = ref(userRoles)

  return { roles }
})
