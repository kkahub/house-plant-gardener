<template>
  <div class="wrap_filter" :class="isToggleDetailFilter ? 'active' : ''">
    <!-- 광도 -->
    <div class="fieldset">
      <div class="legend">광도</div>
      <div class="form_group">
        <div class="check_btn">
          <input
            type="checkbox"
            id="lightLow"
            :value="props.lightBundle"
            @input="lightCondition($event, '055001')"
          />
          <label for="lightLow">낮음(300~800 Lux)</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="lightMid"
            :value="props.lightBundle"
            @input="lightCondition($event, '055002')"
          />
          <label for="lightMid">중간(800~1,500 Lux)</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="lightHigh"
            :value="props.lightBundle"
            @input="lightCondition($event, '055003')"
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
            :value="props.growFormBundle"
            @input="growFormCondition($event, '054001')"
          />
          <label for="growVertica">직립형</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="growTreeLike"
            :value="props.growFormBundle"
            @input="growFormCondition($event, '054002')"
          />
          <label for="growTreeLike">관목형</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="growTrailing"
            :value="props.growFormBundle"
            @input="growFormCondition($event, '054003')"
          />
          <label for="growTrailing">덩굴성</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="growGrass"
            :value="props.growFormBundle"
            @input="growFormCondition($event, '054004')"
          />
          <label for="growGrass">풀모양</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="growRosette"
            :value="props.growFormBundle"
            @input="growFormCondition($event, '054005')"
          />
          <label for="growRosette">로제트형</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="growSucculent"
            :value="props.growFormBundle"
            @input="growFormCondition($event, '054006')"
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
            :value="props.leafColorBundle"
            @input="leafColorCondition($event, '070001')"
          />
          <label for="patternStripes">줄무늬</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="patternDot"
            :value="props.leafColorBundle"
            @input="leafColorCondition($event, '070002')"
          />
          <label for="patternDot">점무늬</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="patternEdge"
            :value="props.leafColorBundle"
            @input="leafColorCondition($event, '070003')"
          />
          <label for="patternEdge">잎 가장자리 무늬</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="patternEct"
            :value="props.leafColorBundle"
            @input="leafColorCondition($event, '070004')"
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
            :value="props.leafPatternBundle"
            @input="leafPatternCondition($event, '069001')"
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
            :value="props.leafPatternBundle"
            @input="leafPatternCondition($event, '069002')"
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
            :value="props.leafPatternBundle"
            @input="leafPatternCondition($event, '069003')"
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
            :value="props.leafPatternBundle"
            @input="leafPatternCondition($event, '069004')"
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
            :value="props.leafPatternBundle"
            @input="leafPatternCondition($event, '069005')"
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
            :value="props.leafPatternBundle"
            @input="leafPatternCondition($event, '069006')"
          />
          <label for="lightMix"><i class="icon_color_view mix"></i>혼합색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="lightEct"
            :value="props.leafPatternBundle"
            @input="leafPatternCondition($event, '069007')"
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
            :value="props.flowerColorBundle"
            @input="flowerColorCondition($event, '071001')"
          />
          <label for="flowerBlue"><i class="icon_color_view blue"></i>파랑색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="flowerPurple"
            :value="props.flowerColorBundle"
            @input="flowerColorCondition($event, '071002')"
          />
          <label for="flowerPurple"><i class="icon_color_view purple"></i>보라색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="flowerPink"
            :value="props.flowerColorBundle"
            @input="flowerColorCondition($event, '071003')"
          />
          <label for="flowerPink"><i class="icon_color_view pink"></i>분홍색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="flowerRed"
            :value="props.flowerColorBundle"
            @input="flowerColorCondition($event, '071004')"
          />
          <label for="flowerRed"><i class="icon_color_view red"></i>빨강색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="flowerOrange"
            :value="props.flowerColorBundle"
            @input="flowerColorCondition($event, '071005')"
          />
          <label for="flowerOrange"><i class="icon_color_view orange"></i>오렌지색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="flowerYellow"
            :value="props.flowerColorBundle"
            @input="flowerColorCondition($event, '071006')"
          />
          <label for="flowerYellow"><i class="icon_color_view yellow"></i>노랑색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="flowerWhite"
            :value="props.flowerColorBundle"
            @input="flowerColorCondition($event, '071007')"
          />
          <label for="flowerWhite"><i class="icon_color_view white"></i>흰색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="flowerMix"
            :value="props.flowerColorBundle"
            @input="flowerColorCondition($event, '071008')"
          />
          <label for="flowerMix"><i class="icon_color_view mix"></i>혼합색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="flowerEct"
            :value="props.flowerColorBundle"
            @input="flowerColorCondition($event, '071009')"
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
            :value="props.fruitColorBundle"
            @input="fruitColorCondition($event, '081001')"
          />
          <label for="fruitBlue"><i class="icon_color_view blue"></i>파랑색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="fruitPurple"
            :value="props.fruitColorBundle"
            @input="fruitColorCondition($event, '081002')"
          />
          <label for="fruitPurple"><i class="icon_color_view purple"></i>보라색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="fruitBlack"
            :value="props.fruitColorBundle"
            @input="fruitColorCondition($event, '081003')"
          />
          <label for="fruitBlack"><i class="icon_color_view black"></i>검정색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="fruitRed"
            :value="props.fruitColorBundle"
            @input="fruitColorCondition($event, '081004')"
          />
          <label for="fruitRed"><i class="icon_color_view red"></i>빨강색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="fruitOrange"
            :value="props.fruitColorBundle"
            @input="fruitColorCondition($event, '081005')"
          />
          <label for="fruitOrange"><i class="icon_color_view orange"></i>오렌지색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="fruitYellow"
            :value="props.fruitColorBundle"
            @input="fruitColorCondition($event, '081006')"
          />
          <label for="fruitYellow"><i class="icon_color_view yellow"></i>노랑색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="fruitWhite"
            :value="props.fruitColorBundle"
            @input="fruitColorCondition($event, '081007')"
          />
          <label for="fruitWhite"><i class="icon_color_view white"></i>흰색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="fruitMix"
            :value="props.fruitColorBundle"
            @input="fruitColorCondition($event, '081008')"
          />
          <label for="fruitMix"><i class="icon_color_view mix"></i>혼합색</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="fruitEct"
            :value="props.fruitColorBundle"
            @input="fruitColorCondition($event, '081009')"
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
            :value="props.floweringBundle"
            @input="floweringCondition($event, '073001')"
          />
          <label for="flowerSpring">봄</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="flowerSummer"
            :value="props.floweringBundle"
            @input="floweringCondition($event, '073002')"
          />
          <label for="flowerSummer">여름</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="flowerFall"
            :value="props.floweringBundle"
            @input="floweringCondition($event, '073003')"
          />
          <label for="flowerFall">가을</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="flowerWinter"
            :value="props.floweringBundle"
            @input="floweringCondition($event, '073004')"
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
            :value="props.minTempBundle"
            @input="minTempCondition($event, '057001')"
          />
          <label for="temp0">~ 0 ℃</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="temp5"
            :value="props.minTempBundle"
            @input="minTempCondition($event, '057002')"
          />
          <label for="temp5">5 ℃</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="temp7"
            :value="props.minTempBundle"
            @input="minTempCondition($event, '057003')"
          />
          <label for="temp7">7 ℃</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="temp10"
            :value="props.minTempBundle"
            @input="minTempCondition($event, '057004')"
          />
          <label for="temp10">10 ℃</label>
        </div>
        <div class="check_btn">
          <input
            type="checkbox"
            id="temp13"
            :value="props.minTempBundle"
            @input="minTempCondition($event, '057005')"
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
            :value="props.waterCycleBundle"
            @input="waterCycleCondition($event, '053001')"
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
            :value="props.waterCycleBundle"
            @input="waterCycleCondition($event, '053002')"
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
            :value="props.waterCycleBundle"
            @input="waterCycleCondition($event, '053003')"
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
            :value="props.waterCycleBundle"
            @input="waterCycleCondition($event, '053004')"
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

const checkVal: string[] = []

// 체크값 배열로 묶기
const checkBundle = (e: Event, val: string) => {
  const target = e.target as HTMLInputElement
  const checked = target.checked

  if (checked) {
    checkVal.push(val)
  } else {
    checkVal.splice(checkVal.indexOf(val), 1)
  }
  return checkVal
}

const lightCondition = (e: Event, val: string) => {
  emit('update:lightBundle', String(checkBundle(e, val)))
}
const growFormCondition = (e: Event, val: string) => {
  emit('update:growFormBundle', String(checkBundle(e, val)))
}
const leafColorCondition = (e: Event, val: string) => {
  emit('update:leafColorBundle', String(checkBundle(e, val)))
}
const leafPatternCondition = (e: Event, val: string) => {
  emit('update:leafPatternBundle', String(checkBundle(e, val)))
}
const flowerColorCondition = (e: Event, val: string) => {
  emit('update:flowerColorBundle', String(checkBundle(e, val)))
}
const fruitColorCondition = (e: Event, val: string) => {
  emit('update:fruitColorBundle', String(checkBundle(e, val)))
}
const floweringCondition = (e: Event, val: string) => {
  emit('update:floweringBundle', String(checkBundle(e, val)))
}
const minTempCondition = (e: Event, val: string) => {
  emit('update:minTempBundle', String(checkBundle(e, val)))
}
const waterCycleCondition = (e: Event, val: string) => {
  emit('update:waterCycleBundle', String(checkBundle(e, val)))
}
</script>

<style scoped></style>
