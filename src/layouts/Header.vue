<template>
  <header id="header" :class="{ zero: isZero }">
    <h1>
      <a class="logo" href="/">
        <img src="@/assets/images/logo.png" alt="로고" />Gardeners Guide
      </a>
    </h1>
    <nav>
      <div class="menu_wrap">
        <div class="top_menu">
          <ul v-if="!authStore.isAuthenticated" class="members">
            <li><a href="/member/login">로그인</a></li>
            <li><a href="/member/join">회원가입</a></li>
          </ul>
          <ul v-if="authStore.isAuthenticated" class="members">
            <li>
              <span>
                <strong>{{ authStore.user.displayName }}</strong
                >님, 반갑습니다.
              </span>
            </li>
            <li>
              <button type="button" @click="handleLogout">로그아웃</button>
            </li>
          </ul>
        </div>
      </div>
      <ul id="gnb">
        <li :class="{ active: path === '/' }"><a href="/">Home</a></li>
        <li :class="{ active: path === '/guide' }"><a href="/guide">식물도감</a></li>
        <li :class="{ active: path === '/indoor' }"><a href="/indoor">실내식물</a></li>
        <!-- <li :class="{ active: path === '/community' }"><a href="/community">자유게시판</a></li> -->
        <li :class="{ active: path.includes('/mypage') }">
          <a v-if="authStore.user.emailVerified" href="/mypage/profile">마이페이지</a>
          <a v-else href="/member/verify">메일 인증하기</a>
          <ul v-if="authStore.user.emailVerified" class="sub_menu">
            <li :class="{ active: path === '/mypage/profile' }">
              <a href="/mypage/profile">개인정보</a>
            </li>
            <li :class="{ active: path === '/mypage/bookmark' }">
              <a href="/mypage/bookmark">내 북마크</a>
            </li>
            <li :class="{ active: path === '/mypage/note' }">
              <a href="/mypage/note">내 노트</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { logout } from '@/services/auth'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const position = ref(0)
const isZero = ref(true)
const route = useRoute()
const router = useRouter()
const path = ref('')
const authStore = useAuthStore()

path.value = route.path
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

const handleLogout = async () => {
  await logout()
  alert('로그아웃 하셨습니다.')
  router.push('/')
}
</script>

<style lang="scss" scoped></style>
