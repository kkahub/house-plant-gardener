<template>
  <div class="wrap_pw_find">
    <div class="member_header">
      <h1>
        <a class="logo" href="/">
          <img src="@/assets/images/logo.png" alt="로고" />
          Gardeners Guide
        </a>
      </h1>
      <h2 class="page_title">비밀번호 재설정</h2>
    </div>
    <div class="member_box">
      <p>가입할 때 사용했던 이메일을 입력해주세요.</p>
      <Form :validation-schema="schema" @submit="handleSubmit">
        <div class="wrap_input ipt_email">
          <Field v-model="form.email" name="email" type="email" placeholder="이메일" />
          <font-awesome-icon :icon="['far', 'envelope']" />
          <ErrorMessage name="email" class="form_notice" />
        </div>
        <button class="btn_point">비밀번호 재설정하기</button>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAsyncState } from '@vueuse/core'
import { signUpWithEmail } from '@/services/auth'
import { getErrorMessage } from '@/utils/firebase/error-message'
import { Field, Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const form = ref({
  email: '',
  password: ''
})

const schema = yup.object().shape({
  email: yup.string().email('올바른 이메일 형식이 아닙니다.').required('이메일을 입력해주세요.'),
  password: yup
    .string()
    .required('비밀번호를 입력해주세요.')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*_+-=])[A-Za-z\d!@#$%^&*_+-=]{8,16}$/,
      '문자, 숫자, 특수문자 조합 8~16자로 해주세요.'
    ),
  passwordConfirm: yup
    .string()
    .required('비밀번호를 입력해주세요.')
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
})

const handleSubmit = async () => {
  await sendPasswordReset(email.value)
  alert('이메일로 비밀번호 재설정 링크를 보냈어요!')
}
</script>

<style scoped></style>
