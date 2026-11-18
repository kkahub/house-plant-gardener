<template>
  <form @submit.prevent="handleSubmit">
    <!-- 검색어 -->
    <div class="wrap_search">
      <div class="inner_search">
        <input v-model="keywordModel" type="text" placeholder="식물 이름으로 검색해주세요." />
        <button type="submit" class="btn_search">
          <span class="material-symbols-rounded">search</span>
        </button>
      </div>
      <button
        type="button"
        class="btn btn_line_light btn_search_detail"
        @click="isToggleDetailFilter = !isToggleDetailFilter"
        :class="isToggleDetailFilter ? 'active' : ''"
      >
        상세 조건 <font-awesome-icon :icon="['fas', 'chevron-down']" />
      </button>
    </div>
    <!-- 검색어 -->
    <!-- 상세검색 -->
    <SearchFilter
      :is-toggle-detail-filter="isToggleDetailFilter"
      v-model:lightBundle="lightBundle"
      v-model:growFormBundle="growFormBundle"
      v-model:leafColorBundle="leafColorBundle"
      v-model:leafPatternBundle="leafPatternBundle"
      v-model:flowerColorBundle="flowerColorBundle"
      v-model:fruitColorBundle="fruitColorBundle"
      v-model:floweringBundle="floweringBundle"
      v-model:minTempBundle="minTempBundle"
      v-model:waterCycleBundle="waterCycleBundle"
    />
    <!-- 상세검색 -->
  </form>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import SearchFilter from './SearchFilter.vue'

const props = defineProps({
  keyword: {
    type: String
  },
  prevKeyword: {
    type: String
  },
  light: {
    type: String
  },
  growForm: {
    type: String
  },
  leafColor: {
    type: String
  },
  leafPattern: {
    type: String
  },
  flowerColor: {
    type: String
  },
  fruitColor: {
    type: String
  },
  flowering: {
    type: String
  },
  minTemp: {
    type: String
  },
  waterCycle: {
    type: String
  }
})

const isToggleDetailFilter = ref(true)
const lightBundle = ref(sessionStorage.getItem('light') || '')
const growFormBundle = ref(sessionStorage.getItem('growForm') || '')
const leafColorBundle = ref(sessionStorage.getItem('leafColor') || '')
const leafPatternBundle = ref(sessionStorage.getItem('leafPattern') || '')
const flowerColorBundle = ref(sessionStorage.getItem('flowerColor') || '')
const fruitColorBundle = ref(sessionStorage.getItem('fruitColor') || '')
const floweringBundle = ref(sessionStorage.getItem('flowering') || '')
const minTempBundle = ref(sessionStorage.getItem('minTemp') || '')
const waterCycleBundle = ref(sessionStorage.getItem('waterCycle') || '')
const isConditionChange = ref(false)

const emit = defineEmits([
  'update:keyword',
  'submit',
  'update:light',
  'update:growForm',
  'update:leafColor',
  'update:leafPattern',
  'update:flowerColor',
  'update:fruitColor',
  'update:flowering',
  'update:minTemp',
  'update:waterCycle'
])

const keywordModel = computed({
  get: () => props.keyword,
  set: (val) => emit('update:keyword', val)
})

const handleSubmit = async () => {
  if (props.prevKeyword === props.keyword && isConditionChange.value === false) {
    return
  }
  emit('submit')
  isConditionChange.value = false
}

watch(lightBundle, () => {
  emit('update:light', lightBundle.value)
  isConditionChange.value = true
})
watch(growFormBundle, () => {
  emit('update:growForm', growFormBundle.value)
  isConditionChange.value = true
})
watch(leafColorBundle, () => {
  emit('update:leafColor', leafColorBundle.value)
  isConditionChange.value = true
})
watch(leafPatternBundle, () => {
  emit('update:leafPattern', leafPatternBundle.value)
  isConditionChange.value = true
})
watch(flowerColorBundle, () => {
  emit('update:flowerColor', flowerColorBundle.value)
  isConditionChange.value = true
})
watch(fruitColorBundle, () => {
  emit('update:fruitColor', fruitColorBundle.value)
  isConditionChange.value = true
})
watch(floweringBundle, () => {
  emit('update:flowering', floweringBundle.value)
  isConditionChange.value = true
})
watch(minTempBundle, () => {
  emit('update:minTemp', minTempBundle.value)
  isConditionChange.value = true
})
watch(waterCycleBundle, () => {
  emit('update:waterCycle', waterCycleBundle.value)
  isConditionChange.value = true
})
</script>

<style scoped></style>
