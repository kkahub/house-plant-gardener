<template>
  <div class="wrap_img">
    <img v-if="imgSrc !== 'NONE'" :src="imgSrc" :alt="imgAlt + ' 사진'" />
    <div v-else class="no_img">
      <div class="msg">
        <font-awesome-icon :icon="['fas', 'seedling']" />
        도감에 등록된 이미지가 없습니다.
      </div>
    </div>
  </div>
  <div class="short_info">
    <div class="wrap_name">
      <h2 class="name_info">
        {{ name }}<br />
        <span class="original_name">{{ scientificName }}</span>
      </h2>
      <div class="wrap_btn">
        <button type="button"><font-awesome-icon :icon="['far', 'heart']" /></button>
        <button type="button"><font-awesome-icon :icon="['far', 'bookmark']" /></button>
      </div>
    </div>
    <div class="short_line">
      <h3 class="short_title">분류</h3>
      <div class="desc">
        {{ familyKr }} {{ genusKr }}<br />
        {{ family }} {{ genus }}
      </div>
    </div>
    <div v-if="isShow(origin)" class="short_line">
      <h3 class="short_title">원산지</h3>
      <div class="desc">{{ origin }}</div>
    </div>
    <div v-if="isShow(spreadKr)" class="short_line">
      <h3 class="short_title">국내 분포</h3>
      <div class="desc">{{ spreadKr }}</div>
    </div>
    <div v-if="isShow(spread)" class="short_line">
      <h3 class="short_title">해외분포</h3>
      <div class="desc">{{ spread }}</div>
      <p class="notice_copy">* {{ copy }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIsShow } from '@/composables/useIsShow'

const { isShow } = useIsShow()

defineProps({
  imgSrc: {
    type: String,
    default: ''
  },
  imgAlt: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  scientificName: {
    type: String,
    default: ''
  },
  familyKr: {
    type: String,
    default: ''
  },
  genusKr: {
    type: String,
    default: ''
  },
  family: {
    type: String,
    default: ''
  },
  genus: {
    type: String,
    default: ''
  },
  origin: {
    type: String,
    default: ''
  },
  spreadKr: {
    type: String,
    default: ''
  },
  spread: {
    type: String,
    default: ''
  },
  copy: {
    type: String,
    default: ''
  }
})
</script>

<style scoped></style>
