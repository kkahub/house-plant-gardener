<template>
  <div class="swiper_wrap">
    <swiper
      :slides-per-view="1"
      :space-between="0"
      :modules="modules"
      :pagination="{ clickable: true }"
      :loop="true"
    >
      <swiper-slide v-for="slide in item?.rtnFileUrl" :key="slide" class="img_wrap">
        <router-link :to="`/guide/detail/${item?.cntntsNo}`">
          <div class="thum_wrap">
            <img :src="`${slide}`" :alt="`${item?.cntntsSj}`" />
          </div>
        </router-link>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

const modules = [Navigation, Pagination, Autoplay, A11y]

defineProps({
  item: Object,
  default: () => ({})
})
</script>

<style scoped></style>
