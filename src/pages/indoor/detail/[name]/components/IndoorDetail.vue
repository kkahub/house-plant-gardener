<template>
  <section class="wrap_detail">
    <!-- v-if="detailIsLoading"  -->
    <div class="inner con_loader">
      <div class="loader_inner">
        <div class="loader">로딩중...</div>
      </div>
    </div>
    <!--  v-else -->
    <div class="inner">
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
import { useAsyncState, whenever } from '@vueuse/core'
import { useIsShow } from '@/composables/useIsShow'
import { useBookmark } from '@/composables/useBookmark'
import { useNote } from '@/composables/useNote'
import DetailsCard from '@/components/base/DetailsCard.vue'

const route = useRoute()
const router = useRouter()
const name = ref(String(route.params.name))
const baseInfo = ref()
const code = ref('')
const info = ref()
const { isShow } = useIsShow()

// 실내식물정보 데이터 가져오기
const { state, isLoading: baseIsLoading } = useAsyncState(() => getIndoorBasic(name.value), null, {
  throwError: true,
  onSuccess: (result) => {
    if (result === null) {
      alert('잘못된 접근입니다.')
      router.go(-1)
    } else {
      baseInfo.value = result
      code.value = result.cntntsNo
    }
  }
})

// 상세 정보 호출
// const { isLoading: detailIsLoading, execute } = useAsyncState(
//   () => getIndoorDetail(code.value),
//   null,
//   {
//     onSuccess: (result) => {
//       if (result === undefined) {
//         alert('잘못된 접근입니다.')
//         router.go(-1)
//       } else {
//         info.value = result
//       }
//     }
//   }
// )

whenever(baseIsLoading, () => {
  console.log('code.value : ', code.value)
  if (code.value) {
    // execute()
  }
})
</script>

<style scoped></style>
