<template>
  <section class="wrap_guide_list">
    <div class="inner">
      <div class="page_header">
        <div class="title_wrap">
          <h2 class="page_title">식물 도감</h2>
          <p class="title_desc">
            Trefle에서 제공하는 식물 이미지와<br>국립수목원에서 제공하는 식물의 정보를 자세히 소개합니다.
          </p>
        </div>
        <SearchBar
          v-model:keyword="keyword"
          :prev-keyword="prevKeyword"
          :loading="isLoading"
          @submit="handleSearch"
        />
      </div>

      <div class="guide_list_wrap">
        <div v-if="isLoading" class="guide_list_loading">
          <div class="loader_inner">
            <div class="loader">로딩중...</div>
          </div>
        </div>
        <div v-else>
          <div v-if="!isNoData" class="guide_list_inner">
            <GuideList :plant-items="plantItems" />
            <Pagination
              :page-array="pageArray"
              :start-page="startPage"
              :current-page="currentPage"
              :prev-page="prevPage"
              :next-page="nextPage"
              :get-page="getPage"
              :guide-keyword="keyword"
              :is-prev="isPrev"
              :is-next="isNext"
              :loading="isLoading"
              path="/guide?page="
            />
          </div>
          <div v-else class="no_data">검색된 식물이 없습니다.</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAsyncState } from '@vueuse/core'
import { usePagination } from '@/composables/usePagination'
import { storeToRefs } from 'pinia'
import { usePageStore } from '@/stores/pagination'
import getGuideList from '@/services/guide'
import SearchBar from '@/pages/components/guide/SearchBar.vue'
import GuideList from '@/components/apps/guide/GuideList.vue'
import Pagination from '@/components/pagination/Pagination.vue'
import type { GuideListWithImage } from '@/types/guide'

const guidePageStore = usePageStore()
const { keyword, currentPage } = storeToRefs(guidePageStore)

const plantItems = ref<GuideListWithImage[]>([])
const prevKeyword = ref('')
const isNoData = ref(false)
const pageSize = ref(8)

const route = useRoute()
const router = useRouter()

// 쿼리 주소를 이용해 다이렉트 접속 시 페이지 값 설정
if (route.query.page !== undefined) {
  currentPage.value = Number(route.query.page)
}

// 식물도감정보 데이터 가져오기
const { isLoading, execute } = useAsyncState(
  () =>
    getGuideList({
      currentPage: currentPage.value,
      currentPageSize: pageSize.value,
      searchWord: keyword.value
    }),
  null,
  {
    throwError: true,
    onSuccess: (result) => {
      if (result?.length === 0 || result === null) {
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

const executePage = async () => {
  await execute()
}

// Pagination
const { pageArray, prevPage, nextPage, getPage, total, startPage, isPrev, isNext } = usePagination(
  pageSize.value,
  keyword.value,
  executePage
)

// 검색
const handleSearch = () => {
  currentPage.value = 1
  executePage()
  prevKeyword.value = keyword.value
  startPage.value = 1

  // 라우팅
  router.push({ path: `${route.matched[0].path}` })
}

// 뒤로가기 할 때 페이지 값 없으면 1로 설정
watch(
  route,
  () => {
    if (route.query.page === undefined) {
      currentPage.value = 1
      executePage()
    }
  },
  { immediate: true }
)
</script>

<style scoped></style>
