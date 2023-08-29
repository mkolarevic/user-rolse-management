import { ref } from 'vue'
import { defineStore } from 'pinia'
import userRoles from '../assets/user_roles.json' assert {type: 'json'}

export const useRolesStore = defineStore('roles', () => {
  const roles = ref(userRoles)

  const filteredRoles = (searchQuery?: string, filterQuery?: string) => {
    return roles.value
    .filter((role) => {
      if(!searchQuery) {
        return role
      }

      const _q = searchQuery.toLowerCase()

      return (role.name.toLowerCase().includes(_q) || role.type.includes(_q) || role.description.includes(_q))
    })
    .filter((role) => {
      if (!filterQuery) {
        return role
      }

      if (filterQuery === 'active') return role.active
      if (filterQuery === 'inactive') return !role.active

      return role
    })
  }

  function deleteRole(id: number) {
    roles.value = roles.value.filter((role) => {
      return role.id !== id
    })
  }

  function addRole(role) {
    let _lastID = 1
    roles.value.forEach(_r => {
      if(_r.id > _lastID) _lastID++
    });

    // TODO: validation

    roles.value.push({
      id: _lastID + 1,
      name: role.name,
      type: role.type,
      description: role.description,
      editable: role.editable,
      active: role.active,
      users: [],
      created_on: `${new Date()}`,
      modified_on: `${new Date()}`
    })

    return 'success'
  }

  return { roles, filteredRoles, deleteRole, addRole }
})
