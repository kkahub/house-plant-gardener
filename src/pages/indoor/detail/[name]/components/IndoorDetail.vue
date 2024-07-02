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
        <BasicCard title="외형">
          <Outline :info="info" />
        </BasicCard>
        <!-- // 외형 -->

        <!-- 난이도 -->
        <BasicCard
          title="난이도"
          v-if="isShow(info.managelevelCode) || isShow(info.managedemanddoCodeNm)"
        >
          <LevelDifficulty :info="info" />
        </BasicCard>
        <!-- // 난이도 -->

        <!-- 특성 -->
        <BasicCard title="특성" v-if="isShow(info.smellCodeNm) && isShow(info.toxctyInfo)">
          <IndoorCharacter :info="info" />
        </BasicCard>
        <!-- // 특성 -->
      </div>

      <div class="card_detail">
        <!-- 잎 정보 -->
        <BasicCard
          title="잎"
          v-if="isShow(info.lefcolrCodeNm) || isShow(info.lefStleInfo) || isShow(info.lefmrkCodeNm)"
        >
          <LeafInfo :info="info" />
        </BasicCard>
        <!-- // 잎 정보 -->

        <!-- 꽃과 열매 -->
        <BasicCard
          title="꽃과 열매"
          v-if="
            isShow(info.flclrCodeNm) ||
            isShow(info.ignSeasonCodeNm) ||
            isShow(info.fmldeSeasonCodeNm) ||
            isShow(info.fmldecolrCodeNm)
          "
        >
          <FlowerNFruit :info="info" />
        </BasicCard>
        <!-- // 꽃과 열매 -->
      </div>

      <div class="card_detail">
        <!-- 재배조건 -->
        <DetailsCard
          title="재배조건"
          v-if="
            isShow(info.flclrCodeNm) ||
            isShow(info.ignSeasonCodeNm) ||
            isShow(info.fmldeSeasonCodeNm) ||
            isShow(info.fmldecolrCodeNm)
          "
        >
          <GrowCondition :info="info" />
        </DetailsCard>
        <!-- 재배조건 -->
      </div>
      <div class="card_detail">
        <!-- 재배관리 -->
        <DetailsCard
          title="재배관리"
          v-if="isShow(info.grwhTpCode) || isShow(info.soilInfo) || isShow(info.frtlzrInfo)"
        >
          <GrowManage :info="info" />
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
import Outline from '@/pages/components/indoor/detail/Outline.vue'
import LevelDifficulty from '@/pages/components/indoor/detail/LevelDifficulty.vue'
import IndoorCharacter from '@/pages/components/indoor/detail/IndoorCharacter.vue'
import LeafInfo from '@/pages/components/indoor/detail/LeafInfo.vue'
import FlowerNFruit from '@/pages/components/indoor/detail/FlowerNFruit.vue'
import GrowCondition from '@/pages/components/indoor/detail/GrowCondition.vue'
import GrowManage from '@/pages/components/indoor/detail/GrowManage.vue'

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
