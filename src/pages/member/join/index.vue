<template>
  <div class="wrap_join">
    <div class="member_header">
      <h1>
        <a class="logo" href="/">
          <img src="@/public/assets/images/logo.png" alt="로고" />
          Gardeners Guide
        </a>
      </h1>
      <h2 class="page_title">회원가입</h2>
    </div>
    <div class="member_box">
      <Form :validation-schema="schema" @submit="handleSubmit">
        <div class="wrap_input ipt_email">
          <Field v-model="form.email" name="email" type="email" placeholder="이메일" />
          <font-awesome-icon :icon="['far', 'envelope']" />
          <ErrorMessage name="email" class="form_notice" />
        </div>
        <div class="wrap_input">
          <Field
            v-model="form.password"
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호(문자, 숫자, 특수문자로 8~16자)"
            autocomplete="off"
          />
          <font-awesome-icon :icon="['fas', 'lock']" />
          <ErrorMessage name="password" class="form_notice" />
        </div>
        <div class="wrap_input">
          <Field
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            placeholder="비밀번호 확인"
            autocomplete="off"
          />
          <font-awesome-icon :icon="['fas', 'lock']" />
          <ErrorMessage name="passwordConfirm" class="form_notice" />
        </div>
        <button type="submit" class="btn btn_full btn_main" :loading="isLoading">회원가입</button>
      </Form>
    </div>
    <div class="member_footer">
      <ul class="footer_link">
        <li>
          <a href="/">메인으로</a>
        </li>
        <li>
          <a href="/member/login">로그인하기</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAsyncState } from '@vueuse/core'
import { signUpWithEmail } from '@/services/auth'
import { getErrorMessage } from '@/utils/firebase/error-message'
import { Field, Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const form = ref({
  nickname: '',
  email: '',
  password: ''
})

const schema = yup.object().shape({
  email: yup.string().email('올바른 이메일 형식이 아닙니다.').required('이메일을 입력해주세요.'),
  password: yup
    .string()
    .required('비밀번호를 입력해주세요.')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}[^\s]*$/,
      '문자, 숫자, 특수문자 조합 8~16자로 해주세요.(공백제외)'
    ),
  passwordConfirm: yup
    .string()
    .required('비밀번호를 입력해주세요.')
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
})

const router = useRouter()

const { isLoading, execute } = useAsyncState(signUpWithEmail, null, {
  immediate: false,
  onSuccess: () => {
    router.push('/member/verify')
  },
  onError: (err: any) => {
    console.log('errorcode', err)
    alert(`${getErrorMessage(err.code)}`)
  }
})

const handleSubmit = () => execute(0, form.value)
</script>

<style scoped></style>
