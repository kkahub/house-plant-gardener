import { defineStore } from 'pinia'
import { StorageSerializers, useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '@/firebase/firebase'

export const useAuthStore = defineStore('auth', () => {
  const user = useLocalStorage('auth/user', null, {
    serializer: StorageSerializers.object
  })
  const isAuthenticated = computed(() => !!user.value)
  const uid = computed(() => user.value?.uid || null)

  const setUser = (userData: User | null) => {
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

  const fetchUser = () => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }

  return {
    user,
    isAuthenticated,
    uid,
    setUser,
    fetchUser
  }
})
