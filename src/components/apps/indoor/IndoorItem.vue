<template>
  <li>
    <router-link :to="`/guide/detail/${item?.plantPilbkNo}`"> 실내식물 아이템 </router-link>
  </li>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLike } from '@/composables/useLike'
import { useBookmark } from '@/composables/useBookmark'
import { useNote } from '@/composables/useNote'
import { useAsyncState } from '@vueuse/core'

const props = defineProps({
  item: Object,
  default: () => ({})
})
</script>

<style scoped></style>
