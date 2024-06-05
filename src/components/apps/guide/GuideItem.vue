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
          <!-- <span class="like">
          <font-awesome-icon :icon="['far', 'heart']" />
          0
        </span>
        <span class="bookmark">
          <font-awesome-icon :icon="['far', 'bookmark']" />
          0
        </span> -->
        </div>
      </router-link>
    </div>
  </li>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLike } from '@/composables/useLike'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const { uid, isAuthenticated } = storeToRefs(useAuthStore())

const props = defineProps({
  item: Object,
  default: () => ({})
})
const noImg = ref(true)
const isBookmark = ref(false)

const { getLikeStatus } = useLike(id, count)

// 썸네일 이미지 없을 때
noImg.value = props.item?.imgUrl !== 'NONE'

// 북마크 상태 가져오기
// isBookmark.value = await hasBookmark(uid, count)

// 북마크 토글
const toggleBookmark = () => {
  if (isAuthenticated.value === false) {
    alert('로그인 후 이용해주세요.')
    return
  }
  isBookmark.value = !isBookmark.value
}
</script>

<style scoped></style>
