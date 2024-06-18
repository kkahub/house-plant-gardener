// 실내식물 스토어
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useProtectStore = defineStore('protectPage', () => {
  const protectKeyword = ref('')
  const protectCurrentPage = ref(1)

  return { protectKeyword, protectCurrentPage }
})
