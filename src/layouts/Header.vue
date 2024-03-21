<template>
  <header id="header">
    <h1>
      <a class="logo" href="/">
        <img src="@/assets/images/logo.png" alt="로고" />House Plant Gardeners
      </a>
    </h1>
    <nav>
      <ul id="gnb">
        <li><a href="/">Home</a></li>
        <li><a href="/guide">식물도감</a></li>
        <li><a href="/">태그분류</a></li>
        <li><a href="/">자유게시판</a></li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
</script>

<style lang="scss" scoped></style>
