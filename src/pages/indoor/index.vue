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

      <div class="indoor_list_wrap">
        <!-- 로딩 -->
        <!-- <div class="indoor_list_loading">
          <div class="loader_inner">
            <div class="loader">로딩중...</div>
          </div>
        </div> -->
        <!-- // 로딩 -->

        <!-- v-else -->
        <div>
          <div class="indoor_list_inner">
            <div v-for="item in plantItems" :key="item" style="text-align: right">
              {{ item.cntntsSj }}
            </div>
            <!-- <IndoorList :plant-items="plantItems" /> -->
          </div>
        </div>
        <!-- // v-else -->
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAsyncState } from '@vueuse/core'
import { usePagination } from '@/composables/usePagination'
import { storeToRefs } from 'pinia'
import { useIndoorStore } from '@/stores/indoor'
import getIndoorList from '@/services/indoor'
import SearchBar from '@/pages/components/details/SearchBar.vue'
import IndoorList from '@/components/apps/indoor/IndoorList.vue'
import Pagination from '@/components/pagination/Pagination.vue'

const indoorStore = useIndoorStore()
const { indoorKeyword, indoorCurrentPage } = storeToRefs(indoorStore)

const plantItems = ref()
const prevKeyword = ref('')
const isNoData = ref(false)
const pageSize = ref(16)

const route = useRoute()
const router = useRouter()

// 쿼리 주소를 이용해 다이렉트 접속 시 페이지 값 설정
if (route.query.page !== undefined) {
  indoorCurrentPage.value = Number(route.query.page)
}

// 실내식물정보 데이터 가져오기
const { isLoading, execute } = useAsyncState(
  () =>
    getIndoorList({
      currentPage: indoorCurrentPage.value,
      currentPageSize: pageSize.value,
      searchWord: indoorKeyword.value
    }),
  null,
  {
    throwError: true,
    onSuccess: (result) => {
      if (result?.length === 0 || result === null) {
        isNoData.value = true
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
const { pageArray, prevPage, nextPage, getPage, total, startPage, isPrev, isNext } = usePagination(
  pageSize.value,
  indoorKeyword.value,
  executePage
)

// 검색
const handleSearch = () => {
  indoorCurrentPage.value = 1
  executePage()
  prevKeyword.value = indoorKeyword.value
  startPage.value = 1

  // 라우팅
  router.push({ path: `${route.matched[0].path}` })
}
</script>

<style scoped></style>
