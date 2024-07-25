<template>
  <li>
    <router-link :to="`/indoor/detail/${item?.cntntsSj}-${item?.cntntsNo}`">
      <div class="wrap_thum">
        <IndoorThumbnailSwiper :item="item" />
      </div>
      <div class="info_gallery">
        <div class="wrap_title">
          <h3 class="gallery_title">{{ item?.cntntsSj }}</h3>
        </div>
      </div>
    </router-link>
  </li>
</template>

<script setup lang="ts">
import IndoorThumbnailSwiper from '@/pages/components/indoor/IndoorThumbnailSwiper.vue'

defineProps({
  item: {
    type: Object,
    default: () => ({})
  },
  light: {
    type: String
  },
  growForm: {
    type: String
  },
  leafColor: {
    type: String
  },
  leafPattern: {
    type: String
  },
  flowerColor: {
    type: String
  },
  fruitColor: {
    type: String
  },
  flowering: {
    type: String
  },
  minTemp: {
    type: String
  },
  waterCycle: {
    type: String
  }
})
</script>

<style scoped></style>
