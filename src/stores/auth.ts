import { defineStore } from 'pinia'
import { StorageSerializers, useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'
import type { User } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = useLocalStorage('auth/user', null, {
    serializer: StorageSerializers.object
  })
  const isAuthenticated = computed(() => !!user.value)
  const uid = computed(() => user.value?.uid || null)

  const setUser = (userData: User) => {
    user.value = userData
    if (userData) {
      user.value = {
        uid: userData.uid,
        photoURL: userData.photoURL,
        displayName: userData.displayName,
        email: userData.email,
        emailVerified: userData.emailVerified
      }
    } else {
      user.value = null
    }
  }

  return {
    user,
    isAuthenticated,
    uid,
    setUser
  }
})
