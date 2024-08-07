<template>
  <div class="wrap_pw_find">
    <div class="member_header">
      <h1>
        <a class="logo" href="/">
          <img src="@/public/assets/images/logo.png" alt="로고" />
          Gardeners Guide
        </a>
      </h1>
      <h2 class="page_title">비밀번호 재설정</h2>
    </div>
    <div class="member_box">
      <p>
        가입할 때 사용했던 이메일을 입력해주세요.<br />
        입력하신 주소로 비밀번호 재설정 메일을 보냅니다.
      </p>
      <Form :validation-schema="schema" @submit="handleSubmit">
        <div class="wrap_input ipt_email">
          <Field v-model="form.email" name="email" type="email" placeholder="이메일" />
          <font-awesome-icon :icon="['far', 'envelope']" />
          <ErrorMessage name="email" class="form_notice" />
        </div>
        <button type="submit" class="btn btn_full btn_main">비밀번호 재설정하기</button>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getErrorMessage } from '@/utils/firebase/error-message'
import { Field, Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { sendPasswordReset } from '@/services/auth'

const form = ref({
  email: ''
})

const schema = yup.object().shape({
  email: yup.string().email('올바른 이메일 형식이 아닙니다.').required('이메일을 입력해주세요.')
})

const handleSubmit = async () => {
  try {
    await sendPasswordReset(form.value.email)
    alert('이메일로 비밀번호 재설정 링크를 보냈어요!')
  } catch (err: any) {
    alert(getErrorMessage(err.code))
  }
}
</script>

<style scoped></style>
