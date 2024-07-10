<template>
  <li>
    <router-link :to="`/indoor/detail/${item?.cntntsSj}-${item?.cntntsNo}`">
      <div class="wrap_thum">
        <IndoorThumbnailSwiper :item="item" />
      </div>
      <div class="info_gallery">
        <div class="wrap_title">
          <h3 class="gallery_title">{{ item?.cntntsSj }}</h3>
        </div>
        <!-- <div class="count_info">
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
        </div> -->
      </div>
    </router-link>
  </li>
</template>

<script setup lang="ts">
import IndoorThumbnailSwiper from '@/pages/components/indoor/IndoorThumbnailSwiper.vue'

const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  },
  light: {
    type: String
  }
})
</script>

<style scoped></style>
