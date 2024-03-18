<template>
  <div id="wrap" :class="isMain ? 'main' : ''">
    <Header />
    <div id="container">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Header from './Header.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isMain = ref()

onMounted(() => {
  // 메인 라우터 일 때 main 클래스 추가
  if (route.path === '/') isMain.value = true
})
</script>

<style lang="scss" scoped></style>
