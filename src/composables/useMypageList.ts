import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAsyncState } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { usePageStore } from '@/stores/pagination'
import { usePagination } from '@/composables/usePagination'
import { getBookmarkList } from '@/services/guide'
import type { BookmarkList, GuideListWithImage } from '@/types/guide'

const PAGE_SIZE = 12

export const useMypageList = (getPlantIDs: () => Promise<Pick<BookmarkList, 'plantId'>[]>) => {
  const { currentPage } = storeToRefs(usePageStore())
  const route = useRoute()

  const plantIds = ref<string[]>()
  const plantItems = ref<GuideListWithImage[]>([])
  const isNoData = ref(false)

  currentPage.value = Number(route.query.page ?? 1)

  const { isLoading: isListLoading, execute } = useAsyncState(
    () =>
      getBookmarkList(
        (plantIds.value ?? []).slice(
          (currentPage.value - 1) * PAGE_SIZE,
          currentPage.value * PAGE_SIZE
        )
      ),
    [],
    {
      immediate: false,
      onSuccess: (result) => {
        isNoData.value = result.length === 0
        plantItems.value = result
      }
    }
  )

  const executePage = async () => {
    await execute()
  }

  const pagination = usePagination(PAGE_SIZE, executePage)

  const { isLoading: isIdLoading } = useAsyncState(getPlantIDs, [], {
    onSuccess: (result) => {
      plantIds.value = result.map((item) => item.plantId)
      pagination.total.value = plantIds.value.length

      if (plantIds.value.length === 0) {
        isNoData.value = true
      } else {
        execute()
      }
    }
  })

  watch(
    () => route.query.page,
    (page) => {
      if (page === undefined && plantIds.value) {
        currentPage.value = 1
        execute()
      }
    }
  )

  return {
    ...pagination,
    currentPage,
    plantItems,
    isNoData,
    isLoading: computed(() => isIdLoading.value || isListLoading.value)
  }
}
