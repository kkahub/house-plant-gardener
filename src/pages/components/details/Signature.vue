<template>
  <div class="card_content">
    <div class="info_item" v-if="isShow(special)">
      <h4 class="sub_title">
        <span class="icon_wrap">
          <span class="material-symbols-rounded">asterisk</span>
        </span>
        특징
      </h4>
      <p class="desc">{{ special }}</p>
    </div>
    <div class="info_item" v-if="isShow(use)">
      <h4 class="sub_title">
        <span class="icon_wrap">
          <span class="material-symbols-rounded">book_2</span>
        </span>
        사용법
      </h4>
      <p class="desc">{{ use }}</p>
    </div>
    <div class="info_item" v-if="isShow(note)">
      <h4 class="sub_title">
        <span class="icon_wrap">
          <span class="material-symbols-rounded">sticky_note_2</span>
        </span>
        노트
      </h4>
      <p class="desc">{{ note }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIsShow } from '@/composables/useIsShow'

const { isShow } = useIsShow()

defineProps({
  special: {
    type: String,
    default: ''
  },
  use: {
    type: String,
    default: ''
  },
  note: {
    type: String,
    default: ''
  }
})
</script>

<style scoped></style>
