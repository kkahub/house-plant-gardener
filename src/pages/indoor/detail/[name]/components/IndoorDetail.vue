<template>
  <section class="wrap_indoor_detail">
    <div v-if="isLoading" class="inner con_loader">
      <div class="loader_inner">
        <div class="loader">로딩중...</div>
      </div>
    </div>
    <div v-else class="inner">
      <!-- 기본 정보 -->
      <div class="card_gallery">
        <ShortInfo :info="info" />
      </div>
      <!-- // 기본 정보 -->

      <!-- 상세정보 -->
      <div class="card_detail">
        <!-- 외형 v-if="isShow(info.growthAraInfo)-->
        <DetailsCard title="외형">
          <div class="card_content">
            <div class="info_item">
              <h4 class="sub_title">
                <span class="icon_wrap">
                  <span class="material-symbols-rounded">landscape</span>
                </span>
                크기
              </h4>
              <p class="desc">20 X 30 (cm)</p>
            </div>
            <div class="info_item">
              <h4 class="sub_title">
                <span class="icon_wrap">
                  <span class="material-symbols-rounded">landscape</span>
                </span>
                생장 모양
              </h4>
              <p class="desc">풀모양</p>
            </div>
            <div class="info_item">
              <h4 class="sub_title">
                <span class="icon_wrap">
                  <span class="material-symbols-rounded">landscape</span>
                </span>
                잎 무늬
              </h4>
              <p class="desc">줄무늬</p>
            </div>
          </div>
        </DetailsCard>
        <!-- // 외형 -->

        <!-- 색깔 -->
        <DetailsCard title="색깔">
          <div class="card_content">
            <div class="info_item">
              <h4 class="sub_title">
                <span class="icon_wrap">
                  <span class="material-symbols-rounded">landscape</span>
                </span>
                잎 색깔
              </h4>
              <p class="desc">lefcolrCodeNm</p>
            </div>
            <div class="info_item">
              <h4 class="sub_title">
                <span class="icon_wrap">
                  <span class="material-symbols-rounded">landscape</span>
                </span>
                잎 형태
              </h4>
              <p class="desc">넓쩍</p>
            </div>
          </div>
        </DetailsCard>
        <!-- // 색깔 -->

        <!-- 특성 -->
        <DetailsCard title="특성">
          <div class="card_content">
            <div class="info_item">
              <h4 class="sub_title">
                <span class="icon_wrap">
                  <span class="material-symbols-rounded">landscape</span>
                </span>
                냄새 강도
              </h4>
              <p class="desc">강함</p>
            </div>
            <div class="info_item">
              <h4 class="sub_title">
                <span class="icon_wrap">
                  <span class="material-symbols-rounded">landscape</span>
                </span>
                독성
              </h4>
              <p class="desc">수액이 인체의 피부나 점막을 자극할 수 있다.</p>
            </div>
          </div>
        </DetailsCard>
        <!-- // 특성 -->

        <!-- 생육정보 -->
        <DetailsCard title="생육정보">
          <div class="card_content">
            <div class="info_item">
              <h4 class="sub_title">
                <span class="icon_wrap">
                  <span class="material-symbols-rounded">landscape</span>
                </span>
                생장속도
              </h4>
              <p class="desc">빠름</p>
            </div>
            <div class="info_item">
              <h4 class="sub_title">
                <span class="icon_wrap">
                  <span class="material-symbols-rounded">landscape</span>
                </span>
                요구 광도
              </h4>
              <div class="scope_bar trisector">
                <!-- v-if="lighttdemanddoCode === 055001"  *여러 개일 수 있음-->
                <div class="scope_tooltip first">낮은 광도(300~800 Lux)</div>
                <div class="scope_tooltip second">중간 광도(800~1,500 Lux)</div>
                <div class="scope_tooltip third">높은 광도(1,500~10,000 Lux)</div>
              </div>
            </div>
            <div class="info_item">
              <h4 class="sub_title">
                <span class="icon_wrap">
                  <span class="material-symbols-rounded">landscape</span>
                </span>
                생육온도
              </h4>
              <div class="scope_bar quarter">
                <!-- v-if="grwhTpCode === 082001" -->
                <div class="scope_tooltip first">10~15℃</div>
                <!-- v-if="082002" -->
                <div class="scope_tooltip second">16~20℃</div>
                <div class="scope_tooltip third">21~25℃</div>
                <div class="scope_tooltip fourth">26~30℃</div>
              </div>
            </div>
            <div class="info_item">
              <h4 class="sub_title">
                <span class="icon_wrap">
                  <span class="material-symbols-rounded">landscape</span>
                </span>
                습도
              </h4>
              <div class="scope_bar trisector">
                <!-- v-if="hdCode === 083001" -->
                <div class="scope_tooltip first">40% 미만</div>
                <div class="scope_tooltip second">40 ~ 70%</div>
                <div class="scope_tooltip third">70% 이상</div>
              </div>
            </div>
            <div class="info_item">
              <h4 class="sub_title">
                <span class="icon_wrap">
                  <span class="material-symbols-rounded">landscape</span>
                </span>
                생장 모양
              </h4>
              <p class="desc">풀모양</p>
            </div>
          </div>
        </DetailsCard>
        <!-- 생육정보 -->

        <!-- 난이도 -->
        <DetailsCard title="생육정보">
          <div class="card_content">
            <div class="info_item">
              <h4 class="sub_title">
                <span class="icon_wrap">
                  <span class="material-symbols-rounded">landscape</span>
                </span>
                난이도
              </h4>
              <div v-if="info.managelevelCode === '089001'" class="desc">
                <span class="star_level">
                  <font-awesome-icon :icon="['fas', 'star']" />
                  <font-awesome-icon :icon="['far', 'star']" />
                  <font-awesome-icon :icon="['far', 'star']" />
                </span>
                초보자
              </div>
              <div v-else-if="info.managelevelCode === '089002'" class="desc">
                <span class="star_level">
                  <font-awesome-icon :icon="['fas', 'star']" />
                  <font-awesome-icon :icon="['fas', 'star']" />
                  <font-awesome-icon :icon="['far', 'star']" />
                </span>
                경험자
              </div>
              <div v-else-if="info.managelevelCode === '089003'" class="desc">
                <span class="star_level">
                  <font-awesome-icon :icon="['fas', 'star']" />
                  <font-awesome-icon :icon="['fas', 'star']" />
                  <font-awesome-icon :icon="['fas', 'star']" />
                </span>
                전문가
              </div>
            </div>
            <div class="info_item">
              <h4 class="sub_title">
                <span class="icon_wrap">
                  <span class="material-symbols-rounded">landscape</span>
                </span>
                관리 수준
              </h4>
              <p class="desc">managedemanddoCodeNm 낮음 잘견딤</p>
            </div>
          </div>
        </DetailsCard>
        <!-- //난이도 -->
      </div>
      <!-- // 상세정보 -->
      <div class="btn_group right">
        <router-link to="/guide" class="btn btn_dark">목록으로</router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getIndoorBasic, getIndoorDetail } from '@/services/indoor'
import { useAsyncState } from '@vueuse/core'
import { useIsShow } from '@/composables/useIsShow'
import { useBookmark } from '@/composables/useBookmark'
import { useNote } from '@/composables/useNote'
import DetailsCard from '@/components/base/DetailsCard.vue'
import ShortInfo from '@/pages/components/indoor/detail/ShortInfo.vue'

const route = useRoute()
const router = useRouter()

const params = String(route.params.name).split('-')
const name = ref(params[0])
const code = ref(params[1])
const info = ref()
const { isShow } = useIsShow()

// 실내식물정보 데이터 가져오기
const { isLoading } = useAsyncState(() => getIndoorBasic(name.value, code.value), null, {
  throwError: true,
  onSuccess: (result) => {
    console.log(result)
    if (result === null) {
      alert('잘못된 접근입니다.')
      router.go(-1)
    } else {
      info.value = result
    }
  }
})
</script>

<style scoped></style>
