<template>
  <router-view />
</template>

<script setup lang="ts">
import {useHead} from '@unhead/vue'

useHead({
  title: 'Gardeners Guide',
  meta: [
    { name: 'description', content: '가드닝 정보를 제공하는 가이드북입니다.' },
    { 'http-equiv': 'Content-Security-Policy', content: 'upgrade-insecure-requests' },
    { property: 'og:type', content: '식물도감' },
    { property: 'og:title', content: 'Gardeners Guide' },
  ],
})
</script>