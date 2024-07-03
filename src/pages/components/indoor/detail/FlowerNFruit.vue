<template>
  <div class="card_content">
    <div class="info_item" v-if="isShow(info.ignSeasonCodeNm)">
      <h4 class="sub_title">개화 시기</h4>
      <p class="desc">{{ info.ignSeasonCodeNm }}</p>
    </div>
    <div class="info_item" v-if="isShow(info.flclrCodeNm)">
      <h4 class="sub_title">꽃 색깔</h4>
      <ul class="color_list">
        <li v-if="info.flclrCodeNm.includes('파랑색')">
          <i class="icon_color_view blue"></i>파랑색
        </li>
        <li v-else-if="info.flclrCodeNm.includes('보라색')">
          <i class="icon_color_view purple"></i>보라색
        </li>
        <li v-else-if="info.flclrCodeNm.includes('분홍색')">
          <i class="icon_color_view pink"></i>분홍색
        </li>
        <li v-else-if="info.flclrCodeNm.includes('빨강색')">
          <i class="icon_color_view red"></i>빨강색
        </li>
        <li v-else-if="info.flclrCodeNm.includes('오렌지색')">
          <i class="icon_color_view orange"></i>오렌지색
        </li>
        <li v-else-if="info.flclrCodeNm.includes('노랑색')">
          <i class="icon_color_view yellow"></i>노랑색
        </li>
        <li v-else-if="info.flclrCodeNm.includes('흰색')">
          <i class="icon_color_view white"></i>흰색
        </li>
        <li v-else-if="info.flclrCodeNm.includes('혼합색')">
          <i class="icon_color_view mix"></i>혼합색
        </li>
        <li v-else-if="info.flclrCodeNm.includes('기타')">
          <i class="icon_color_view ect"></i>기타
        </li>
      </ul>
    </div>
    <div class="info_item" v-if="isShow(info.fmldeSeasonCodeNm)">
      <h4 class="sub_title">열매 시기</h4>
      <p class="desc">{{ info.fmldeSeasonCodeNm }}</p>
    </div>
    <div class="info_item" v-if="isShow(info.fmldecolrCodeNm)">
      <h4 class="sub_title">열매색</h4>
      <ul class="color_list">
        <li v-if="info.fmldecolrCodeNm.includes('파랑색')">
          <i class="icon_color_view blue"></i>파랑색
        </li>
        <li v-else-if="info.fmldecolrCodeNm.includes('보라색')">
          <i class="icon_color_view purple"></i>보라색
        </li>
        <li v-else-if="info.fmldecolrCodeNm.includes('검정색')">
          <i class="icon_color_view black"></i>검정색
        </li>
        <li v-else-if="info.fmldecolrCodeNm.includes('빨강색')">
          <i class="icon_color_view red"></i>빨강색
        </li>
        <li v-else-if="info.fmldecolrCodeNm.includes('오렌지색')">
          <i class="icon_color_view orange"></i>오렌지색
        </li>
        <li v-else-if="info.fmldecolrCodeNm.includes('노랑색')">
          <i class="icon_color_view yellow"></i>노랑색
        </li>
        <li v-else-if="info.fmldecolrCodeNm.includes('흰색')">
          <i class="icon_color_view white"></i>흰색
        </li>
        <li v-else-if="info.fmldecolrCodeNm.includes('혼합색')">
          <i class="icon_color_view mix"></i>혼합색
        </li>
        <li v-else-if="info.fmldecolrCodeNm.includes('기타')">
          <i class="icon_color_view ect"></i>기타
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
