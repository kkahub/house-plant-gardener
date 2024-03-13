<template>
  <h2>식물 도감</h2>
  <p class="desc">실내 정원용 식물의 정보를 자세히 소개합니다.</p>
  <ul>
    <BookItem :items="items" class="book_list" />
  </ul>
</template>

<script setup lang="ts">
import BookItem from './BookItem.vue'

defineProps({
  items: Object,
  default: () => {}
})
</script>

<style scoped></style>
