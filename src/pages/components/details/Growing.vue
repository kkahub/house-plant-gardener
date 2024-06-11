<template>
  <div class="card_content">
    <div class="info_item" v-if="isShow(growCondition)">
      <h4 class="sub_title">
        <span class="icon_wrap">
          <span class="material-symbols-rounded">landscape</span>
        </span>
        생육환경
      </h4>
      <p class="desc">{{ growCondition }}</p>
    </div>
    <div class="info_item" v-if="isShow(annual)">
      <h4 class="sub_title">
        <span class="icon_wrap">
          <span class="material-symbols-rounded">grass</span>
        </span>
        생육형
      </h4>
      <p class="desc">{{ annual }}</p>
    </div>
    <div class="info_item" v-if="isShow(growSpecial)">
      <h4 class="sub_title">
        <span class="icon_wrap">
          <span class="material-symbols-rounded">solar_power</span>
        </span>
        재배특성
      </h4>
      <p class="desc">{{ growSpecial }}</p>
    </div>
    <div class="info_item" v-if="isShow(breeding)">
      <h4 class="sub_title">
        <span class="icon_wrap">
          <span class="material-symbols-rounded">forest</span>
        </span>
        번식방법
      </h4>
      <p class="desc">{{ breeding }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIsShow } from '@/composables/useIsShow'

const { isShow } = useIsShow()

defineProps({
  growCondition: {
    type: String,
    default: ''
  },
  annual: {
    type: String,
    default: ''
  },
  growSpecial: {
    type: String,
    default: ''
  },
  breeding: {
    type: String,
    default: ''
  }
})
</script>

<style scoped></style>
