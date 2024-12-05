<template>
  <router-view />
</template>

<script setup lang="ts">
import {useHead} from '@unhead/vue'

useHead({
  title: 'Gardeners Guide',
  meta: [
    { name: 'description', content: '가드닝 정보를 제공하는 가이드북입니다.' },
    // { 'http-equiv': 'Content-Security-Policy', content: 'upgrade-insecure-requests' },
    { property: 'og:type', content: '식물도감' },
    { property: 'og:title', content: 'Gardeners Guide' },
    { property: 'og:url', content: 'https://house-plant-gardener.web.app' },
    { property: 'og:image', content: 'https://house-plant-gardener.web.app/assets/opengragh.png' },
    { property: 'og:description', content: '가드닝 정보를 제공하는 가이드북입니다.' },
  ],
})
</script>