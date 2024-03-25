<template>
  <section class="wrap_guide_list">
    <div class="inner">
      <div class="page_header">
        <div class="title_wrap">
          <h2 class="page_title">식물 도감</h2>
          <p class="title_desc">국립수목원에서 제공하는 식물의 정보를 자세히 소개합니다.</p>
        </div>
        <form action="">
          <div class="wrap_search">
            <div class="inner_search">
              <input type="text" placeholder="식물 검색해주세요." />
              <button class="btn_search">
                <span class="material-symbols-rounded">search</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- <div v-for="item in plants" :key="item.plantPilbkNo">{{ item.plantGnrlNm }}</div> -->
      <GuideList :plant-items="plantItems" />

      <Pagination
        :get-page="getPage"
        :page-array="pageArray"
        :prev-page="prevPage"
        :next-page="nextPage"
        :start-page="startPage"
        :current-page="currentPage"
        :is-prev="isPrev"
        :is-next="isNext"
        :execute-page="executePage"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAsyncState } from '@vueuse/core'
import getPlantGuideList from '@/service/guide'
import { usePagination } from '@/composables/usePagination'
import GuideList from '@/components/apps/guide/GuideList.vue'
import Pagination from '@/components/pagination/Pagination.vue'

const plantItems = ref()

// Pagination
const {
  pageArray,
  prevPage,
  nextPage,
  getPage,
  currentPage,
  pageSize,
  total,
  startPage,
  isPrev,
  isNext
} = usePagination()

// 식물 기본정보 데이터 가져오기
const { isLoading, execute } = useAsyncState(
  () => getPlantGuideList({ currentPage: currentPage.value, currentPageSize: pageSize.value }),
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
  execute(0, { currentPage: currentPage, currentPageSize: pageSize })
}
</script>

<style scoped></style>
