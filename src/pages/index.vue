<template>
  <section class="main_slider">슬라이드 영역</section>
  <section class="book_list">
    <BookList :items="items" />
  </section>
</template>

<script setup lang="ts">
import 'swiper/css'

import { ref, onMounted } from 'vue'
import getPlantList from '../service/plants'
import { useConvertJson } from '@/composables/useConvertJson'
import { Swiper, SwiperSlide } from 'swiper/vue'

import BookList from '@/components/apps/book/BookList.vue'

const { toArr } = useConvertJson()
const items = ref()

const onSwiper = (swiper) => {
  // console.log(swiper)
}
const onSlideChange = () => {
  // console.log('slide change')
}

onMounted(async () => {
  const [...gardenShotList] = await getPlantList()
  items.value = toArr(gardenShotList)
})
</script>

<style scoped></style>
