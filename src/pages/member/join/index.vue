<template>
  <div class="wrap_join">
    <div class="member_header">
      <h1>
        <a class="logo" href="/">
          <img src="@/assets/images/logo.png" alt="로고" />
          Gardeners Guide
        </a>
      </h1>
      <h2 class="page_title">회원가입</h2>
    </div>
    <div class="member_box">
      <form>
        <div class="form_group ipt_email">
          <input type="text" placeholder="이메일" />
          <font-awesome-icon :icon="['far', 'envelope']" />
          <span class="form_notice">이메일을 입력해주세요.</span>
        </div>
        <div class="form_group">
          <input
            type="password"
            name="password"
            placeholder="비밀번호(문자, 숫자조합 8자 이상)"
            autocomplete="off"
          />
          <font-awesome-icon :icon="['fas', 'lock']" />
          <span class="form_notice"></span>
        </div>
        <div class="form_group">
          <input type="password" name="password" placeholder="비밀번호 확인" autocomplete="off" />
          <font-awesome-icon :icon="['fas', 'lock']" />
          <span class="form_notice"></span>
        </div>
        <button type="submit" class="btn btn_full btn_main">회원가입</button>
      </form>
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

<script setup lang="ts"></script>

<style scoped></style>
