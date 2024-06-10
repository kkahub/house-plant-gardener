<template>
  <li>
    <router-link :to="`/guide/detail/${item?.plantPilbkNo}`">
      <div class="thum_wrap">
        <img v-if="noImg" :src="item?.imgUrl" />
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
        <button @click.prevent="toggleLike" type="button">
          <font-awesome-icon :icon="isLike ? ['fas', 'heart'] : ['far', 'heart']" />
        </button>
        <button @click.prevent="toggleBookmark" type="button">
          <font-awesome-icon :icon="isBookmark ? ['fas', 'bookmark'] : ['far', 'bookmark']" />
        </button>
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
            0
          </span>
          <span class="comment">
            <font-awesome-icon :icon="['far', 'comment-dots']" />
            0
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

const props = defineProps({
  item: Object,
  default: () => ({})
})
const noImg = ref(true)

// 썸네일 이미지 없을 때
noImg.value = props.item?.imgUrl !== 'NONE'

// 좋아요 컴포저블
const { toggleLike, isLike, likeCount } = useLike(props.item?.plantPilbkNo)

// 북마크 컴포저블
const { toggleBookmark, isBookmark, bookmarkCount } = useBookmark(props.item?.plantPilbkNo)
</script>

<style scoped></style>
