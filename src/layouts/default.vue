<template>
  <div id="wrap" :class="isMain ? 'main' : ''">
    <Header />
    <div id="container">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, watchEffect } from 'vue'
import Header from './Header.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isMain = ref()

// 메인 라우터 일 때 main 클래스 추가
watch(
  () => route,
  (to) => {
    to.path === '/' ? (isMain.value = true) : (isMain.value = false)
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

<style lang="scss" scoped></style>
