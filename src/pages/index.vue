<template>
  <section class="main_slider">
    슬라이드 영역
    <!-- <swiper
      :slides-per-view="1"
      :space-between="50"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="img in item.rtnFileUrl" :key="img" class="img_wrap">
        <img :src="img" />
      </swiper-slide>
    </swiper> -->
  </section>
  <section class="plant_guide">
    <div class="inner">
      <div class="title_wrap">
        <h2 class="page_title">식물 도감</h2>
        <p class="title_desc">국립수목원에서 제공하는 식물의 정보를 자세히 소개합니다.</p>
        <router-link to="/guide" class="btn btn_lg btn_point">MORE</router-link>
      </div>
      <GuideList :plant-items="plantItems" />
      <!-- <BookList :house-items="houseItems" /> -->
    </div>
  </section>
</template>

<script setup lang="ts">
import 'swiper/css'

// import SwiperCore from 'swiper'
// import { Swiper, SwiperSlide } from 'swiper/vue'

import { ref } from 'vue'
// import getHousePlantList from '../service/plants'
import getPlantGuideList from '../service/guide'
import { useConvertJson } from '@/composables/useConvertJson'
import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useRoute } from 'vue-router/auto'

import GuideList from '@/components/apps/guide/GuideList.vue'
import { useAsyncState } from '@vueuse/core'

const { toArr } = useConvertJson()
const houseItems = ref()
const plantItems = ref()

const route = useRoute()

const onSwiper = (swiper: SwiperCore) => {
  // console.log(swiper)
}
const onSlideChange = () => {
  // console.log('slide change')
}

// 식물 기본정보 데이터 가져오기
const { error } = useAsyncState(
  () => getPlantGuideList({ currentPage: 1, currentPageSize: 8, searchWord: '' }),
  null,
  {
    onSuccess: (result) => {
      plantItems.value = result
    }
  }
)
</script>

<style scoped></style>
