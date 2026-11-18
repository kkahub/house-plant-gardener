<template>
  <div class="card_content">
    <div class="info_item">
      <h4 class="sub_title">
        <font-awesome-icon :icon="['fas', 'equals']" />
        유사식물설명
      </h4>
      <p class="desc">{{ similarPlant }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  similarPlant: {
    type: String,
    default: ''
  }
})
</script>

<style scoped></style>
