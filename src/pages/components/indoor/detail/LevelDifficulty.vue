<template>
  <div class="card_content">
    <div class="info_item" v-if="isShow(info.managelevelCode)">
      <h4 class="sub_title">난이도</h4>
      <div v-if="info.managelevelCode === '089001'" class="desc">
        <span class="star_level">
          <font-awesome-icon :icon="['fas', 'star']" />
          <font-awesome-icon :icon="['far', 'star']" />
          <font-awesome-icon :icon="['far', 'star']" />
        </span>
        초보자
      </div>
      <div v-else-if="info.managelevelCode === '089002'" class="desc">
        <span class="star_level">
          <font-awesome-icon :icon="['fas', 'star']" />
          <font-awesome-icon :icon="['fas', 'star']" />
          <font-awesome-icon :icon="['far', 'star']" />
        </span>
        경험자
      </div>
      <div v-else-if="info.managelevelCode === '089003'" class="desc">
        <span class="star_level">
          <font-awesome-icon :icon="['fas', 'star']" />
          <font-awesome-icon :icon="['fas', 'star']" />
          <font-awesome-icon :icon="['fas', 'star']" />
        </span>
        전문가
      </div>
    </div>
    <div class="info_item" v-if="isShow(info.managedemanddoCodeNm)">
      <h4 class="sub_title">관리 수준</h4>
      <p class="desc">{{ info.managedemanddoCodeNm }}</p>
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
