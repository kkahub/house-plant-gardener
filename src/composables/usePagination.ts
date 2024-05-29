import { ref, watch } from 'vue'
import { useGuideStore } from '@/stores/guide'
import { storeToRefs } from 'pinia'

export const usePagination = () => {
  const guideStore = useGuideStore()
  const { guideCurrentPage } = storeToRefs(guideStore)

  const pageSize = ref(16)
  const total = ref(0)
  const startPage = ref(1)
  const totalPage = ref(0)
  const pageCount = ref(10)
  const isPrev = ref(false)
  const isNext = ref(false)

  // 전체 페이지 수
  const totalComputed = () => {
    if (total.value % pageSize.value === 0) {
      totalPage.value = total.value / pageSize.value
    } else {
      totalPage.value = Math.ceil(total.value / pageSize.value)
    }
  }

  // 노출할 페이지 배열
  const pageArray = (start: number) => {
    const arr = []

    totalComputed()
    if (totalPage.value !== 0) {
      for (let i = start; i < Math.min(totalPage.value + 1, start + pageCount.value); i++) {
        arr.push(i)
      }
      startPage.value = arr[0]
    }
    return arr
  }

  watch(
    startPage,
    () => {
      // 첫 페이지 체크
      if (startPage.value <= pageCount.value) {
        isPrev.value = true
      } else {
        isPrev.value = false
      }

      // 마지막 페이지 체크
      if (totalPage.value <= pageCount.value) {
        if (startPage.value + pageCount.value <= totalPage.value) {
          isNext.value = false
        } else {
          isNext.value = true
        }
      }
    },
    { immediate: true }
  )

  // prev 클릭
  const prevPage = (execute: any) => {
    if (startPage.value > pageCount.value) {
      startPage.value -= pageCount.value
      getPage(startPage.value, execute)
    }
  }

  // next 클릭
  const nextPage = async (execute: any) => {
    startPage.value += pageCount.value
    getPage(startPage.value, execute)
  }

  // 페이지 리스트 호출
  const getPage = async (num: number, execute: any) => {
    guideCurrentPage.value = num
    await execute()
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 1000)
  }

  return {
    pageArray,
    prevPage,
    nextPage,
    getPage,
    pageSize,
    total,
    startPage,
    totalPage,
    pageCount,
    isPrev,
    isNext
  }
}
