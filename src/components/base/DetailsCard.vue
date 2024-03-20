<template>
  <details class="card detail_info" v-bind="$attrs" open>
    <summary class="content_title">
      {{ summary }}<font-awesome-icon :icon="['fas', 'chevron-up']" />
    </summary>
    <template v-for="(_, name) in $slots" :key="name">
      <slot :name="name"></slot>
    </template>
  </details>
</template>

<script setup lang="ts">
defineProps({
  summary: {
    type: String,
    default: ''
  }
})
</script>

<style scoped></style>
