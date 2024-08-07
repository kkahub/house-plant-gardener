<template>
  <section class="main_slider">
    <MainSlider />
  </section>
  <section class="plant_guide">
    <div class="inner">
      <div class="title_wrap">
        <h2 class="page_title">식물 도감</h2>
        <p class="title_desc">국립수목원에서 제공하는 식물의 정보를 자세히 소개합니다.</p>
        <a href="/guide" class="btn btn_lg btn_point">MORE</a>
      </div>
      <div v-if="guideIsLoading" class="main_list_loading">
        <div class="loader_inner">
          <div class="loader">로딩중...</div>
        </div>
      </div>
      <GuideList v-else :plant-items="guideItems" :loading="guideIsLoading" />
    </div>
  </section>
  <section class="plant_indoor">
    <div class="inner">
      <div class="title_wrap">
        <h2 class="page_title">실내 식물</h2>
        <p class="title_desc">집 환경에 적합한 실내정원용 식물을 소개합니다.</p>
        <a href="/indoor" class="btn btn_lg btn_point">MORE</a>
      </div>
      <div v-if="indoorIsLoading" class="main_list_loading">
        <div class="loader_inner">
          <div class="loader">로딩중...</div>
        </div>
      </div>
      <IndoorList v-else :plant-items="indoorItems" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAsyncState } from '@vueuse/core'
import getGuideList from '@/services/guide'
import getIndoorList from '@/services/indoor'
import MainSlider from '@/pages/components/main/MainSlider.vue'
import GuideList from '@/components/apps/guide/GuideList.vue'
import IndoorList from '@/components/apps/indoor/IndoorList.vue'

const guideItems = ref()
const indoorItems = ref()

// 식물도감 기본정보 데이터 가져오기
const { isLoading: guideIsLoading } = useAsyncState(
  () => getGuideList({ currentPage: 1, currentPageSize: 8, searchWord: '' }),
  null,
  {
    onSuccess: (result) => {
      guideItems.value = result
    }
  }
)

// 실내식물정보 데이터 가져오기
const { isLoading: indoorIsLoading } = useAsyncState(
  () =>
    getIndoorList({
      currentPage: 1,
      currentPageSize: 8,
      searchWord: '',
      light: '',
      growForm: '',
      leafColor: '',
      leafPattern: '',
      flowerColor: '',
      fruitColor: '',
      flowering: '',
      minTemp: '',
      waterCycle: ''
    }),
  null,
  {
    throwError: true,
    onSuccess: (result) => {
      indoorItems.value = result
    }
  }
)
</script>

<style scoped></style>
