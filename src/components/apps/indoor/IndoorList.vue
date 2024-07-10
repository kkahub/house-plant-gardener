<template>
  <ul class="list_gallery guide_list">
    <IndoorItem v-for="item in plantItems" :key="item.plantPilbkNo" :item="item" :light="light" />
  </ul>
</template>

<script setup lang="ts">
import IndoorItem from './IndoorItem.vue'

defineProps({
  plantItems: {
    type: Object,
    default: () => {}
  },
  light: {
    type: String
  }
})
</script>

<style scoped></style>
