<template>
  <form @submit.prevent="handleSubmit">
    <div class="wrap_search">
      <div class="inner_search">
        <input v-model="keywordModel" type="text" placeholder="식물 이름으로 검색해주세요." />
        <button type="submit" class="btn_search">
          <span class="material-symbols-rounded">search</span>
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  keyword: {
    type: String
  },
  prevKeyword: {
    type: String
  }
})
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
