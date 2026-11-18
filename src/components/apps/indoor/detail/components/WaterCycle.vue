<template>
  <div class="water_cycle" v-if="amountWater === '053001'">
    <div class="water_bottle">
      <font-awesome-icon :icon="['fas', 'seedling']" />
      <i class="icon_water_view water_1"></i>
    </div>
    <span class="desc">항상 흙을 축축하게 유지<br />(물에 잠김)</span>
  </div>
  <div class="water_cycle" v-else-if="amountWater === '053002'">
    <div class="water_bottle">
      <font-awesome-icon :icon="['fas', 'seedling']" />
      <i class="icon_water_view water_2"></i>
    </div>
    <span class="desc">흙을 촉촉하게 유지<br />(물에 잠기지 않도록 주의)</span>
  </div>
  <div class="water_cycle" v-else-if="amountWater === '053003'">
    <div class="water_bottle">
      <font-awesome-icon :icon="['fas', 'seedling']" />
      <i class="icon_water_view water_3"></i>
    </div>
    <span class="desc">흙 표면이 말랐을 때<br />충분히 관수함</span>
  </div>
  <div class="water_cycle" v-else-if="amountWater === '053004'">
    <div class="water_bottle">
      <font-awesome-icon :icon="['fas', 'seedling']" />
      <i class="icon_water_view water_4"></i>
    </div>
    <span class="desc">흙 대부분 말랐을 때<br />충분히 관수함</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  amountWater: {
    type: String,
    default: ''
  }
})
</script>

<style scoped></style>
