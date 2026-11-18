<template>
  <div class="card_content">
    <div class="info_item">
      <h4 class="sub_title">크기 (너비 X 높이)</h4>
      <p class="desc">{{ info.growthAraInfo }}cm X {{ info.growthHgInfo }}cm</p>
    </div>
    <div class="info_item">
      <h4 class="sub_title">생장 모양</h4>
      <p class="desc">{{ info.grwhstleCodeNm }}</p>
    </div>
  </div>
  <!-- // 외형 -->
</template>

<script setup lang="ts">
defineProps({
  info: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style scoped></style>
