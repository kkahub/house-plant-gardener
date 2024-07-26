<template>
  <section class="wrap_profile">
    <div class="inner">
      <div class="page_header">
        <div class="title_wrap">
          <h2 class="page_title">마이페이지</h2>
        </div>
      </div>
      <div class="sidebar_layout mypage_wrap">
        <Sidebar />
        <div class="sidebar_content mypage_inner">
          <h3 class="content_title">프로필</h3>
          <div class="table_flex">
            <div class="tr">
              <div class="th">닉네임</div>
              <div class="td">
                <div class="form_group">
                  <form @submit.prevent="handleChangeNickname">
                    <div class="flex_group">
                      <input type="text" v-model="displayName" id="nickName" />
                      <button type="submit" class="btn btn_dark" :loading="isLoadingNickName">
                        변경하기
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="tr">
              <div class="th">이메일</div>
              <div class="td">{{ userEmail }}</div>
            </div>
            <div class="tr">
              <div class="th">비밀번호</div>
              <div class="td">
                <div class="form_group">
                  <Form :validation-schema="schema" @submit="handleChangePassword">
                    <div class="wrap_input">
                      <Field
                        v-model="userPassword"
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
                    <div class="flex_group">
                      <input type="password" v-model="userPassword" placeholder="비밀번호" />
                      <button type="submit" class="btn btn_dark" :loading="isLoadingPassword">
                        변경하기
                      </button>
                    </div>
                  </Form>
                </div>
                <div class="form_group">
                  <div class="flex_group">
                    <input
                      type="password"
                      v-model="userPasswordConfirm"
                      placeholder="비밀번호 확인"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useAsyncState } from '@vueuse/core'
import { updateUserName } from '@/services/auth'
import { Field, Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { getErrorMessage } from '@/utils/firebase/error-message'
import Sidebar from '@/layouts/mypage/Sidebar.vue'

const authStore = useAuthStore()
const displayName = ref('')
const userEmail = ref(authStore.user?.email)
const userPassword = ref('')
const userPasswordConfirm = ref('')
const isConfirm = ref(false)

const { isLoading: isLoadingNickName, execute: executeNickName } = useAsyncState(
  updateUserName,
  null,
  {
    immediate: false,
    onSuccess: () => {
      alert('닉네임이 변경되었습니다.')
    },
    onError: (err: any) => {
      alert(`${getErrorMessage(err.code)}`)
    }
  }
)
const handleChangeNickname = () => executeNickName(0, displayName.value)

watchEffect(() => {
  displayName.value = authStore.user?.displayName

  // 비밀번호 일치 확인
  if (userPassword.value === userPasswordConfirm.value) {
    isConfirm.value = true
  } else {
    isConfirm.value = false
  }
})

const schema = yup.object().shape({
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

const { isLoading, execute } = useAsyncState(changePassword, null, {
  immediate: false,
  onSuccess: () => {
    alert('성공')
  },
  onError: (err: any) => {
    console.log('errorcode', err)
    alert(`${getErrorMessage(err.code)}`)
  }
})

const handleSubmit = () => execute(0, form.value)
</script>

<style scoped></style>
