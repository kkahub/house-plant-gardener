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
          <li><a href="/">링크1</a></li>
          <li><a href="/">링크2</a></li>
          <li><a href="/">링크3</a></li>
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
