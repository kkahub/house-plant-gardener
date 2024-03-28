<template>
  <div class="wrap_join">
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
      <form>
        <div class="form_group ipt_email">
          <input type="text" placeholder="이메일" />
          <font-awesome-icon :icon="['far', 'envelope']" />
          <span class="form_notice"></span>
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
        <button type="submit" class="btn btn_full btn_main">로그인</button>
      </form>
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
      <button type="submit" class="btn btn_full btn_line_light">
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

<script setup lang="ts"></script>

<style scoped></style>
