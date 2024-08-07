<template>
  <ul class="list_gallery guide_list">
    <IndoorItem v-for="item in plantItems" :key="item.plantPilbkNo" :item="item" />
  </ul>
</template>

<script setup lang="ts">
import IndoorItem from './IndoorItem.vue'

defineProps({
  plantItems: {
    type: Object,
    default: () => {}
  }
})
</script>

<style scoped></style>
