<template>
  <div class="card detail_info" :class="part" v-bind="$attrs" open>
    <h3 class="card_title">{{ title }}</h3>
    <template v-for="(_, name) in $slots" :key="name">
      <slot :name="name"></slot>
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: ''
  },
  part: {
    type: String,
    default: ''
  }
})
</script>

<style scoped></style>
