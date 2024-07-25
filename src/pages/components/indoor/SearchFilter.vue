<template>
  <div class="wrap_filter" :class="isToggleDetailFilter ? 'active' : ''">
    <div class="fieldset">
      <!-- 광도 -->
      <div class="legend">광도</div>
      <div class="form_group">
        <div class="check_btn">
          <input
            type="checkbox"
            id="lightLow"
            v-model="lightVal"
            value="055001"
            @change="emit('update:lightBundle', bundlingValue(lightVal ?? ['']))"
          />
          <label for="lightLow">낮음(300~800 Lux)</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="lightMid"
            v-model="lightVal"
            value="055002"
            @change="emit('update:lightBundle', bundlingValue(lightVal ?? ['']))"
          />
          <label for="lightMid">중간(800~1,500 Lux)</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="lightHigh"
            v-model="lightVal"
            value="055003"
            @change="emit('update:lightBundle', bundlingValue(lightVal ?? ['']))"
          />
          <label for="lightHigh">높음(1,500~10,000 Lux)</label>
        </div>
      </div>
      <!-- // 광도 -->
      <!-- 생육형태 -->
      <div class="legend">생육형태</div>
      <div class="form_group">
        <div class="check_btn">
          <input
            type="checkbox"
            id="growVertica"
            v-model="growFormVal"
            value="054001"
            @change="emit('update:growFormBundle', bundlingValue(growFormVal ?? ['']))"
          />
          <label for="growVertica">직립형</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="growTreeLike"
            v-model="growFormVal"
            value="054002"
            @change="emit('update:growFormBundle', bundlingValue(growFormVal ?? ['']))"
          />
          <label for="growTreeLike">관목형</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="growTrailing"
            v-model="growFormVal"
            value="054003"
            @change="emit('update:growFormBundle', bundlingValue(growFormVal ?? ['']))"
          />
          <label for="growTrailing">덩굴성</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="growGrass"
            v-model="growFormVal"
            value="054004"
            @change="emit('update:growFormBundle', bundlingValue(growFormVal ?? ['']))"
          />
          <label for="growGrass">풀모양</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="growRosette"
            v-model="growFormVal"
            value="054005"
            @change="emit('update:growFormBundle', bundlingValue(growFormVal ?? ['']))"
          />
          <label for="growRosette">로제트형</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="growSucculent"
            v-model="growFormVal"
            value="054006"
            @change="emit('update:growFormBundle', bundlingValue(growFormVal ?? ['']))"
          />
          <label for="growSucculent">다육형</label>
        </div>
      </div>
      <!-- // 생육형태 -->
      <!-- 잎 무늬 -->
      <div class="legend">잎 무늬</div>
      <div class="form_group">
        <div class="check_btn">
          <input
            type="checkbox"
            id="patternStripes"
            v-model="leafPatternVal"
            value="070001"
            @change="emit('update:leafPatternBundle', bundlingValue(leafPatternVal ?? ['']))"
          />
          <label for="patternStripes">줄무늬</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="patternDot"
            v-model="leafPatternVal"
            value="070002"
            @change="emit('update:leafPatternBundle', bundlingValue(leafPatternVal ?? ['']))"
          />
          <label for="patternDot">점무늬</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="patternEdge"
            v-model="leafPatternVal"
            value="070003"
            @change="emit('update:leafPatternBundle', bundlingValue(leafPatternVal ?? ['']))"
          />
          <label for="patternEdge">잎 가장자리 무늬</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="patternEct"
            v-model="leafPatternVal"
            value="070004"
            @change="emit('update:leafPatternBundle', bundlingValue(leafPatternVal ?? ['']))"
          />
          <label for="patternEct">기타 (무늬없음 등)</label>
        </div>
      </div>
      <!-- // 잎 무늬 -->
      <!-- 잎색 -->
      <div class="legend">잎색</div>
      <div class="form_group">
        <div class="check_btn">
          <input
            type="checkbox"
            id="leafGreen"
            v-model="leafColorVal"
            value="069001"
            @change="emit('update:leafColorBundle', bundlingValue(leafColorVal ?? ['']))"
          />
          <label for="leafGreen">
            <i class="icon_color_view ygreen_green"></i>
            연두색<span class="text_light">/</span>녹색
          </label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="lightYellow"
            v-model="leafColorVal"
            value="069002"
            @change="emit('update:leafColorBundle', bundlingValue(leafColorVal ?? ['']))"
          />
          <label for="lightYellow">
            <i class="icon_color_view yellow_gold"></i>
            노란색 <span class="text_light">/</span> 금색
          </label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="lightWhite"
            v-model="leafColorVal"
            value="069003"
            @change="emit('update:leafColorBundle', bundlingValue(leafColorVal ?? ['']))"
          />
          <label for="lightWhite">
            <i class="icon_color_view white_cream"></i>
            흰색 <span class="text_light">/</span> 크림색
          </label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="lightSilver"
            v-model="leafColorVal"
            value="069004"
            @change="emit('update:leafColorBundle', bundlingValue(leafColorVal ?? ['']))"
          />
          <label for="lightSilver">
            <i class="icon_color_view silver_gray"></i>
            은색 <span class="text_light">/</span> 회색
          </label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="lightRed"
            v-model="leafColorVal"
            value="069005"
            @change="emit('update:leafColorBundle', bundlingValue(leafColorVal ?? ['']))"
          />
          <label for="lightRed">
            <i class="icon_color_view pink_red_wine"></i>
            분홍 <span class="text_light">/</span> 빨강 <span class="text_light">/</span>
            자주색
          </label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="lightMix"
            v-model="leafColorVal"
            value="069006"
            @change="emit('update:leafColorBundle', bundlingValue(leafColorVal ?? ['']))"
          />
          <label for="lightMix"><i class="icon_color_view mix"></i>혼합색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="lightEct"
            v-model="leafColorVal"
            value="069007"
            @change="emit('update:leafColorBundle', bundlingValue(leafColorVal ?? ['']))"
          />
          <label for="lightEct"><i class="icon_color_view ect"></i>기타</label>
        </div>
      </div>
      <!-- // 잎색 -->
      <!-- 꽃색 -->
      <div class="legend">꽃색</div>
      <div class="form_group">
        <div class="check_btn">
          <input
            type="checkbox"
            id="flowerBlue"
            v-model="flowerColorVal"
            value="071001"
            @change="emit('update:flowerColorBundle', bundlingValue(flowerColorVal ?? ['']))"
          />
          <label for="flowerBlue"><i class="icon_color_view blue"></i>파랑색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="flowerPurple"
            v-model="flowerColorVal"
            value="071002"
            @change="emit('update:flowerColorBundle', bundlingValue(flowerColorVal ?? ['']))"
          />
          <label for="flowerPurple"><i class="icon_color_view purple"></i>보라색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="flowerPink"
            v-model="flowerColorVal"
            value="071003"
            @change="emit('update:flowerColorBundle', bundlingValue(flowerColorVal ?? ['']))"
          />
          <label for="flowerPink"><i class="icon_color_view pink"></i>분홍색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="flowerRed"
            v-model="flowerColorVal"
            value="071004"
            @change="emit('update:flowerColorBundle', bundlingValue(flowerColorVal ?? ['']))"
          />
          <label for="flowerRed"><i class="icon_color_view red"></i>빨강색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="flowerOrange"
            v-model="flowerColorVal"
            value="071005"
            @change="emit('update:flowerColorBundle', bundlingValue(flowerColorVal ?? ['']))"
          />
          <label for="flowerOrange"><i class="icon_color_view orange"></i>오렌지색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="flowerYellow"
            v-model="flowerColorVal"
            value="071006"
            @change="emit('update:flowerColorBundle', bundlingValue(flowerColorVal ?? ['']))"
          />
          <label for="flowerYellow"><i class="icon_color_view yellow"></i>노랑색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="flowerWhite"
            v-model="flowerColorVal"
            value="071007"
            @change="emit('update:flowerColorBundle', bundlingValue(flowerColorVal ?? ['']))"
          />
          <label for="flowerWhite"><i class="icon_color_view white"></i>흰색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="flowerMix"
            v-model="flowerColorVal"
            value="071008"
            @change="emit('update:flowerColorBundle', bundlingValue(flowerColorVal ?? ['']))"
          />
          <label for="flowerMix"><i class="icon_color_view mix"></i>혼합색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="flowerEct"
            v-model="flowerColorVal"
            value="071009"
            @change="emit('update:flowerColorBundle', bundlingValue(flowerColorVal ?? ['']))"
          />
          <label for="flowerEct"><i class="icon_color_view ect"></i>기타</label>
        </div>
      </div>
      <!-- // 꽃색 -->
      <!-- 열매색 -->
      <div class="legend">열매색</div>
      <div class="form_group">
        <div class="check_btn">
          <input
            type="checkbox"
            id="fruitBlue"
            v-model="fruitColorVal"
            value="081001"
            @change="emit('update:fruitColorBundle', bundlingValue(fruitColorVal ?? ['']))"
          />
          <label for="fruitBlue"><i class="icon_color_view blue"></i>파랑색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="fruitPurple"
            v-model="fruitColorVal"
            value="081002"
            @change="emit('update:fruitColorBundle', bundlingValue(fruitColorVal ?? ['']))"
          />
          <label for="fruitPurple"><i class="icon_color_view purple"></i>보라색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="fruitBlack"
            v-model="fruitColorVal"
            value="081003"
            @change="emit('update:fruitColorBundle', bundlingValue(fruitColorVal ?? ['']))"
          />
          <label for="fruitBlack"><i class="icon_color_view black"></i>검정색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="fruitRed"
            v-model="fruitColorVal"
            value="081004"
            @change="emit('update:fruitColorBundle', bundlingValue(fruitColorVal ?? ['']))"
          />
          <label for="fruitRed"><i class="icon_color_view red"></i>빨강색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="fruitOrange"
            v-model="fruitColorVal"
            value="081005"
            @change="emit('update:fruitColorBundle', bundlingValue(fruitColorVal ?? ['']))"
          />
          <label for="fruitOrange"><i class="icon_color_view orange"></i>오렌지색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="fruitYellow"
            v-model="fruitColorVal"
            value="081006"
            @change="emit('update:fruitColorBundle', bundlingValue(fruitColorVal ?? ['']))"
          />
          <label for="fruitYellow"><i class="icon_color_view yellow"></i>노랑색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="fruitWhite"
            v-model="fruitColorVal"
            value="081007"
            @change="emit('update:fruitColorBundle', bundlingValue(fruitColorVal ?? ['']))"
          />
          <label for="fruitWhite"><i class="icon_color_view white"></i>흰색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="fruitMix"
            v-model="fruitColorVal"
            value="081008"
            @change="emit('update:fruitColorBundle', bundlingValue(fruitColorVal ?? ['']))"
          />
          <label for="fruitMix"><i class="icon_color_view mix"></i>혼합색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="fruitEct"
            v-model="fruitColorVal"
            value="081009"
            @change="emit('update:fruitColorBundle', bundlingValue(fruitColorVal ?? ['']))"
          />
          <label for="fruitEct"><i class="icon_color_view ect"></i>기타</label>
        </div>
      </div>
      <!-- // 열매색 -->
      <!-- 꽃피는 계절 -->
      <div class="legend">꽃피는 계절</div>
      <div class="form_group">
        <div class="check_btn">
          <input
            type="checkbox"
            id="flowerSpring"
            v-model="floweringVal"
            value="073001"
            @change="emit('update:floweringBundle', bundlingValue(floweringVal ?? ['']))"
          />
          <label for="flowerSpring">봄</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="flowerSummer"
            v-model="floweringVal"
            value="073002"
            @change="emit('update:floweringBundle', bundlingValue(floweringVal ?? ['']))"
          />
          <label for="flowerSummer">여름</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="flowerFall"
            v-model="floweringVal"
            value="073003"
            @change="emit('update:floweringBundle', bundlingValue(floweringVal ?? ['']))"
          />
          <label for="flowerFall">가을</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="flowerWinter"
            v-model="floweringVal"
            value="073004"
            @change="emit('update:floweringBundle', bundlingValue(floweringVal ?? ['']))"
          />
          <label for="flowerWinter">겨울</label>
        </div>
      </div>
      <!-- // 꽃피는 계절 -->
      <!-- 최저온도 -->
      <div class="legend">최저온도</div>
      <div class="form_group">
        <div class="check_btn">
          <input
            type="checkbox"
            id="temp0"
            v-model="minTempVal"
            value="057001"
            @change="emit('update:minTempBundle', bundlingValue(minTempVal ?? ['']))"
          />
          <label for="temp0">~ 0 ℃</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="temp5"
            v-model="minTempVal"
            value="057002"
            @change="emit('update:minTempBundle', bundlingValue(minTempVal ?? ['']))"
          />
          <label for="temp5">5 ℃</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="temp7"
            v-model="minTempVal"
            value="057003"
            @change="emit('update:minTempBundle', bundlingValue(minTempVal ?? ['']))"
          />
          <label for="temp7">7 ℃</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="temp10"
            v-model="minTempVal"
            value="057004"
            @change="emit('update:minTempBundle', bundlingValue(minTempVal ?? ['']))"
          />
          <label for="temp10">10 ℃</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="temp13"
            v-model="minTempVal"
            value="057005"
            @change="emit('update:minTempBundle', bundlingValue(minTempVal ?? ['']))"
          />
          <label for="temp13">13 ℃ ~</label>
        </div>
      </div>
      <!-- // 최저온도 -->
      <!-- 물주기 -->
      <div class="legend">물주기</div>
      <div class="form_group">
        <div class="check_btn">
          <input
            type="checkbox"
            id="waterCycle1"
            v-model="waterCycleVal"
            value="053001"
            @change="emit('update:waterCycleBundle', bundlingValue(waterCycleVal ?? ['']))"
          />
          <label for="waterCycle1">
            <i class="icon_water_view water_1"></i>
            축축하게 유지(물에 잠김)
          </label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="waterCycle2"
            v-model="waterCycleVal"
            value="053002"
            @change="emit('update:waterCycleBundle', bundlingValue(waterCycleVal!))"
          />
          <label for="waterCycle2">
            <i class="icon_water_view water_2"></i>
            촉촉하게 유지(물에 잠기지 않도록 주의)
          </label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="waterCycle3"
            v-model="waterCycleVal"
            value="053003"
            @change="emit('update:waterCycleBundle', bundlingValue(waterCycleVal!))"
          />
          <label for="waterCycle3">
            <i class="icon_water_view water_3"></i>
            흙 표면이 말랐을 때
          </label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="waterCycle4"
            v-model="waterCycleVal"
            value="053004"
            @change="emit('update:waterCycleBundle', bundlingValue(waterCycleVal!!))"
          />
          <label for="waterCycle4">
            <i class="icon_water_view water_4"></i>
            흙 대부분 말랐을 때
          </label>
        </div>
      </div>
      <!-- // 물주기 -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  keyword: {
    type: String,
    defalut: ''
  },
  prevKeyword: {
    type: String,
    defalut: ''
  },
  isToggleDetailFilter: {
    type: Boolean,
    defalut: false
  },
  lightBundle: {
    type: String
  },
  growFormBundle: {
    type: String
  },
  leafColorBundle: {
    type: String
  },
  leafPatternBundle: {
    type: String
  },
  flowerColorBundle: {
    type: String
  },
  fruitColorBundle: {
    type: String
  },
  floweringBundle: {
    type: String
  },
  minTempBundle: {
    type: String
  },
  waterCycleBundle: {
    type: String
  }
})

const emit = defineEmits([
  'update:lightBundle',
  'update:growFormBundle',
  'update:leafColorBundle',
  'update:leafPatternBundle',
  'update:flowerColorBundle',
  'update:fruitColorBundle',
  'update:floweringBundle',
  'update:minTempBundle',
  'update:waterCycleBundle'
])

const lightVal = ref(props.lightBundle?.split(','))
const growFormVal = ref(props.growFormBundle?.split(','))
const leafColorVal = ref(props.leafColorBundle?.split(','))
const leafPatternVal = ref(props.leafPatternBundle?.split(','))
const flowerColorVal = ref(props.flowerColorBundle?.split(','))
const fruitColorVal = ref(props.fruitColorBundle?.split(','))
const floweringVal = ref(props.floweringBundle?.split(','))
const minTempVal = ref(props.minTempBundle?.split(','))
const waterCycleVal = ref(props.waterCycleBundle?.split(','))

const bundlingValue = (val: string[]) => {
  const valEdit = val.filter((item: string) => item !== '')
  return valEdit.length === 0 ? '' : valEdit.join()
}
</script>

<style scoped></style>
