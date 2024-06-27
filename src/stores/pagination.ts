// 페이지네이션 스토어
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePageStore = defineStore('listPage', () => {
  const keyword = ref('')
  const currentPage = ref(1)

  return { keyword, currentPage }
})
