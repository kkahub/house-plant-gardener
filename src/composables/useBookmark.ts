import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import {
  addBookmark,
  removeBookmark,
  hasBookmark,
  getBookmarkCount,
  bookmarkCountComputed
} from '@/services/guide'

export const useBookmark = (code: string) => {
  const { uid, isAuthenticated } = storeToRefs(useAuthStore())

  const isBookmark = ref(false)
  const bookmarkCount = ref(0)
  const guideCode = ref(code)

  // 로그인 시 북마크 상태 가져오기
  const getBookmarkStatus = async () => {
    if (isAuthenticated.value === false) {
      isBookmark.value = false
      return
    }

    // 북마크 상태 가져오기
    isBookmark.value = await hasBookmark(uid.value, guideCode.value)

    // 북마크 갯수 가져오기
    bookmarkCount.value = await getBookmarkCount(guideCode.value)
  }

  // 북마크 토글
  const toggleBookmark = async () => {
    if (isAuthenticated.value === false) {
      alert('로그인 후 이용해주세요.')
      return
    }

    if (isBookmark.value) {
      await removeBookmark(uid.value, guideCode.value)
      bookmarkCount.value -= 1
      bookmarkCountComputed(guideCode.value, bookmarkCount.value)
    } else {
      await addBookmark(uid.value, guideCode.value)
      bookmarkCount.value += 1
      bookmarkCountComputed(guideCode.value, bookmarkCount.value)
    }
    isBookmark.value = !isBookmark.value
  }

  watch(isAuthenticated, () => getBookmarkStatus(), { immediate: true })

  return {
    isBookmark,
    toggleBookmark,
    bookmarkCount
  }
}
