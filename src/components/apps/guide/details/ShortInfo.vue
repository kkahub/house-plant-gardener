<template>
  <div class="short_info">
    <template v-if="!isError">
      <div class="wrap_name">
        <h2 class="name_info">
          {{ name }}<br />
          <span class="original_name">{{ scientificName }}</span>
        </h2>
        <div class="wrap_btn">
          <button @click="toggleLike" type="button">
            <font-awesome-icon :icon="isLike ? ['fas', 'heart'] : ['far', 'heart']" />
          </button>
          <button @click="props.toggleBookmark(props.isNote)" type="button">
            <font-awesome-icon
              :icon="props.isBookmark ? ['fas', 'bookmark'] : ['far', 'bookmark']"
            />
          </button>
          <button
            v-if="props.isBookmark"
            @click="props.toggleNote"
            type="button"
            :class="props.isNote ? 'active' : ''"
          >
            <font-awesome-icon
              :icon="props.isNoteView ? ['fas', 'note-sticky'] : ['far', 'note-sticky']"
            />
          </button>
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
    </template>
    <div v-else class="reload_notification">
      <font-awesome-icon :icon="['fas', 'rotate-right']" class="icon_refresh" />
      정보를 불러오지 못했습니다.<br />잠시 후 다시 한번 시도해주세요.
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { useIsShow } from '@/composables/useIsShow'
import { useLike } from '@/composables/useLike'

const props = defineProps({
  code: {
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
  },
  toggleBookmark: {
    type: Function as PropType<(isNote: boolean) => void>,
    required: true
  },
  isBookmark: {
    type: Boolean,
    default: false
  },
  toggleNote: {
    type: Function as PropType<() => void>,
    required: true
  },
  isNote: {
    type: Boolean,
    default: false
  },
  isNoteView: {
    type: Boolean,
    default: false
  },
  isEditNote: {
    type: Boolean,
    default: false
  },
  isError: {
    type: Boolean,
    default: false
  }
})

const { isShow } = useIsShow()

// 좋아요 컴포저블
const { toggleLike, isLike } = useLike(props.name, props.code)
</script>

<style scoped></style>
