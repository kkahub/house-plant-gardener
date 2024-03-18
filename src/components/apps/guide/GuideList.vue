<template>
  <div class="inner">
    <div class="title_wrap">
      <h2 class="page_title">식물 도감</h2>
      <p class="title_desc">국립수목원에서 제공하는 식물의 정보를 자세히 소개합니다.</p>
    </div>
    <ul class="list_gallery guide_list">
      <GuideItem v-for="item in plantItems" :key="item.plantPilbkNo" :item="item" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import GuideItem from './GuideItem.vue'

defineProps({
  plantItems: Object,
  default: () => {}
})
</script>

<style scoped></style>
./GuideItem.vue
