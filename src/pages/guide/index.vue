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
              :current-page="guideCurrentPage"
              :prev-page="prevPage"
              :next-page="nextPage"
              :get-page="getPage"
              :guide-keyword="guideKeyword"
              :is-prev="isPrev"
              :is-next="isNext"
              :loading="isLoading"
            />
          </div>
          <div v-else class="no_data">검색된 식물이 없습니다.</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAsyncState } from '@vueuse/core'
import { usePagination } from '@/composables/usePagination'
import { storeToRefs } from 'pinia'
import { useGuideStore } from '@/stores/guide'
import getGuideList from '@/services/guide'
import SearchBar from '@/pages/components/guide/SearchBar.vue'
import GuideList from '@/components/apps/guide/GuideList.vue'
import Pagination from '@/components/pagination/Pagination.vue'

const guideStore = useGuideStore()
const { guideCurrentPage, guideKeyword } = storeToRefs(guideStore)

const plantItems = ref()
const prevKeyword = ref('')
const isNoData = ref(false)
const pageSize = ref(16)

const route = useRoute()
const router = useRouter()

// 쿼리 주소를 이용해 다이렉트 접속 시 페이지 값 설정
if (route.query.page !== undefined) {
  guideCurrentPage.value = Number(route.query.page)
}

// 식물도감정보 데이터 가져오기
const { isLoading, execute } = useAsyncState(
  () =>
    getGuideList({
      currentPage: guideCurrentPage.value,
      currentPageSize: pageSize.value,
      searchWord: guideKeyword.value
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
  guideKeyword.value,
  executePage
)

// 검색
const handleSearch = () => {
  guideCurrentPage.value = 1
  executePage()
  prevKeyword.value = guideKeyword.value
  startPage.value = 1

  // 라우팅
  router.push({ path: `${route.matched[0].path}` })
}
</script>

<style scoped></style>
