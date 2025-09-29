<template>
  <router-view />
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  title: 'Gardeners Guide',
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png'
    }
  ],
  meta: [
    { name: 'description', content: '가드닝 정보를 제공하는 가이드북입니다.' },
    { property: 'og:type', content: '식물도감' },
    { property: 'og:title', content: 'Gardeners Guide' },
    { property: 'og:url', content: 'https://house-plant-gardener.web.app' },
    {
      property: 'og:image',
      content: 'https://house-plant-gardener.web.app/assets/opengragh-gMx8S_p-.png'
    },
    { property: 'og:description', content: '가드닝 정보를 제공하는 가이드북입니다.' }
  ]
})
</script>
