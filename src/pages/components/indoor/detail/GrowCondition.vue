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
    <div class="info_item">
      <h4 class="sub_title">요구 광도</h4>
      <div class="scope_bar brightness">
        <div
          class="scope_tooltip first"
          :class="info.lighttdemanddoCodeNm.includes('낮은 광도') ? 'active' : ''"
        >
          <span>낮은 광도<br />(300~800 Lux)</span>
        </div>
        <div
          class="scope_tooltip second"
          :class="info.lighttdemanddoCodeNm.includes('중간 광도') ? 'active' : ''"
        >
          <span>중간 광도<br />(800~1,500 Lux)</span>
        </div>
        <div
          class="scope_tooltip third"
          :class="info.lighttdemanddoCodeNm.includes('높은 광도') ? 'active' : ''"
        >
          <span>높은 광도<br />(1,500~10,000 Lux)</span>
        </div>
      </div>
    </div>
    <div class="info_item" v-if="isShow(info.grwhTpCode)">
      <h4 class="sub_title">생육온도</h4>
      <div class="scope_bar grow_temp">
        <div class="scope_tooltip first" :class="info.grwhTpCode === '082001' ? 'active' : ''">
          <span>10~15℃</span>
        </div>
        <div class="scope_tooltip second" :class="info.grwhTpCode === '082002' ? 'active' : ''">
          <span>16~20℃</span>
        </div>
        <div class="scope_tooltip third" :class="info.grwhTpCode === '082003' ? 'active' : ''">
          <span>21~25℃</span>
        </div>
        <div class="scope_tooltip fourth" :class="info.grwhTpCode === '082004' ? 'active' : ''">
          <span>26~30℃</span>
        </div>
      </div>
    </div>
    <div class="info_item">
      <h4 class="sub_title">겨울 최저 온도</h4>
      <div class="scope_bar lowest_temp">
        <div
          class="scope_tooltip first"
          :class="info.winterLwetTpCode === '057001' ? 'active' : ''"
        >
          <span>0℃ 이하</span>
        </div>
        <div
          class="scope_tooltip second"
          :class="info.winterLwetTpCode === '057002' ? 'active' : ''"
        >
          <span>5℃</span>
        </div>
        <div
          class="scope_tooltip third"
          :class="info.winterLwetTpCode === '057003' ? 'active' : ''"
        >
          <span>7℃</span>
        </div>
        <div
          class="scope_tooltip fourth"
          :class="info.winterLwetTpCode === '057004' ? 'active' : ''"
        >
          <span>10℃</span>
        </div>
        <div
          class="scope_tooltip fifth"
          :class="info.winterLwetTpCode === '057005' ? 'active' : ''"
        >
          <span>13℃ 이상</span>
        </div>
      </div>
    </div>
    <div class="info_item">
      <h4 class="sub_title">습도</h4>
      <div class="scope_bar humidity">
        <div
          class="scope_tooltip first"
          :class="info.hdCodeNm.includes('40% 미만') ? 'active' : ''"
        >
          <span>40% 미만</span>
        </div>
        <div
          class="scope_tooltip second"
          :class="info.hdCodeNm.includes('40 ~ 70%') ? 'active' : ''"
        >
          <span>40 ~ 70%</span>
        </div>
        <div
          class="scope_tooltip third"
          :class="info.hdCodeNm.includes('70% 이상') ? 'active' : ''"
        >
          <span>70% 이상</span>
        </div>
      </div>
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

defineProps({
  info: {
    type: Object,
    default: () => ({})
  }
})

const { isShow } = useIsShow()
</script>

<style scoped></style>
