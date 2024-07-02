<template>
  <div class="card_content">
    <div class="info_item" v-if="isShow(info.eclgyCodeNm)">
      <h4 class="sub_title">생태</h4>
      <p class="desc">{{ info.eclgyCodeNm }}</p>
    </div>
    <div class="info_item" v-if="isShow(info.grwtveCodeNm)">
      <h4 class="sub_title">생장속도</h4>
      <p class="desc">{{ info.grwtveCodeNm }}</p>
    </div>
    <div class="info_item" v-if="isShow(info.postngplaceCodeNm)">
      <h4 class="sub_title">배치장소</h4>
      <p class="desc">{{ info.postngplaceCodeNm }}</p>
    </div>
    <div class="info_item" v-if="isShow(info.dlthtsCodeNm)">
      <h4 class="sub_title">병충해</h4>
      <p class="desc">{{ info.dlthtsCodeNm }}</p>
    </div>
    <div class="info_item" v-if="isShow(info.dlthtsManageInfo)">
      <h4 class="sub_title">병충해 관리</h4>
      <p class="desc">{{ info.dlthtsManageInfo }}</p>
    </div>
    <div class="info_item" v-if="isShow(info.prpgtmthCodeNm)">
      <h4 class="sub_title">번식방법</h4>
      <p class="desc">{{ info.prpgtmthCodeNm }}</p>
    </div>
    <div class="info_item" v-if="isShow(info.prpgtEraInfo)">
      <h4 class="sub_title">번식시기</h4>
      <p class="desc">{{ info.prpgtEraInfo }}</p>
    </div>
    <div class="info_item" v-if="isShow(info.speclmanageInfo)">
      <h4 class="sub_title">특별관리정보</h4>
      <p class="desc">{{ info.speclmanageInfo }}</p>
    </div>
    <div class="info_item" v-if="isShow(info.adviseInfo) || isShow(info.etcEraInfo)">
      <h4 class="sub_title">그 외 정보</h4>
      <p class="desc" v-if="isShow(info.adviseInfo)">TIP : {{ info.adviseInfo }}</p>
      <p class="desc" v-if="isShow(info.etcEraInfo)">특별 시기 : {{ info.etcEraInfo }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIsShow } from '@/composables/useIsShow'

defineProps({
  info: {
    type: Object,
    default: () => ({})
  }
})

const { isShow } = useIsShow()
</script>

<style scoped></style>
