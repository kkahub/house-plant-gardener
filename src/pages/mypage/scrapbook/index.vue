<template>
  <section class="wrap_scrapbook">
    <div class="inner">
      <div class="page_header">
        <div class="title_wrap">
          <h2 class="page_title">마이페이지</h2>
        </div>
      </div>
      <div class="sidebar_layout mypage_wrap">
        <Sidebar />
        <div class="sidebar_content mypage_inner">
          <h3 class="content_title">내 식물도감</h3>
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
              <div v-else class="no_data">스크랩한 식물도감이 없습니다.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAsyncState } from '@vueuse/core'
import { usePagination } from '@/composables/usePagination'
import { storeToRefs } from 'pinia'
import { usePageStore } from '@/stores/pagination'
import getGuideList from '@/services/guide'
import Sidebar from '@/layouts/mypage/Sidebar.vue'
import GuideList from '@/components/apps/guide/GuideList.vue'
import Pagination from '@/components/pagination/Pagination.vue'

const guidePageStore = usePageStore()
const { keyword, currentPage } = storeToRefs(guidePageStore)

const plantItems = ref()
const isNoData = ref(false)
const pageSize = ref(16)

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
</script>

<style scoped></style>
