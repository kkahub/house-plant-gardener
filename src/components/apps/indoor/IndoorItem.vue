<template>
  <li>
    <IndoorThumbnailSwiper :item="item" />
    <router-link :to="`/guide/detail/${item?.cntntsNo}`">
      <div class="info_gallery">
        <div class="wrap_title">
          <h3 class="gallery_title">{{ item?.cntntsSj }}</h3>
        </div>
        <div class="count_info">
          <span class="view">
            <font-awesome-icon :icon="['far', 'eye']" />
            0
            <!-- {{ readCount }} -->
          </span>
          <span class="like">
            <font-awesome-icon :icon="['far', 'heart']" />
            0
            <!-- {{ likeCount }} -->
          </span>
          <span class="bookmark">
            <font-awesome-icon :icon="['far', 'bookmark']" />
            0
            <!-- {{ bookmarkCount }} -->
          </span>
        </div>
      </div>
    </router-link>
  </li>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLike } from '@/composables/useLike'
import { useBookmark } from '@/composables/useBookmark'
import { useNote } from '@/composables/useNote'
import { useAsyncState } from '@vueuse/core'
import IndoorThumbnailSwiper from '@/pages/components/indoor/IndoorThumbnailSwiper.vue'

defineProps({
  item: Object,
  default: () => ({})
})
</script>

<style scoped></style>
