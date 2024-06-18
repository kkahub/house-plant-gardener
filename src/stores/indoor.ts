// 실내식물 스토어
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useIndoorStore = defineStore('indoorPage', () => {
  const indoorKeyword = ref('')
  const indoorCurrentPage = ref(1)

  return { indoorKeyword, indoorCurrentPage }
})
