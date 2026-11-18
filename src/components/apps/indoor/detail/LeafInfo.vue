<template>
  <div class="card_content">
    <div class="info_item" v-if="isShow(info.lefcolrCodeNm)">
      <h4 class="sub_title">잎 색깔</h4>
      <ul class="color_list">
        <li v-if="info.lefcolrCodeNm.includes('녹색, 연두색')">
          <i class="icon_color_view ygreen_green"></i>녹색, 연두색
        </li>
        <li v-else-if="info.lefcolrCodeNm.includes('금색, 노란색')">
          <i class="icon_color_view yellow_gold"></i>금색, 노란색
        </li>
        <li v-else-if="info.lefcolrCodeNm.includes('흰색, 크림색')">
          <i class="icon_color_view white_cream"></i>흰색, 크림색
        </li>
        <li v-else-if="info.lefcolrCodeNm.includes('은색, 회색')">
          <i class="icon_color_view silver_gray"></i>은색, 회색
        </li>
        <li v-else-if="info.lefcolrCodeNm.includes('빨강, 분홍, 자주색')">
          <i class="icon_color_view pink_red_wine"></i>빨강, 분홍, 자주색
        </li>
        <li v-else-if="info.lefcolrCodeNm.includes('여러색 혼합')">
          <i class="icon_color_view mix"></i>혼합색
        </li>
        <li v-else-if="info.lefcolrCodeNm.includes('기타')">
          <i class="icon_color_view ect"></i>기타
        </li>
      </ul>
      <p class="desc">{{ info.lefcolrCode }}</p>
    </div>
    <div class="info_item" v-if="isShow(info.lefStleInfo)">
      <h4 class="sub_title">잎 형태</h4>
      <p class="desc">{{ info.lefStleInfo }}</p>
    </div>
    <div class="info_item" v-if="isShow(info.lefmrkCodeNm)">
      <h4 class="sub_title">잎 무늬</h4>
      <ul class="pattern_list">
        <li v-if="info.lefmrkCodeNm.includes('줄무늬')">
          <i class="icon_pattern stripe"></i>줄무늬
        </li>
        <li v-else-if="info.lefmrkCodeNm.includes('점무늬')">
          <i class="icon_pattern dot"></i>점무늬
        </li>
        <li v-else-if="info.lefmrkCodeNm.includes('잎 가장자리 무늬')">
          <i class="icon_pattern line"></i>잎 가장자리 무늬
        </li>
        <li v-else-if="info.lefmrkCodeNm.includes('기타 (무늬없음 등)')">
          <i class="icon_pattern solid"></i>기타 (무늬없음 등)
        </li>
      </ul>
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
