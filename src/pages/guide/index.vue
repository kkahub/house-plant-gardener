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
      <GuideList :plant-items="plantItems" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAsyncState } from '@vueuse/core'
import { useOffsetPagination } from '@vueuse/core'
// import Paginate from 'vuejs-paginate'
import getPlantGuideList from '@/service/guide'
import GuideList from '@/components/apps/guide/GuideList.vue'

const plantItems = ref()

const page = ref(1)
const pageSize = ref(16)
const total = ref(0)

// 식물 기본정보 데이터 가져오기
const { execute: getPage } = useAsyncState(
  () => getPlantGuideList({ currentPage: page.value, currentPageSize: pageSize.value }),
  null,
  {
    throwError: true,
    onSuccess: (result) => {
      plantItems.value = result
      if (result) {
        console.log(result)
      }
    }
  }
)

// Pagination
// const { currentPage, currentPageSize, pageCount, isFirstPage, isLastPage, prev, next } =
//   useOffsetPagination({
//     total: 100,
//     page: 1,
//     pageSize,
//     onPageChange: getPage(0, { currentPage: page.value, currentPageSize: pageSize.value })
//   })
// useOffsetPagination({
//   total: 100,
//   page: 1,
//   pageSize: 16,
//   onPageChange: plantItems,
//   onPageSizeChange: plantItems
// })
</script>

<style scoped></style>
