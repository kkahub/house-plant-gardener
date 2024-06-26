import { ref, watch } from 'vue'
import { usePageStore } from '@/stores/pagination'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

export const usePagination = (size: number, keyword: string, execute: any) => {
  const pageSize = ref(size) // 한 페이지에 보여줄 아이템 수
  const total = ref(0) // 전체 아이템 수
  const startPage = ref(1) // 페이시 넘버 처음 숫자
  const totalPage = ref(0) // 전체 페이지 수
  const pageCount = ref(10) // 한 번에 보여 줄 페이지 수
  const isPrev = ref(true) // true가 활성화
  const isNext = ref(true) // true가 활성화

  const route = useRoute()
  const router = useRouter()

  const guideStore = usePageStore()
  const { currentPage } = storeToRefs(guideStore)

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
    let startNum

    totalPage.value = totalComputed()

    const startComputed = Math.trunc((currentPage.value - 1) / pageCount.value)
    startComputed < 1 ? (startNum = 1) : (startNum = startComputed * pageCount.value + 1)

    if (totalPage.value !== 0) {
      for (let i = startNum; i < Math.min(totalPage.value + 1, startNum + pageCount.value); i++) {
        arr.push(i)
      }
      startPage.value = arr[0]
    }
    return arr
  }

  // 이전, 다음 체크
  watch(
    [total, startPage],
    () => {
      // isPrev 체크
      currentPage.value <= pageCount.value ? (isPrev.value = false) : (isPrev.value = true)

      // isNext 체크
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

  // routing
  const routeChange = () => {
    currentPage.value = startPage.value
    router
      .push({ path: `${route.matched[0].path}`, query: { page: `${currentPage.value}` } })
      .catch(() => {})
  }

  // prev 클릭
  const prevPage = () => {
    if (!isPrev.value) return

    if (startPage.value > pageCount.value) {
      startPage.value -= pageCount.value
      routeChange()
      getPage(startPage.value, execute)
    }
  }

  // next 클릭
  const nextPage = () => {
    if (!isNext.value) return

    startPage.value += pageCount.value
    routeChange()
    getPage(startPage.value, execute)
  }

  // 페이지 리스트 호출
  const getPage = async (num: number, e: MouseEvent) => {
    if (route.query.page === undefined || currentPage.value === num) return

    currentPage.value = num

    await execute(0, {
      currentPage: currentPage.value,
      currentPageSize: pageSize.value,
      searchWord: keyword
    })
    window.scrollTo(0, 0)
  }

  // 라우트 감시(뒤로가기, 앞으로가기 등)
  watch(route, async () => {
    const queryPage = route.query.page

    if (queryPage !== undefined) {
      currentPage.value = Number(queryPage)
      await execute()
    }
  })

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
