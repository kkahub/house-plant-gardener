<template>
  <div class="sidebar_wrap">
    <nav class="sidebar">
      <ul>
        <li class="menu_item" :class="{ active: path === '/mypage/profile' }">
          <a href="/mypage/profile">개인정보</a>
        </li>
        <li class="menu_item" :class="{ active: path === '/mypage/scrapbook' }">
          <a href="/mypage/scrapbook">내 식물도감</a>
        </li>
        <li class="menu_item" :class="{ active: path === '/mypage/note' }">
          <a href="/mypage/note">내 노트</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const path = ref('')

path.value = route.path
</script>

<style scoped></style>
