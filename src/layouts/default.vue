<template>
  <div id="wrap" :class="{zero: isZero, main: isMain}">
    <Header />
    <div id="container">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Header from './Header.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isZero = ref(true)
const isMain = ref()
const position = ref(0)

// 스크롤 최상단 체크
position.value = window.scrollY

const mainScrollHandler = () => {
  position.value = window.scrollY
  if (position.value === 0) {
    isZero.value = true
  } else {
    isZero.value = false
  }
}

onMounted(() => {
  document.addEventListener('scroll', mainScrollHandler)
})

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
