<template>
  <li>
    <router-link :to="`/guide/${item?.plantPilbkNo}`">
      <div class="thum_wrap">
        <img v-if="noImg" :src="item?.imgUrl" />
        <div v-else class="no_img">
          <div class="msg">
            <font-awesome-icon :icon="['fas', 'seedling']" />
            도감에 등록된 이미지가 없습니다.
          </div>
        </div>
      </div>
      <div class="info_gallery">
        <div class="wrap_title">
          <h3 class="gallery_title">
            {{ item?.plantGnrlNm }}
          </h3>
          <div class="wrap_btn">
            <button type="button"><font-awesome-icon :icon="['far', 'heart']" /></button>
            <button type="button"><font-awesome-icon :icon="['far', 'bookmark']" /></button>
          </div>
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
      </div>
    </router-link>
  </li>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const { uid, isAuthenticated } = storeToRefs(useAuthStore())

const props = defineProps({
  item: Object,
  default: () => ({})
})

const noImg = ref(true)
noImg.value = props.item?.imgUrl !== 'NONE'
</script>

<style scoped></style>
