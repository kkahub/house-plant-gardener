<template>
  <div class="card_content">
    <div class="info_item" v-if="isShow(shape)">
      <h4 class="sub_title">형태</h4>
      <p class="desc">{{ shape }}</p>
    </div>
    <div class="info_item" v-if="isShow(leaf)">
      <h4 class="sub_title">
        <span class="icon_wrap">
          <span class="material-symbols-rounded">psychiatry</span>
        </span>
        잎
      </h4>
      <p class="desc">{{ leaf }}</p>
    </div>
    <div class="info_item" v-if="isShow(flower)">
      <h4 class="sub_title">
        <span class="icon_wrap">
          <span class="material-symbols-rounded">filter_vintage</span>
        </span>
        꽃
      </h4>
      <p class="desc">{{ flower }}</p>
    </div>
    <div class="info_item" v-if="isShow(fruit)">
      <h4 class="sub_title"><font-awesome-icon :icon="['far', 'lemon']" /> 열매</h4>
      <p class="desc">{{ fruit }}</p>
    </div>
    <div class="info_item" v-if="isShow(stem)">
      <h4 class="sub_title"><font-awesome-icon :icon="['fas', 'plant-wilt']" /> 줄기</h4>
      <p class="desc">{{ stem }}</p>
    </div>
    <div class="info_item" v-if="isShow(root)">
      <h4 class="sub_title"><font-awesome-icon :icon="['far', 'snowflake']" /> 뿌리</h4>
      <p class="desc">{{ root }}</p>
    </div>
    <div class="info_item" v-if="isShow(size)">
      <h4 class="sub_title"><font-awesome-icon :icon="['fas', 'arrows-up-down']" /> 크기</h4>
      <p class="desc">{{ size }}</p>
    </div>
    <div class="info_item" v-if="isShow(spore)">
      <h4 class="sub_title">
        <span class="material-symbols-rounded">snowing</span>
        포자
      </h4>
      <p class="desc">{{ spore }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIsShow } from '@/composables/useIsShow'

const { isShow } = useIsShow()

defineProps({
  shape: {
    type: String,
    default: ''
  },
  leaf: {
    type: String,
    default: ''
  },
  flower: {
    type: String,
    default: ''
  },
  fruit: {
    type: String,
    default: ''
  },
  stem: {
    type: String,
    default: ''
  },
  root: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: ''
  },
  spore: {
    type: String,
    default: ''
  }
})
</script>

<style scoped></style>
