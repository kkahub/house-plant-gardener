<template>
  <section>
    <div class="inner">
      <h1 class="title">식물 도감</h1>
      <div class="wrap_detail">
        <h2 class="title">{{ info?.plantGnrlNm }}</h2>
        <div>{{ info?.plantGnrlNm }}</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getPlantDetail } from '@/service/guide'

const info = ref()
const route = useRoute()

onMounted(async () => {
  const plantDetail = await getPlantDetail(route.params.code)
  info.value = plantDetail
})
</script>

<style scoped></style>
