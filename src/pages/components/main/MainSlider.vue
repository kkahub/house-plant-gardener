<template>
  <div class="swiper_wrap">
    <swiper
      :slides-per-view="1"
      :space-between="0"
      :modules="modules"
      :navigation="{
        prevEl: '.swiper_prev',
        nextEl: '.swiper_next'
      }"
      :pagination="{ clickable: true }"
      :autoplay="{ delay: 5000 }"
      :loop="true"
    >
      <swiper-slide
        v-for="slide in slideContents"
        :key="slide.title"
        class="img_wrap"
        :style="`background-image:url(${slide.url})`"
      >
        <div class="slide_content">
          <h2 class="slide_title">{{ slide.title }}</h2>
          <p class="slide_desc">{{ slide.desc }}</p>
          <router-link :to="slide.link" class="btn btn_lg btn_point">MORE</router-link>
        </div>
      </swiper-slide>
    </swiper>
    <button class="swiper_prev" type="button">
      <span class="material-symbols-rounded">arrow_back_ios</span>
    </button>
    <button class="swiper_next" type="button">
      <span class="material-symbols-rounded">arrow_forward_ios</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

const modules = [Navigation, Pagination, Autoplay, A11y]

const slideContents = [
  {
    url: '/src/assets/images/slide/slide_img01.jpg',
    title: '궁금한 식물을\n식물도감에서 검색해보세요',
    desc: '국립수목원에서 제공하는 식물의 정보를 자세히 소개합니다.',
    link: '/guide'
  },
  {
    url: '/src/assets/images/slide/slide_img02.jpg',
    title: '실내 정원 식물을\n소개합니다',
    desc: '농사로에서 제공하는 실내에 키우기 적합한 식물을 소개합니다.',
    link: '/'
  }
]
</script>

<style scoped></style>
