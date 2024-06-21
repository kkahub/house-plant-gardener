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
        <!-- 검색어 -->
        <div class="wrap_search">
          <div class="inner_search">
            <input v-model="keyword" type="text" placeholder="식물 이름으로 검색해주세요." />
            <button type="submit" class="btn_search">
              <span class="material-symbols-rounded">search</span>
            </button>
          </div>
          <button type="button" class="btn btn_line_light btn_search_detail on">
            상세 조건 <font-awesome-icon :icon="['fas', 'chevron-down']" />
          </button>
        </div>
        <!-- 검색어 -->
        <!-- 상세검색 -->
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
            <!-- 잎색 -->
            <div class="legend">잎색</div>
            <div class="form_group">
              <div class="check_btn">
                <input type="checkbox" id="leafGreen" name="leafColor" value="069001" />
                <label for="leafGreen">
                  <i class="color_view ygreen_green"></i>
                  연두색<span class="text_light">/</span>녹색
                </label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="lightYellow" name="leafColor" value="069002" />
                <label for="lightYellow">
                  <i class="color_view yellow_gold"></i>
                  노란색 <span class="text_light">/</span> 금색
                </label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="lightWhite" name="leafColor" value="069003" />
                <label for="lightWhite">
                  <i class="color_view white_cream"></i>
                  흰색 <span class="text_light">/</span> 크림색
                </label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="lightSilver" name="leafColor" value="069004" />
                <label for="lightSilver">
                  <i class="color_view silver_gray"></i>
                  은색 <span class="text_light">/</span> 회색
                </label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="lightRed" name="leafColor" value="069005" />
                <label for="lightRed">
                  <i class="color_view pink_red_wine"></i>
                  분홍 <span class="text_light">/</span> 빨강 <span class="text_light">/</span>
                  자주색
                </label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="lightMix" name="leafColor" value="069006" />
                <label for="lightMix"><i class="color_view mix"></i>혼합색</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="lightEct" name="leafColor" value="069007" />
                <label for="lightEct"><i class="color_view ect"></i>기타</label>
              </div>
            </div>
            <!-- // 잎색 -->
            <!-- 꽃색 -->
            <div class="legend">꽃색</div>
            <div class="form_group">
              <div class="check_btn">
                <input type="checkbox" id="flowerBlue" name="flowerColor" value="071001" />
                <label for="flowerBlue"><i class="color_view blue"></i>파랑색</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="flowerPurple" name="flowerColor" value="071002" />
                <label for="flowerPurple"><i class="color_view purple"></i>보라색</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="flowerPink" name="flowerColor" value="071003" />
                <label for="flowerPink"><i class="color_view pink"></i>분홍색</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="flowerRed" name="flowerColor" value="071004" />
                <label for="flowerRed"><i class="color_view red"></i>빨강색</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="flowerOrange" name="flowerColor" value="071005" />
                <label for="flowerOrange"><i class="color_view orange"></i>오렌지색</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="flowerYellow" name="flowerColor" value="071006" />
                <label for="flowerYellow"><i class="color_view yellow"></i>노랑색</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="flowerWhite" name="flowerColor" value="071007" />
                <label for="flowerWhite"><i class="color_view white"></i>흰색</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="flowerMix" name="flowerColor" value="071008" />
                <label for="flowerMix"><i class="color_view mix"></i>혼합색</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="flowerEct" name="flowerColor" value="071009" />
                <label for="flowerEct"><i class="color_view ect"></i>기타</label>
              </div>
            </div>
            <!-- // 꽃색 -->
            <!-- 열매색 -->
            <div class="legend">열매색</div>
            <div class="form_group">
              <div class="check_btn">
                <input type="checkbox" id="fruitBlue" name="fruitColor" value="081001" />
                <label for="fruitBlue"><i class="color_view blue"></i>파랑색</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="fruitPurple" name="fruitColor" value="081002" />
                <label for="fruitPurple"><i class="color_view purple"></i>보라색</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="fruitBlack" name="fruitColor" value="081003" />
                <label for="fruitBlack"><i class="color_view black"></i>검정색</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="fruitRed" name="fruitColor" value="081004" />
                <label for="fruitRed"><i class="color_view red"></i>빨강색</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="fruitOrange" name="fruitColor" value="081005" />
                <label for="fruitOrange"><i class="color_view orange"></i>오렌지색</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="fruitYellow" name="fruitColor" value="081006" />
                <label for="fruitYellow"><i class="color_view yellow"></i>노랑색</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="fruitWhite" name="fruitColor" value="081007" />
                <label for="fruitWhite"><i class="color_view white"></i>흰색</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="fruitMix" name="fruitColor" value="081008" />
                <label for="fruitMix"><i class="color_view mix"></i>혼합색</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="fruitEct" name="fruitColor" value="081009" />
                <label for="fruitEct"><i class="color_view ect"></i>기타</label>
              </div>
            </div>
            <!-- // 열매색 -->
            <!-- 꽃피는 계절 -->
            <div class="legend">꽃피는 계절</div>
            <div class="form_group">
              <div class="check_btn">
                <input type="checkbox" id="flowerSpring" name="flowering" value="073001" />
                <label for="flowerSpring">봄</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="flowerSummer" name="flowering" value="073002" />
                <label for="flowerSummer">여름</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="flowerFall" name="flowering" value="073003" />
                <label for="flowerFall">가을</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="flowerWinter" name="flowering" value="073004" />
                <label for="flowerWinter">겨울</label>
              </div>
            </div>
            <!-- // 꽃피는 계절 -->
            <!-- 최저온도 -->
            <div class="legend">최저온도</div>
            <div class="form_group">
              <div class="check_btn">
                <input type="checkbox" id="temp0" name="minTemp" value="057001" />
                <label for="temp0">~ 0 ℃</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="temp5" name="minTemp" value="057002" />
                <label for="temp5">5 ℃</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="temp7" name="minTemp" value="057003" />
                <label for="temp7">7 ℃</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="temp10" name="minTemp" value="057004" />
                <label for="temp10">10 ℃</label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="temp13" name="minTemp" value="057005" />
                <label for="temp13">13 ℃ ~</label>
              </div>
            </div>
            <!-- // 최저온도 -->
            <!-- 물주기 -->
            <div class="legend">물주기</div>
            <div class="form_group">
              <div class="check_btn">
                <input type="checkbox" id="waterCycle1" name="waterCycle" value="053001" />
                <label for="waterCycle1">
                  <i class="water_view water_1"></i>
                  축축하게 유지(물에 잠김)
                </label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="waterCycle2" name="waterCycle" value="053002" />
                <label for="waterCycle2">
                  <i class="water_view water_2"></i>
                  촉촉하게 유지(물에 잠기지 않도록 주의)
                </label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="waterCycle3" name="waterCycle" value="053003" />
                <label for="waterCycle3">
                  <i class="water_view water_3"></i>
                  흙 표면이 말랐을 때
                </label>
              </div>
              <div class="check_btn">
                <input type="checkbox" id="waterCycle4" name="waterCycle" value="053004" />
                <label for="waterCycle4">
                  <i class="water_view water_4"></i>
                  흙 대부분 말랐을 때
                </label>
              </div>
            </div>
            <!-- // 물주기 -->
          </div>
        </div>
        <!-- 상세검색 -->
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
            <IndoorList :plant-items="plantItems" />
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

const keyword = ref('')
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
