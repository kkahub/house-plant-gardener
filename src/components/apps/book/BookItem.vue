<template>
  <li v-for="item in items" :key="item.plantId">
    <div class="thum_wrap">
      <img :src="item.rtnFileUrl[0]" />
    </div>
    <h3>{{ item.cntntsSj }}</h3>
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
    <div class="plant_info">
      <span class="view">
        <font-awesome-icon :icon="['far', 'eye']" />
        0
      </span>
      <span class="comment">
        <font-awesome-icon :icon="['far', 'comment-dots']" />
        0
      </span>
      <span class="like">
        <font-awesome-icon :icon="['far', 'heart']" />
        0
      </span>
      <span class="bookmark">
        <font-awesome-icon :icon="['far', 'bookmark']" />
        0
      </span>
    </div>
  </li>
</template>

<script setup lang="ts">
// import SwiperCore from 'swiper'
// import { Swiper, SwiperSlide } from 'swiper/vue'

defineProps({
  items: Object,
  default: () => {}
})
</script>

<style scoped></style>
