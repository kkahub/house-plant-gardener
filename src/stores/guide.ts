// 식물 도감 스토어
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGuideStore = defineStore('guidePage', () => {
  const guideKeyword = ref('')
  const guideCurrentPage = ref(1)

  return { guideKeyword, guideCurrentPage }
})
