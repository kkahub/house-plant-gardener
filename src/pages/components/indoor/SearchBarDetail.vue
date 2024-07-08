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
    <SearchFilter :is-toggle-detail-filter="isToggleDetailFilter" :light="light" />
    <!-- 상세검색 -->
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
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
  }
})

const isToggleDetailFilter = ref(true)

const emit = defineEmits(['update:keyword', 'submit'])

const keywordModel = computed({
  get: () => props.keyword,
  set: (val) => emit('update:keyword', val)
})

const handleSubmit = async () => {
  if (props.prevKeyword === props.keyword) {
    return
  }
  emit('submit')
}
</script>

<style scoped></style>
