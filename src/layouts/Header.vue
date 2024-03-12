<template>
  <div id="wrap">
    <header id="header">
      <a class="logo" href="/">
        <span class="wrap_temp">
          <img src="/public/images/logo.png" alt="임시로고" />
        </span>
        House Plant Gardeners
      </a>
      <nav>
        <ul id="gnb">
          <li><a href="/">Home</a></li>
          <li><a href="/">식물도감</a></li>
          <li><a href="/">태그분류</a></li>
          <li><a href="/">자유게시판</a></li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
#header {
  display: flex;
  justify-content: space-between;

  > a {
    display: block;
    font-size: 36px;
    font-weight: 700;
  }
}
.wrap_temp {
  overflow: hidden;
  display: inline-block;
  width: 45px;
  height: 37px;

  img {
    width: 120px;
  }
}
</style>
