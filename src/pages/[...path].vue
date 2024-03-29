<template>
  <div class="not_found">
    <h1>
      <a class="logo" href="/">
        <img src="@/assets/images/logo.png" alt="로고" />
        Gardeners Guide
      </a>
    </h1>
    <h2 class="error_title">
      <span class="error_code">404</span>
      페이지를 찾을 수 없습니다.
    </h2>
    <a class="btn btn_r btn_lg btn_main" href="/">메인으로</a>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

<route lang="yaml">
meta:
  layout: full
</route>
