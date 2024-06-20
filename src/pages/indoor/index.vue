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

      <form @submit.prevent="">
        <div class="wrap_filter">
          <!-- 광도 -->
          <div class="fieldset">
            <div class="legend">광도</div>
            <div class="form_group">
              <div class="check_btn">
                <input type="checkbox" id="lightLow" name="light" value="055001" />
                <label for="lightLow">낮음(300~800 Lux)</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="lightMid" name="light" value="055002" />
                <label for="lightMid">중간(800~1,500 Lux)</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="lightHigh" name="light" value="055003" />
                <label for="lightHigh">높음(1,500~10,000 Lux)</label>
              </div>
            </div>
            <!-- // 광도 -->
            <!-- 생육형태 -->
            <div class="legend">생육형태</div>
            <div class="form_group">
              <div class="check_btn">
                <input type="checkbox" id="growVertica" name="growForm" value="054001" />
                <label for="growVertica">직립형</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="growTreeLike" name="growForm" value="054002" />
                <label for="growTreeLike">관목형</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="growTrailing" name="growForm" value="054003" />
                <label for="growTrailing">덩굴성</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="growGrass" name="growForm" value="054004" />
                <label for="growGrass">풀모양</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="growRosette" name="growForm" value="054005" />
                <label for="growRosette">로제트형</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="growSucculent" name="growForm" value="054006" />
                <label for="growSucculent">다육형</label>
              </div>
            </div>
            <!-- // 생육형태 -->
            <!-- 잎색 -->
            <div class="legend">잎색</div>
            <div class="form_group">
              <div class="check_btn">
                <input type="checkbox" id="leafGreen" name="leafColor" value="069001" />
                <label for="leafGreen"><i class="color_view green"></i>연두색, 녹색</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="lightYellow" name="leafColor" value="069002" />
                <label for="lightYellow"><i class="color_view yellow"></i>노란색, 금색</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="lightWhite" name="leafColor" value="069003" />
                <label for="lightWhite"><i class="color_view white"></i>흰색, 크림색</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="lightSilver" name="leafColor" value="069004" />
                <label for="lightSilver"><i class="color_view silver"></i>은색, 회색</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="lightRed" name="leafColor" value="069005" />
                <label for="lightRed"><i class="color_view red"></i>분홍, 빨강, 자주색</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="lightMix" name="leafColor" value="069006" />
                <label for="lightMix"><i class="color_view mix"></i>여러색 혼합</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="lightEct" name="leafColor" value="069007" />
                <label for="lightEct"><i class="color_view ect"></i>기타</label>
              </div>
            </div>
            <!-- // 잎색 -->
            <!-- 잎 무늬 -->
            <div class="legend">잎 무늬</div>
            <div class="form_group">
              <div class="check_btn">
                <input type="checkbox" id="patternStripes" name="leafPattern" value="070001" />
                <label for="patternStripes">줄무늬</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="patternDot" name="leafPattern" value="070002" />
                <label for="patternDot">점무늬</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="patternEdge" name="leafPattern" value="070003" />
                <label for="patternEdge">잎 가장자리 무늬</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="patternEct" name="leafPattern" value="070004" />
                <label for="patternEct">기타 (무늬없음 등)</label>
              </div>
            </div>
            <!-- // 잎 무늬 -->
            <!-- 꽃색 -->
            <div class="legend">꽃색</div>
            <div class="form_group">
              <div class="check_btn">
                <input type="checkbox" id="flower" name="flowerColor" value="069001" />
                <label for="leafGreen"><i class="color_view blue"></i>파랑색</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="flower" name="flowerColor" value="069001" />
                <label for="leafGreen"><i class="color_view green"></i>보라색</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="flower" name="flowerColor" value="069001" />
                <label for="leafGreen"><i class="color_view green"></i>분홍색</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="flower" name="flowerColor" value="069001" />
                <label for="leafGreen"><i class="color_view green"></i>빨강색</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="flower" name="flowerColor" value="069001" />
                <label for="leafGreen"><i class="color_view green"></i>오렌지색</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="flower" name="flowerColor" value="069001" />
                <label for="leafGreen"><i class="color_view green"></i>노랑색</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="flower" name="flowerColor" value="069001" />
                <label for="leafGreen"><i class="color_view green"></i></label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="flower" name="flowerColor" value="069001" />
                <label for="leafGreen"><i class="color_view green"></i></label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="flower" name="flowerColor" value="069001" />
                <label for="leafGreen"><i class="color_view green"></i></label>
              </div>
            </div>
            <!-- // 꽃색 -->
          </div>
        </div>
      </form>

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
// const { isLoading, execute } = useAsyncState(
//   () =>
//     getIndoorList({
//       currentPage: indoorCurrentPage.value,
//       currentPageSize: pageSize.value,
//       searchWord: indoorKeyword.value
//     }),
//   null,
//   {
//     throwError: true,
//     onSuccess: (result) => {
//       if (result?.length === 0 || result === null) {
//         isNoData.value = true
//       } else {
//         isNoData.value = false
//         plantItems.value = result

//         if (result) {
//           total.value = result[0].total
//         }
//       }
//     }
//   }
// )

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
