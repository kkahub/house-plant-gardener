<template>
  <details class="card detail_info" v-bind="$attrs" open>
    <summary class="card_title">
      {{ title }}<font-awesome-icon :icon="['fas', 'chevron-up']" />
    </summary>
    <template v-for="(_, name) in $slots" :key="name">
      <slot :name="name"></slot>
    </template>
  </details>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<style scoped></style>
