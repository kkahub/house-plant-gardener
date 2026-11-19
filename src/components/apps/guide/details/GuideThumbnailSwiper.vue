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
      :loop="photos.length > 1"
    >
      <swiper-slide v-for="photo in photos" :key="photo.id" class="inner_img">
        <img :src="photo.mediumUrl" :alt="`${name} 사진`" />
        <div v-if="getShortAttribution(photo.attribution)" class="source">
          {{ getShortAttribution(photo.attribution) }}
        </div>
      </swiper-slide>
    </swiper>
    <template v-if="photos.length > 1">
      <button class="swiper_prev" type="button">
        <span class="material-symbols-rounded">arrow_back_ios</span>
      </button>
      <button class="swiper_next" type="button">
        <span class="material-symbols-rounded">arrow_forward_ios</span>
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import type { PropType } from 'vue'
import { Navigation, Pagination, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { getShortAttribution } from '@/services/guide'
import type { INatPhoto } from '@/types/guide'

const modules = [Navigation, Pagination, A11y]

defineProps({
  photos: { type: Array as PropType<INatPhoto[]>, required: true },
  name: { type: String, default: '' }
})
</script>

<style scoped></style>
