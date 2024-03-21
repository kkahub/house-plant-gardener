<template>
  <ul class="list_gallery guide_list">
    <GuideItem v-for="item in plantItems" :key="item.plantPilbkNo" :item="item" />
  </ul>
</template>

<script setup lang="ts">
import GuideItem from './GuideItem.vue'

defineProps({
  plantItems: Object,
  default: () => {}
})
</script>

<style scoped></style>
