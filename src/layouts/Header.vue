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
    <div v-for="item in plantList" :key="item">
      <!-- <h2>{{ item.cntntsSj[0] }}</h2> -->
      <!-- <img :src="toArr(item.rtnFileUrl[0])" alt="" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject, onMounted, toRef } from 'vue'
import { useConvertJson } from '@/composables/useConvertJson'

import getPlantList from '../service/plants'

const { toArr } = useConvertJson()

const plantList = ref()
onMounted(async () => {
  const response = await getPlantList()
  // console.log(response)
  plantList.value = toArr(response)
  // console.log(plantList.value)
  // plantList.value = response.map()
})
</script>

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
