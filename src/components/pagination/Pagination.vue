<template>
  <ul class="pagination">
    <!-- <li class="page_item" :class="{ disabled: isBtnFirst }">
          <a class="page_btn" href="#" @click.prevent="pageArrow('first')">First</a>
        </li> -->
    <li class="page_item" :class="{ disabled: isPrev }">
      <a class="page_btn" href="#" @click="prevPage(executePage)">
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </a>
    </li>
    <template v-for="(item, index) in pageArray(startPage)" :key="`list-${index}`">
      <li class="page_item" :class="{ active: item === currentPage }">
        <button class="page_btn" @click="getPage(item, executePage)" type="button">
          {{ item }}
        </button>
      </li>
    </template>
    <li class="page_item" :class="{ disabled: isNext }">
      <a class="page_btn" href="#" @click="nextPage(executePage)">
        <font-awesome-icon :icon="['fas', 'chevron-right']" />
      </a>
    </li>
    <!--<li class="page_item" :class="{ disabled: isBtnLast }">
          <a class="page_btn" href="#" @click.prevent="pageArrow('last')">Last</a>
        </li> -->
  </ul>
</template>

<script setup lang="ts">
defineProps({
  pageArray: {
    type: Function,
    default() {
      return null
    }
  },
  startPage: {
    type: Number,
    default: 0
  },
  prevPage: {
    type: Function,
    default() {
      return null
    }
  },
  nextPage: {
    type: Function,
    default() {
      return null
    }
  },
  getPage: {
    type: Function,
    default() {
      return null
    }
  },
  currentPage: {
    type: Number,
    detault: 0
  },
  isPrev: {
    type: Boolean,
    detault: false
  },
  isNext: {
    type: Boolean,
    detault: false
  },
  executePage: {
    type: Function,
    default() {
      return null
    }
  }
})
</script>

<style scoped></style>
