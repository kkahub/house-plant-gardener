<template>
  <li>
    <router-link :to="`/guide/detail/${item?.plantGnrlNm}-${item?.plantPilbkNo}`">
      <div class="wrap_thum">
        <img v-if="noImg" :src="item?.imgSrc" />
        <div v-else class="no_img">
          <div class="msg">
            <font-awesome-icon :icon="['fas', 'seedling']" />
            도감에 등록된 이미지가 없습니다.
          </div>
        </div>
      </div>
    </router-link>
    <div class="info_gallery">
      <div class="wrap_btn">
        <button @click="toggleLike" type="button">
          <font-awesome-icon :icon="isLike ? ['fas', 'heart'] : ['far', 'heart']" />
        </button>
        <button @click="toggleBookmark(isNote)" type="button">
          <font-awesome-icon :icon="isBookmark ? ['fas', 'bookmark'] : ['far', 'bookmark']" />
        </button>
        <div v-if="isNote" class="icon_note active">
          <font-awesome-icon :icon="['fas', 'note-sticky']" />
        </div>
      </div>
      <router-link :to="`/guide/detail/${item?.plantPilbkNo}`">
        <div class="wrap_title">
          <h3 class="gallery_title">{{ item?.plantGnrlNm }}</h3>
        </div>
        <div class="family_genus">
          <dfn>{{ item?.familyKorNm + ' ' + item?.genusKorNm }}</dfn>
          <dfn class="orignal_name">{{ item?.familyNm + ' ' + item?.genusNm }}</dfn>
        </div>
        <div class="count_info">
          <span class="view">
            <font-awesome-icon :icon="['far', 'eye']" />
            {{ readCount }}
          </span>
          <span class="like">
            <font-awesome-icon :icon="['far', 'heart']" />
            {{ likeCount }}
          </span>
          <span class="bookmark">
            <font-awesome-icon :icon="['far', 'bookmark']" />
            {{ bookmarkCount }}
          </span>
        </div>
      </router-link>
    </div>
  </li>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLike } from '@/composables/useLike'
import { useBookmark } from '@/composables/useBookmark'
import { useNote } from '@/composables/useNote'
import { useAsyncState } from '@vueuse/core'
import { getReadCount } from '@/services/guide'

const props = defineProps({
  item: Object,
  default: () => ({})
})
const noImg = ref(true)
const readCount = ref(0)

// 썸네일 이미지 없을 때
noImg.value = props.item?.imgSrc !== null

// 좋아요 컴포저블
const { toggleLike, isLike, likeCount } = useLike(props.item?.plantGnrlNm, props.item?.plantPilbkNo)

// 노트 컴포저블
const { isNote } = useNote(props.item?.plantGnrlNm, props.item?.plantPilbkNo)

// 북마크 컴포저블
const { toggleBookmark, isBookmark, bookmarkCount } = useBookmark(
  props.item?.plantGnrlNm,
  props.item?.plantPilbkNo
)

// 조회수 조회
useAsyncState(() => getReadCount(props.item?.plantGnrlNm, props.item?.plantPilbkNo), 0, {
  onSuccess: (result) => {
    readCount.value = result
  }
})
</script>

<style scoped></style>
