// 식물 도감 스토어
import { ref } from 'vue'
import { defineStore } from 'pinia'

import { setDoc } from 'firebase/firestore'

export const useGuideStore = defineStore('guidePage', () => {
  const guideKeyword = ref('')
  const guideCurrentPage = ref(1)

  return { guideKeyword, guideCurrentPage }
})

export async function addLike(uid, plantCode) {
  await setDoc()
}
