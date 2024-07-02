<template>
  <div class="card_content">
    <div class="info_item" v-if="isShow(info.smellCodeNm)">
      <h4 class="sub_title">향기 강도</h4>
      <p class="desc">{{ info.smellCodeNm }}</p>
    </div>
    <div class="info_item" v-if="isShow(info.toxctyInfo)">
      <h4 class="sub_title">독성</h4>
      <p class="desc">{{ info.toxctyInfo }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIsShow } from '@/composables/useIsShow'

defineProps({
  info: {
    type: Object,
    default: () => ({})
  }
})

const { isShow } = useIsShow()
</script>

<style scoped></style>
