import { ref, watch } from 'vue'
import { useGuideStore } from '@/stores/guide'
import { storeToRefs } from 'pinia'

export const usePagination = (size: number) => {
  const pageSize = ref(size) // 한 페이지에 보여줄 아이템 수
  const total = ref(0) // 전체 아이템 수
  const startPage = ref(1) // 페이시 넘버 처음 숫자
  const totalPage = ref(0) // 전체 페이지 수
  const pageCount = ref(10) // 한 번에 보여 줄 페이지 수
  const isPrev = ref(true) // true가 활성화
  const isNext = ref(true) // true가 활성화

  const guideStore = useGuideStore()
  const { guideCurrentPage } = storeToRefs(guideStore)

  // 전체 페이지 수 계산
  const totalComputed = () => {
    if (total.value % pageSize.value === 0) {
      return total.value / pageSize.value
    } else {
      return Math.ceil(total.value / pageSize.value)
    }
  }

  // 노출할 페이지 배열
  const pageArray = (start: number) => {
    const arr = []

    totalPage.value = totalComputed()

    if (totalPage.value !== 0) {
      for (let i = start; i < Math.min(totalPage.value + 1, start + pageCount.value); i++) {
        arr.push(i)
      }
      startPage.value = arr[0]
    }
    return arr
  }

  // isPrev 체크
  watch(
    startPage,
    () => {
      // 첫 페이지 체크
      guideCurrentPage.value <= 1 ? (isPrev.value = false) : (isPrev.value = true)
    },
    { immediate: true }
  )

  // isNext 체크
  watch(
    [total, startPage],
    () => {
      totalPage.value = totalComputed()

      if (totalPage.value <= pageCount.value) {
        isNext.value = false
      } else {
        if (startPage.value + pageCount.value <= totalPage.value) {
          isNext.value = true
        } else {
          isNext.value = false
        }
      }
    },
    { immediate: true }
  )

  // prev 클릭
  const prevPage = (execute: any, event: MouseEvent) => {
    if (!isPrev.value) {
      event.preventDefault()
      return
    }
    if (startPage.value > pageCount.value) {
      startPage.value -= pageCount.value
      getPage(startPage.value, execute)
    }
  }

  // next 클릭
  const nextPage = async (execute: any, event: MouseEvent) => {
    if (!isNext.value) {
      event.preventDefault()
      return
    }
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
