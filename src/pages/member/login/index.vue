<template>
  <div class="wrap_login">
    <div class="member_header">
      <h1>
        <a class="logo" href="/">
          <img src="@/assets/images/logo.png" alt="로고" />
          Gardeners Guide
        </a>
      </h1>
      <h2 class="page_title">로그인</h2>
    </div>
    <div class="member_box">
      <Form :validation-schema="schema" @submit="handleSignInEmail">
        <div class="wrap_input ipt_email">
          <Field v-model="form.email" name="email" type="email" placeholder="이메일" />
          <font-awesome-icon :icon="['far', 'envelope']" />
          <ErrorMessage name="email" class="form_notice" />
        </div>
        <div class="wrap_input">
          <Field
            v-model="form.password"
            name="password"
            type="password"
            placeholder="비밀번호"
            autocomplete="off"
          />
          <font-awesome-icon :icon="['fas', 'lock']" />
          <ErrorMessage name="password" class="form_notice" />
        </div>
        <button type="submit" class="btn btn_full btn_main" :loading="isLoading">로그인</button>
      </Form>
    </div>
    <div class="member_footer">
      <ul class="footer_link">
        <li>
          <a href="/">메인으로</a>
        </li>
        <li>
          <a href="/member/find">비밀번호 찾기</a>
        </li>
        <li>
          <a href="/member/join">이메일 가입하기</a>
        </li>
      </ul>
    </div>

    <div class="auth_login">
      <button type="submit" class="btn btn_full btn_line_light" @click="handleSignInGoogle">
        <svg
          class="google_icon"
          height="100%"
          viewBox="0 0 20 20"
          width="100%"
          fit=""
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
        >
          <path
            d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z"
            fill="#4285F4"
          ></path>
          <path
            d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z"
            fill="#34A853"
          ></path>
          <path
            d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z"
            fill="#FBBC05"
          ></path>
          <path
            d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z"
            fill="#EA4335"
          ></path>
        </svg>
        구글 계정으로 로그인
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAsyncState } from '@vueuse/core'
import { signInWithGoogle, signInWithEmail } from '@/services/auth'
import { Field, Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const router = useRouter()

const schema = yup.object().shape({
  email: yup.string().email('올바른 이메일 형식이 아닙니다.').required('이메일을 입력해주세요.'),
  password: yup
    .string()
    .required('비밀번호를 입력해주세요.')
    .min(8, '비밀번호는 최소 8자 이상, 16자 이하입니다.')
})

// 구글 로그인
const handleSignInGoogle = async () => {
  await signInWithGoogle()
  router.push('/')
}

// 이메일 로그인
const form = ref({
  email: '',
  password: ''
})

const { isLoading, error, execute } = useAsyncState(signInWithEmail, null, {
  immediate: false,
  throwError: true,
  onSuccess: () => {
    alert('로그인 하셨습니다.')
    router.push('/')
  },
  onError: (err: any) => {
    console.log(`잘못입력! ${error}`)
    alert(`이메일이나 비밀번호를 잘못 입력하셨습니다.`)
  }
})
const handleSignInEmail = () => execute(0, form.value)
</script>

<style scoped></style>
