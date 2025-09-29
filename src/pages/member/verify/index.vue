<template>
  <div class="verify">
    <div class="member_header">
      <h1>
        <a class="logo" href="/">
          <img src="/public/images/logo.png" alt="로고" />
          Gardeners Guide
        </a>
      </h1>
    </div>
    <div class="member_content">
      <h2 class="page_title">가입을 축하합니다</h2>
      <p class="title_desc">서비스를 이용하기 위해서 이메일 인증이 필요합니다.</p>
      <div class="btn_group">
        <button type="button" class="btn btn_r btn_lg btn_main" @click="verifyEmail">
          인증 메일 보내기
        </button>
        <a href="/" class="btn btn_r btn_lg btn_main">메인으로</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { sendVerificationEmail } from '@/services/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const verifyEmail = async () => {
  await sendVerificationEmail()
  router.push('/')
}
</script>

<style scoped></style>

<route lang="yaml">
meta:
  layout: full
</route>
