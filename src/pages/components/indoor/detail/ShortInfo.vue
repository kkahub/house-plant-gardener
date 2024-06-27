<template>
  <div class="wrap_img">
    <IndoorThumbnailSwiper v-if="props.info.rtnFileUrl !== undefined" :item="props.info" />
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
        {{ info.cntntsSj }}<br />
        <span class="original_name">{{ info.plntbneNm }}</span>
      </h2>
    </div>
    <div class="short_line">
      <h3 class="short_title">분류</h3>
      <div class="desc">{{ info.fmlCodeNm }}</div>
    </div>
    <div v-if="isShow(info.orgplceInfo)" class="short_line">
      <h3 class="short_title">원산지</h3>
      <div class="desc">{{ info.orgplceInfo }}</div>
    </div>
    <div v-if="isShow(info.managelevelCode)" class="short_line">
      <h3 class="short_title">난이도</h3>
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
    <div v-if="isShow(info.clCodeNm)" class="short_line">
      <h3 class="short_title">용도</h3>
      <div class="desc">{{ info.clCodeNm }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIsShow } from '@/composables/useIsShow'
import IndoorThumbnailSwiper from '../IndoorThumbnailSwiper.vue'

const props = defineProps({
  info: {
    type: Object,
    default: () => ({})
  }
})

const { isShow } = useIsShow()
</script>

<style scoped></style>
