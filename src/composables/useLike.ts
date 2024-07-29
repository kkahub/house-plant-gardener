import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { addLike, removeLike, hasLike, getLikeCount, likeCountComputed } from '@/services/guide'

export const useLike = (name: string, code: string) => {
  const { uid, isAuthenticated } = storeToRefs(useAuthStore())

  const isLike = ref(false)
  const likeCount = ref(0)
  const guideName = ref(name)
  const guideCode = ref(code)

  // 좋아요 호출
  const getLikeStatus = async () => {
    // 좋아요 갯수 가져오기
    likeCount.value = await getLikeCount(guideName.value, guideCode.value)

    if (isAuthenticated.value === false) {
      isLike.value = false
      return
    }

    // 좋아요 상태 가져오기
    isLike.value = await hasLike(uid.value, `${guideName.value}_${guideCode.value}`)
  }

  // 좋아요 토글
  const toggleLike = async () => {
    if (isAuthenticated.value === false) {
      alert('로그인 후 이용해주세요.')
      return
    }

    if (isLike.value) {
      await removeLike(uid.value, `${guideName.value}_${guideCode.value}`)
      likeCount.value -= 1
      likeCountComputed(guideName.value, guideCode.value, likeCount.value)
    } else {
      await addLike(uid.value, `${guideName.value}_${guideCode.value}`)
      likeCount.value += 1
      likeCountComputed(guideName.value, guideCode.value, likeCount.value)
    }
    isLike.value = !isLike.value
  }

  watch(isAuthenticated, () => getLikeStatus(), { immediate: true })

  return {
    isLike,
    toggleLike,
    likeCount
  }
}
