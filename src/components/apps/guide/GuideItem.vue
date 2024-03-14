<template>
  <li>
    <a href="/">
      <div class="thum_wrap">
        <img :src="item?.imgUrl" />
      </div>
      <div class="wrap_plant_info">
        <h3>{{ item?.plantGnrlNm }}</h3>
      </div>

      <div class="plant_info">
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
          0
        </span>
        <span class="bookmark">
          <font-awesome-icon :icon="['far', 'bookmark']" />
          0
        </span>
      </div>
    </a>
  </li>
</template>

<script setup lang="ts">
defineProps({
  item: Object,
  default: () => ({})
})
</script>

<style scoped></style>
