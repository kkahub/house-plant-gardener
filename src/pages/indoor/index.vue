<template>
  <section class="wrap_indoor_list">
    <div class="inner">
      <div class="page_header">
        <div class="title_wrap">
          <h2 class="page_title">실내식물</h2>
          <p class="title_desc">
            농촌진흥청 농사로에서 제공하는 실내에 키우기 적합한 식물의 정보를 자세히 소개합니다.<br />
            집환경에 맞는 조건의 식물을 찾아보세요.
          </p>
        </div>
      </div>
      <SearchBarDetail
        v-model:keyword="keyword"
        :prev-keyword="prevKeyword"
        v-model:light="light"
        v-model:growForm="growForm"
        v-model:leafColor="leafColor"
        v-model:leafPattern="leafPattern"
        v-model:flowerColor="flowerColor"
        v-model:fruitColor="fruitColor"
        v-model:flowering="flowering"
        v-model:minTemp="minTemp"
        v-model:waterCycle="waterCycle"
        :loading="isLoading"
        @submit="handleSearch"
      />

      <div class="indoor_list_wrap">
        <div v-if="isLoading" class="indoor_list_loading">
          <div class="loader_inner">
            <div class="loader">로딩중...</div>
          </div>
        </div>
        <div v-else>
          <div v-if="!isNoData" class="indoor_list_inner">
            <IndoorList :plant-items="plantItems" />
            <Pagination
              v-if="totalPage > 1"
              :page-array="pageArray"
              :start-page="startPage"
              :current-page="currentPage"
              :prev-page="prevPage"
              :next-page="nextPage"
              :get-page="getPage"
              :is-prev="isPrev"
              :is-next="isNext"
              path="/indoor?page="
            />
          </div>
          <div v-else class="no_data">검색된 식물이 없습니다.</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAsyncState } from '@vueuse/core'
import { usePagination } from '@/composables/usePagination'
import { storeToRefs } from 'pinia'
import { usePageStore } from '@/stores/pagination'
import getIndoorList from '@/services/indoor'
import { latestOnly } from '@/utils/latestOnly'
import SearchBarDetail from '@/components/apps/indoor/SearchBarDetail.vue'
import IndoorList from '@/components/apps/indoor/IndoorList.vue'
import Pagination from '@/components/pagination/Pagination.vue'

const indoorPageStore = usePageStore()
const { keyword, currentPage } = storeToRefs(indoorPageStore)

const plantItems = ref()
const prevKeyword = ref<string | undefined>('')
const isNoData = ref(false)
const pageSize = ref(16)
const light = ref('')
const growForm = ref('')
const leafColor = ref('')
const leafPattern = ref('')
const flowerColor = ref('')
const fruitColor = ref('')
const flowering = ref('')
const minTemp = ref('')
const waterCycle = ref('')

const route = useRoute()
const router = useRouter()

// 쿼리 주소를 이용해 다이렉트 접속 시 페이지 값 설정
currentPage.value = Number(route.query.page ?? 1)

// 검색 조건 유지
const getFilter = async () => {
  light.value = sessionStorage.getItem('light') || ''
  growForm.value = sessionStorage.getItem('growForm') || ''
  leafColor.value = sessionStorage.getItem('leafColor') || ''
  leafPattern.value = sessionStorage.getItem('leafPattern') || ''
  flowerColor.value = sessionStorage.getItem('flowerColor') || ''
  fruitColor.value = sessionStorage.getItem('fruitColor') || ''
  flowering.value = sessionStorage.getItem('flowering') || ''
  minTemp.value = sessionStorage.getItem('minTemp') || ''
  waterCycle.value = sessionStorage.getItem('waterCycle') || ''
}
getFilter()

const getLatestIndoorList = latestOnly(getIndoorList)

// 실내식물정보 데이터 가져오기
const { isLoading, execute } = useAsyncState(
  () =>
    getLatestIndoorList({
      currentPage: currentPage.value,
      currentPageSize: pageSize.value,
      searchWord: keyword.value,
      light: light.value,
      growForm: growForm.value,
      leafColor: leafColor.value,
      leafPattern: leafPattern.value,
      flowerColor: flowerColor.value,
      fruitColor: fruitColor.value,
      flowering: flowering.value,
      minTemp: minTemp.value,
      waterCycle: waterCycle.value
    }),
  null,
  {
    throwError: true,
    onSuccess: (result) => {
      if (result?.length === 0 || result === null) {
        isNoData.value = true
        prevKeyword.value = undefined
      } else {
        isNoData.value = false
        plantItems.value = result

        if (result) {
          total.value = result[0].total
        }
      }
    }
  }
)

const executePage = async () => {
  await execute()
}

// Pagination
const { pageArray, prevPage, nextPage, getPage, total, totalPage, startPage, isPrev, isNext } =
  usePagination(pageSize.value, executePage)

// 검색
const handleSearch = () => {
  currentPage.value = 1
  prevKeyword.value = keyword.value
  startPage.value = 1

  // 라우팅
  if (route.query.page === undefined) {
    executePage()
  } else {
    router.push({ path: route.path })
  }

  // 검색 조건 세션 저장
  sessionStorage.setItem('light', light.value)
  sessionStorage.setItem('growForm', growForm.value)
  sessionStorage.setItem('leafColor', leafColor.value)
  sessionStorage.setItem('leafPattern', leafPattern.value)
  sessionStorage.setItem('flowerColor', flowerColor.value)
  sessionStorage.setItem('fruitColor', fruitColor.value)
  sessionStorage.setItem('flowering', flowering.value)
  sessionStorage.setItem('minTemp', minTemp.value)
  sessionStorage.setItem('waterCycle', waterCycle.value)
}

// 뒤로가기 할 때 페이지 값 없으면 1로 설정
watch(route, () => {
  if (route.query.page === undefined) {
    currentPage.value = 1
    executePage()
  }
})
</script>

<style scoped></style>
