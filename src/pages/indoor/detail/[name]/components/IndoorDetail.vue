<template>
  <section class="wrap_indoor_detail">
    <div v-if="isLoading" class="inner con_loader">
      <div class="loader_inner">
        <div class="loader">로딩중...</div>
      </div>
    </div>
    <div v-else class="inner">
      <!-- 기본 정보 -->
      <div class="card_gallery">
        <ShortInfo :info="info" />
      </div>
      <!-- // 기본 정보 -->

      <div class="btn_group right">
        <router-link to="/guide" class="btn btn_dark">목록으로</router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getIndoorBasic, getIndoorDetail } from '@/services/indoor'
import { useAsyncState } from '@vueuse/core'
import { useIsShow } from '@/composables/useIsShow'
import { useBookmark } from '@/composables/useBookmark'
import { useNote } from '@/composables/useNote'
import DetailsCard from '@/components/base/DetailsCard.vue'
import ShortInfo from '@/pages/components/indoor/detail/ShortInfo.vue'

const route = useRoute()
const router = useRouter()
const name = ref(String(route.params.name))
const info = ref()
const { isShow } = useIsShow()

// 실내식물정보 데이터 가져오기
const { isLoading } = useAsyncState(() => getIndoorBasic(name.value), null, {
  throwError: true,
  onSuccess: (result) => {
    if (result === null) {
      alert('잘못된 접근입니다.')
      router.go(-1)
    } else {
      info.value = result
      // console.log(result)
    }
  }
})
</script>

<style scoped></style>
