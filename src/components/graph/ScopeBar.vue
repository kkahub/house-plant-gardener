<template>
  <div class="scope_bar">
    <div
      v-for="condition in props.conditions"
      :key="condition"
      class="scope_tooltip"
      :class="legend.includes(condition) ? 'active' : ''"
    >
      <span>{{ condition }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  legend: {
    type: String,
    default: ''
  },
  conditions: {
    type: Array as () => string[],
    default: () => []
  }
})
</script>
