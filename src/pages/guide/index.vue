<template>
  <section class="wrap_guide_list">
    <div class="inner">
      <div class="page_header">
        <div class="title_wrap">
          <h2 class="page_title">식물 도감</h2>
          <p class="title_desc">국립수목원에서 제공하는 식물의 정보를 자세히 소개합니다.</p>
        </div>
        <SearchBar v-model:keyword="guideKeyword" :loading="isLoading" @submit="handleSearch" />
      </div>

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
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAsyncState } from '@vueuse/core'
import { usePagination } from '@/composables/usePagination'
import { storeToRefs } from 'pinia'
import { useGuideStore } from '@/stores/guide'
import getPlantGuideList from '@/service/guide'
import SearchBar from '@/pages/components/details/SearchBar.vue'
import GuideList from '@/components/apps/guide/GuideList.vue'
import Pagination from '@/components/pagination/Pagination.vue'

const guideStore = useGuideStore()
const { guideKeyword, guideCurrentPage } = storeToRefs(guideStore)

const plantItems = ref()

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
      plantItems.value = result
      if (result) {
        total.value = result[0].total
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
}
</script>

<style scoped></style>
