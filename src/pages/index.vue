<template>
  <section class="main_slider">
    <MainSlider />
  </section>
  <section class="plant_guide">
    <div class="inner">
      <div class="title_wrap">
        <h2 class="page_title">식물 도감</h2>
        <p class="title_desc">국립수목원에서 제공하는 식물의 정보를 자세히 소개합니다.</p>
        <router-link to="/guide" class="btn btn_lg btn_point">MORE</router-link>
      </div>
      <GuideList :plant-items="plantItems" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import getGuideList from '@/services/guide'
import MainSlider from '@/pages/components/main/MainSlider.vue'
import GuideList from '@/components/apps/guide/GuideList.vue'
import { useAsyncState } from '@vueuse/core'

const plantItems = ref()

// 식물 기본정보 데이터 가져오기
useAsyncState(() => getGuideList({ currentPage: 1, currentPageSize: 8, searchWord: '' }), null, {
  onSuccess: (result) => {
    plantItems.value = result
  }
})
</script>

<style scoped></style>
