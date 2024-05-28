// 식물 도감 스토어
import { db } from '@/firebase/firebase'
import { ref } from 'vue'
import { defineStore } from 'pinia'

import { doc, setDoc } from 'firebase/firestore'

export const useGuideStore = defineStore('guidePage', () => {
  const guideKeyword = ref('')
  const guideCurrentPage = ref(1)

  return { guideKeyword, guideCurrentPage }
})

export async function addLike(uid, plantCode) {
  await setDoc(doc(db, 'plant_like', `${uid}_${plantCode}`), {})
}
