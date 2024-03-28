<template>
  <section class="wrap_guide_list">
    <div class="inner">
      <div class="page_header">
        <div class="title_wrap">
          <h2 class="page_title">식물 도감</h2>
          <p class="title_desc">국립수목원에서 제공하는 식물의 정보를 자세히 소개합니다.</p>
        </div>
        <SearchBar
          v-model:keyword="guideKeyword"
          :prev-keyword="prevKeyword"
          :loading="isLoading"
          @submit="handleSearch"
        />
      </div>

      <div v-if="!isNoData" class="guide_list_wrap">
        <GuideList :plant-items="plantItems" />
        <Pagination
          :get-page="getPage"
          :page-array="pageArray"
          :prev-page="prevPage"
          :next-page="nextPage"
          :start-page="startPage"
          :current-page="guideCurrentPage"
          :is-prev="isPrev"
          :is-next="isNext"
          :execute-page="executePage"
          :loading="isLoading"
        />
      </div>
      <div v-else class="no_data">검색된 식물이 없습니다.</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAsyncState } from '@vueuse/core'
import { usePagination } from '@/composables/usePagination'
import { storeToRefs } from 'pinia'
import { useGuideStore } from '@/stores/guide'
import getPlantGuideList from '@/services/guide'
import SearchBar from '@/pages/components/details/SearchBar.vue'
import GuideList from '@/components/apps/guide/GuideList.vue'
import Pagination from '@/components/pagination/Pagination.vue'

const guideStore = useGuideStore()
const { guideKeyword, guideCurrentPage } = storeToRefs(guideStore)

const plantItems = ref()
const prevKeyword = ref('')
const isNoData = ref(false)

// Pagination
const { pageArray, prevPage, nextPage, getPage, pageSize, total, startPage, isPrev, isNext } =
  usePagination()

// 식물 기본정보 데이터 가져오기
const { isLoading, execute } = useAsyncState(
  () =>
    getPlantGuideList({
      currentPage: guideCurrentPage.value,
      currentPageSize: pageSize.value,
      searchWord: guideKeyword.value
    }),
  null,
  {
    throwError: true,
    onSuccess: (result) => {
      console.log('itemCount: ', result?.length)
      if (result?.length === 0) {
        isNoData.value = true
      } else {
        isNoData.value = false
        plantItems.value = result

        if (result) {
          total.value = result[0].total
        }
      }
    }
  }
)

const executePage = () => {
  execute(0, {
    currentPage: guideCurrentPage.value,
    currentPageSize: pageSize,
    searchWord: guideKeyword.value
  })
}

const handleSearch = () => {
  guideCurrentPage.value = 1
  executePage()
  prevKeyword.value = guideKeyword.value
}
</script>

<style scoped></style>
