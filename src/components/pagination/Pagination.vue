<template>
  <div>
    <ul class="pagination">
      <!-- <li class="page_item" :class="{ active: isBtnFirst }">
          <a class="page_btn" href="#" @click.prevent="pageArrow('first')">First</a>
        </li> -->
      <li class="page_item prev" :class="{ active: isPrev }">
        <a class="page_btn" href="#" @click.prevent="prevPage()">
          <font-awesome-icon :icon="['fas', 'chevron-left']" />
        </a>
      </li>
      <template v-for="pageNum in pageArray(startPage)" :key="pageNum">
        <li class="page_item" :class="{ active: pageNum === currentPage }">
          <router-link
            :to="`${path}${pageNum}`"
            @click="getPage(pageNum, $event)"
            class="page_btn"
            type="button"
          >
            {{ pageNum }}
          </router-link>
        </li>
      </template>
      <li class="page_item next" :class="{ active: isNext }">
        <a class="page_btn" href="#" @click.prevent="nextPage()">
          <font-awesome-icon :icon="['fas', 'chevron-right']" />
        </a>
      </li>
      <!--<li class="page_item" :class="{ active: isBtnLast }">
          <a class="page_btn" href="#" @click.prevent="pageArrow('last')">Last</a>
        </li> -->
    </ul>
  </div>
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
    default: 1
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
  guideKeyword: {
    type: [String, Array],
    default: ''
  },
  pageSize: {
    type: Number,
    default: 16
  },
  currentPage: {
    type: Number,
    detault: 0
  },
  isPrev: {
    type: Boolean
  },
  isNext: {
    type: Boolean
  },
  path: {
    type: String,
    default: ''
  }
})
</script>

<style scoped></style>
