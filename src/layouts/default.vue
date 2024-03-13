<template>
  <div id="wrap">
    <Header />
    <div id="container">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './Header.vue'
</script>

<style lang="scss" scoped></style>
