import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { hasLike } from '@/services/guide'

const { uid, isAuthenticated } = storeToRefs(useAuthStore())

export const useLike = (id, count) => {
  const isLike = ref(false)

  // 로그인 시 좋아요 상태 가져오기
  const getLikeStatus = async (uid: string, count: number) => {
    if (isAuthenticated.value === false) {
      isLike.value = false
      return
    }
    // 좋아요 상태 가져오기
    isLike.value = await hasLike(uid, count)
  }

  // 좋아요 토글
  const toggleLike = () => {
    if (isAuthenticated.value === false) {
      alert('로그인 후 이용해주세요.')
      return
    }
    isLike.value = !isLike.value
    console.log('좋아요: ', isLike.value)
  }

  return {
    isLike,
    getLikeStatus
  }
}
