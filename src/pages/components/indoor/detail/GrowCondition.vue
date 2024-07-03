<template>
  <div class="card_content">
    <div class="info_item">
      <h4 class="sub_title">물주기</h4>
      <ol class="thumnail_desc">
        <li class="spring">
          <h5 class="season">봄</h5>
          <WaterCycle :amount-water="info.watercycleSprngCode" />
        </li>
        <li class="summer">
          <h5 class="season">여름</h5>
          <WaterCycle :amount-water="info.watercycleSummerCode" />
        </li>
        <li class="fall">
          <h5 class="season">가을</h5>
          <WaterCycle :amount-water="info.watercycleAutumnCode" />
        </li>
        <li class="winter">
          <h5 class="season">겨울</h5>
          <WaterCycle :amount-water="info.watercycleWinterCode" />
        </li>
      </ol>
    </div>
    <div class="info_item brightness">
      <h4 class="sub_title">요구 광도</h4>
      <div class="scope_bar">
        <div
          class="scope_tooltip"
          :class="info.lighttdemanddoCodeNm.includes('낮은 광도') ? 'active' : ''"
        >
          <span>낮은 광도<br />(300~800 Lux)</span>
        </div>
        <div
          class="scope_tooltip"
          :class="info.lighttdemanddoCodeNm.includes('중간 광도') ? 'active' : ''"
        >
          <span>중간 광도<br />(800~1,500 Lux)</span>
        </div>
        <div
          class="scope_tooltip"
          :class="info.lighttdemanddoCodeNm.includes('높은 광도') ? 'active' : ''"
        >
          <span>높은 광도<br />(1,500~10,000 Lux)</span>
        </div>
      </div>
    </div>
    <div class="info_item grow_temp" v-if="isShow(info.grwhTpCode)">
      <h4 class="sub_title">생육온도</h4>
      <ScopeBar :legend="info.grwhTpCodeNm" :conditions="growTempCondition" />
    </div>
    <div class="info_item lowest_temp">
      <h4 class="sub_title">겨울 최저 온도</h4>
      <ScopeBar :legend="info.winterLwetTpCodeNm" :conditions="lowestTempCondition" />
    </div>
    <div class="info_item humidity">
      <h4 class="sub_title">습도</h4>
      <ScopeBar :legend="info.hdCodeNm" :conditions="humidityCondition" />
    </div>
    <div class="info_item" v-if="isShow(info.soilInfo)">
      <h4 class="sub_title">토양정보</h4>
      <p class="desc">{{ info.soilInfo }}</p>
    </div>
    <div class="info_item" v-if="isShow(info.frtlzrInfo)">
      <h4 class="sub_title">비료</h4>
      <p class="desc">{{ info.frtlzrInfo }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIsShow } from '@/composables/useIsShow'
import WaterCycle from './components/WaterCycle.vue'
import ScopeBar from '@/components/graph/ScopeBar.vue'

defineProps({
  info: {
    type: Object,
    default: () => ({})
  }
})

const growTempCondition = ['10~15℃', '16~20℃', '21~25℃', '26~30℃']
const lowestTempCondition = ['0℃ 이하', '5℃', '7℃', '10℃', '13℃ 이상']
const humidityCondition = ['40% 미만', '40 ~ 70%', '70% 이상']

const { isShow } = useIsShow()
</script>

<style scoped></style>
