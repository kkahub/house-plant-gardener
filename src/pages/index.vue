<template>
  <ul>
    <li v-for="item in plantShortInfo" :key="item.plantId">
      <h2>{{ item.cntntsSj }}</h2>
      <div v-for="img in item.rtnFileUrl" :key="img" class="img_wrap">
        <img :src="img" />
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import getPlantList from '../service/plants'
import { useConvertJson } from '@/composables/useConvertJson'

const { toArr } = useConvertJson()
const plantShortInfo = ref()

onMounted(async () => {
  const [...gardenShotList] = await getPlantList()
  plantShortInfo.value = toArr(gardenShotList)
})
</script>

<style scoped></style>
