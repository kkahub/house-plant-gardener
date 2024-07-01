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
        <!-- 외형 v-if="isShow(info.growthAraInfo && info.growthHgInfo)-->
        <BasicCard title="외형" part="trisector">
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
              <p class="desc">풀모양 grwhstleCodeNm</p>
            </div>
          </div>
        </BasicCard>
        <!-- // 외형 -->

        <!-- 난이도 -->
        <BasicCard title="난이도" part="trisector">
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
        </BasicCard>
        <!-- // 난이도 -->

        <!-- 특성 -->
        <BasicCard title="특성" part="trisector">
          <div class="card_content">
            <div class="info_item">
              <h4 class="sub_title">
                <span class="icon_wrap">
                  <span class="material-symbols-rounded">landscape</span>
                </span>
                향기 강도
              </h4>
              <p class="desc">{{ info.smellCodeNm }}</p>
            </div>
            <div class="info_item">
              <h4 class="sub_title">
                <span class="icon_wrap">
                  <span class="material-symbols-rounded">landscape</span>
                </span>
                독성
              </h4>
              <p class="desc">toxctyInfo 수액이 인체의 피부나 점막을 자극할 수 있다.</p>
            </div>
          </div>
        </BasicCard>
        <!-- // 특성 -->

        <!-- 잎 정보 -->
        <BasicCard title="잎" part="half">
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
              <p class="desc">넓쩍 lefStleInfo</p>
            </div>
            <div class="info_item">
              <h4 class="sub_title">
                <span class="icon_wrap">
                  <span class="material-symbols-rounded">landscape</span>
                </span>
                잎 무늬
              </h4>
              <p class="desc">기타 (무늬없음 등) lefmrkCodeNm</p>
            </div>
          </div>
        </BasicCard>
        <!-- // 잎 정보 -->

        <!-- 꽃과 열매 -->
        <BasicCard title="꽃과 열매" part="half">
          <div class="card_content">
            <div class="info_item">
              <h4 class="sub_title">
                <span class="icon_wrap">
                  <span class="material-symbols-rounded">landscape</span>
                </span>
                꽃 색깔
              </h4>
              <p class="desc">flclrCodeNm code 따로 없어 콤마로 잘라 가공 필요</p>
            </div>
            <div class="info_item">
              <h4 class="sub_title">
                <span class="icon_wrap">
                  <span class="material-symbols-rounded">landscape</span>
                </span>
                개화 시기
              </h4>
              <p class="desc">ignSeasonCodeNm</p>
            </div>
            <div class="info_item">
              <h4 class="sub_title">
                <span class="icon_wrap">
                  <span class="material-symbols-rounded">landscape</span>
                </span>
                열매 시기
              </h4>
              <p class="desc">fmldeSeasonCodeNm</p>
            </div>
            <div class="info_item">
              <h4 class="sub_title">
                <span class="icon_wrap">
                  <span class="material-symbols-rounded">landscape</span>
                </span>
                열매색
              </h4>
              <p class="desc">fmldecolrCodeNm</p>
            </div>
          </div>
        </BasicCard>
        <!-- // 꽃과 열매 -->

        <!-- 재배조건 -->
        <DetailsCard title="재배조건">
          <div class="card_content">
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
                물주기
              </h4>
              <div class="thumnail_desc">
                <ol>
                  <li>
                    <p class="season">
                      <span class="spring">봄</span>
                      <!-- v-if="watercycleSprngCode === 053001"-->
                      <i class="water_view water_1"></i>
                      <i class="water_view water_2"></i>
                      <i class="water_view water_3"></i>
                      <i class="water_view water_4"></i>
                      <span class="desc">watercycleSprngCodeNm</span>
                    </p>
                  </li>
                  <li>
                    <p class="season">
                      <span class="summer">여름</span>
                      <!-- v-if="watercycleSummerCode === 053001"-->
                      <i class="water_view water_1"></i>
                      <i class="water_view water_2"></i>
                      <i class="water_view water_3"></i>
                      <i class="water_view water_4"></i>
                      <span class="desc">watercycleSummerCodeNm</span>
                    </p>
                  </li>
                  <li>
                    <p class="season">
                      <span class="summer">가을</span>
                      <!-- v-if="watercycleAutumnCode === 053001"-->
                      <i class="water_view water_1"></i>
                      <i class="water_view water_2"></i>
                      <i class="water_view water_3"></i>
                      <i class="water_view water_4"></i>
                      <span class="desc">watercycleAutumnCodeNm</span>
                    </p>
                  </li>
                  <li>
                    <p class="season">
                      <span class="summer">겨울</span>
                      <!-- v-if="watercycleWinterCode === 053001"-->
                      <i class="water_view water_1"></i>
                      <i class="water_view water_2"></i>
                      <i class="water_view water_3"></i>
                      <i class="water_view water_4"></i>
                      <span class="desc">watercycleWinterCodeNm</span>
                    </p>
                  </li>
                </ol>
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
                겨울 최저 온도
              </h4>
              <div class="scope_bar quarter">
                <!-- v-if="winterLwetTpCode === 057001" -->
                <div class="scope_tooltip first">0℃ 이하</div>
                <!-- v-if="057002" -->
                <div class="scope_tooltip second">5℃</div>
                <div class="scope_tooltip third">7℃</div>
                <div class="scope_tooltip fourth">10℃</div>
                <div class="scope_tooltip fifth">13℃ 이상</div>
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
                토양정보
              </h4>
              <p class="desc">soilInfo</p>
            </div>
            <div class="info_item">
              <h4 class="sub_title">
                <span class="icon_wrap">
                  <span class="material-symbols-rounded">landscape</span>
                </span>
                비료
              </h4>
              <p class="desc">frtlzrInfo</p>
            </div>
          </div>
        </DetailsCard>
        <!-- 재배조건 -->

        <!-- 재배관리 -->
        <DetailsCard title="재배관리">
          <div class="card_content">
            <div class="info_item">
              <h4 class="sub_title">
                <span class="icon_wrap">
                  <span class="material-symbols-rounded">landscape</span>
                </span>
                생태
              </h4>
              <p class="desc">eclgyCodeNm (일반형 => 토양재배, 수경형 => 수경재배)</p>
            </div>
            <div class="info_item">
              <h4 class="sub_title">
                <span class="icon_wrap">
                  <span class="material-symbols-rounded">landscape</span>
                </span>
                병충해
              </h4>
              <p class="desc">dlthtsCodeNm</p>
            </div>
            <div class="info_item">
              <h4 class="sub_title">
                <span class="icon_wrap">
                  <span class="material-symbols-rounded">landscape</span>
                </span>
                병충해 관리
              </h4>
              <p class="desc">dlthtsManageInfo</p>
            </div>
            <div class="info_item">
              <h4 class="sub_title">
                <span class="icon_wrap">
                  <span class="material-symbols-rounded">landscape</span>
                </span>
                생장속도
              </h4>
              <p class="desc">빠름 grwtveCodeNm</p>
            </div>
            <div class="info_item">
              <h4 class="sub_title">
                <span class="icon_wrap">
                  <span class="material-symbols-rounded">landscape</span>
                </span>
                배치장소
              </h4>
              <p class="desc">postngplaceCodeNm</p>
            </div>
            <div class="info_item">
              <h4 class="sub_title">
                <span class="icon_wrap">
                  <span class="material-symbols-rounded">landscape</span>
                </span>
                번식방법
              </h4>
              <p class="desc">prpgtmthCodeNm</p>
            </div>
            <div class="info_item">
              <h4 class="sub_title">
                <span class="icon_wrap">
                  <span class="material-symbols-rounded">landscape</span>
                </span>
                번식시기
              </h4>
              <p class="desc">prpgtEraInfo</p>
            </div>
            <div class="info_item">
              <h4 class="sub_title">
                <span class="icon_wrap">
                  <span class="material-symbols-rounded">landscape</span>
                </span>
                특별관리정보
              </h4>
              <p class="desc">speclmanageInfo</p>
            </div>
            <div class="info_item">
              <h4 class="sub_title">
                <span class="icon_wrap">
                  <span class="material-symbols-rounded">landscape</span>
                </span>
                그외 정보
              </h4>
              <p class="desc">조언 : adviseInfo</p>
              <p class="desc">특별시기 : etcEraInfo</p>
            </div>
          </div>
        </DetailsCard>
        <!-- // 재배관리 -->
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
import BasicCard from '@/components/base/BasicCard.vue'
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
