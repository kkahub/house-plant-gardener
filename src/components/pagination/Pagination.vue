<template>
  <ul class="pagination">
    <!-- <li class="page-item" :class="{ disabled: isBtnFirst }">
          <a class="page-link" href="#" @click.prevent="pageArrow('first')">First</a>
        </li> -->
    <li class="page-item" :class="{ disabled: isPrev }">
      <a class="page-link" href="#" @click="prevPage(executePage)">
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </a>
    </li>
    <template v-for="(item, index) in pageArray(startPage)" :key="`list-${index}`">
      <li class="page-item" :class="{ active: item === currentPage }">
        <a class="page-link" href="#" @click="getPage(item, executePage)">{{ item }}</a>
      </li>
    </template>
    <li class="page-item" :class="{ disabled: isNext }">
      <a class="page-link" href="#" @click="nextPage(executePage)">
        <font-awesome-icon :icon="['fas', 'chevron-right']" />
      </a>
    </li>
    <!--<li class="page-item" :class="{ disabled: isBtnLast }">
          <a class="page-link" href="#" @click.prevent="pageArrow('last')">Last</a>
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
