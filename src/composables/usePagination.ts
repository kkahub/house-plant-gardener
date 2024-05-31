import { nextTick, onMounted, ref, watch } from 'vue'
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
  const isPrev = ref(false) // true가 disabled 활성화
  const isNext = ref(false) // true가 disabled 활성화

  // 전체 페이지 수
  const totalComputed = () => {
    if (total.value % pageSize.value === 0) {
      return total.value / pageSize.value
    } else {
      return Math.ceil(total.value / pageSize.value)
    }
  }

  // 마지막 페이지 체크
  const lastPageCheck = () => {
    totalPage.value = totalComputed()
    // console.log(totalPage.value)

    if (totalPage.value <= pageCount.value) {
      if (startPage.value + pageCount.value <= totalPage.value) {
        isNext.value = false
      } else {
        isNext.value = true
      }
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

  watch(
    startPage,
    () => {
      // 첫 페이지 체크
      if (guideCurrentPage.value <= 1) {
        isPrev.value = true
      } else {
        isPrev.value = false
      }

      // 마지막 페이지 체크
      lastPageCheck()
    },
    { immediate: true }
  )

  // onMounted(() => {
  //   totalComputed()
  //   nextTick(() => {
  //     // console.log('응?', total.value, pageSize.value)
  //     // console.log(totalPage.value)
  //   })
  //   lastPageCheck()
  // })

  // prev 클릭
  const prevPage = (execute: any) => {
    if (startPage.value > pageCount.value) {
      startPage.value -= pageCount.value
      getPage(startPage.value, execute)
    }
  }

  // next 클릭
  const nextPage = async (execute: any, event: MouseEvent) => {
    // console.log(totalPage.value)
    // console.log('넥스트:', isNext.value)
    if (!isNext.value) {
      // console.log('이벤트 멈춰!')
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
