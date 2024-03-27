<template>
  <header id="header" class="zero: !isZero">
    <h1>
      <a class="logo" href="/">
        <img src="@/assets/images/logo.png" alt="로고" />House Plant Gardeners
      </a>
    </h1>
    <nav>
      <div class="menu_wrap">
        <div class="top_menu">
          <ul class="members">
            <li><a href="/">로그인</a></li>
            <li><a href="/">회원가입</a></li>
          </ul>
        </div>
      </div>
      <ul id="gnb">
        <li :class="{ active: path === '/' }"><a href="/">Home</a></li>
        <li :class="{ active: path === '/guide' }"><a href="/guide">식물도감</a></li>
        <li :class="{ active: path === '/tags' }"><a href="/tags">태그분류</a></li>
        <li :class="{ active: path === '/community' }"><a href="/community">자유게시판</a></li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const path = ref('')
const position = ref(0)
const isZero = ref(true)

path.value = route.matched[0].path
position.value = window.scrollY

const mainScrollHandler = () => {
  position.value = window.scrollY
  if (position.value === 0) {
    isZero.value = true
  } else {
    isZero.value = false
  }

  console.log(isZero.value)
}

onMounted(() => {
  document.addEventListener('scroll', mainScrollHandler)
})
</script>

<style lang="scss" scoped></style>
