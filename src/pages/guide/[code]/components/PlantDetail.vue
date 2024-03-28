<template>
  <section class="wrap_detail">
    <div class="inner">
      <!-- 기본 정보 -->
      <div class="card_gallery">
        <ShortInfo
          :img-src="info?.imgUrl"
          :img-alt="info?.familyKorNm"
          :name="info?.plantGnrlNm"
          :scientific-name="info?.plantSpecsScnm"
          :family-kr="info?.familyKorNm"
          :genus-kr="info?.genusKorNm"
          :family="info?.familyNm"
          :genus="info?.genusNm"
          :origin="info?.orplcNm"
          :spread-kr="info?.dstrb"
          :spread="info?.osDstrb"
          :copy="info?.cprtCtnt"
        />
      </div>
      <!-- // 기본 정보 -->

      <!-- 상세 정보 -->
      <div class="card_detail">
        <!-- 재배 정보 -->
        <DetailsCard
          summary="재배 정보"
          v-if="
            isShow(info?.grwEvrntDesc) ||
            isShow(info?.rrngType) ||
            isShow(info?.farmSpftDesc) ||
            isShow(info?.brdMthdDesc)
          "
        >
          <Growing
            :grow-condition="info?.grwEvrntDesc"
            :annual="info?.rrngType"
            :grow-special="info?.farmSpftDesc"
            :breeding="info?.brdMthdDesc"
          />
        </DetailsCard>
        <!-- // 재배 정보 -->
        <!-- 외형 -->
        <DetailsCard
          summary="외형"
          v-if="
            isShow(info?.shpe) ||
            isShow(info?.leafDesc) ||
            isShow(info?.flwrDesc) ||
            isShow(info?.fritDesc) ||
            isShow(info?.stemDesc) ||
            isShow(info?.rootDesc) ||
            isShow(info?.sz) ||
            isShow(info?.sporeDesc)
          "
        >
          <Features
            :shape="info?.shpe"
            :leaf="info?.leafDesc"
            :flower="info?.flwrDesc"
            :fruit="info?.fritDesc"
            :stem="info?.stemDesc"
            :root="info?.rootDesc"
            :size="info?.sz"
            :spore="info?.sporeDesc"
          />
        </DetailsCard>
        <!-- // 외형 -->
        <!-- 특징 -->
        <DetailsCard
          summary="특징"
          v-if="isShow(info?.spft) || isShow(info?.useMthdDesc) || isShow(info?.note)"
        >
          <Signature :special="info?.spft" :use="info?.useMthdDesc" :note="info?.note" />
        </DetailsCard>
        <!-- // 특징 -->
        <!-- 유사식물 -->
        <DetailsCard summary="유사식물" v-if="isShow(info?.smlrPlntDesc)">
          <Similar :similar-plant="info?.smlrPlntDesc" />
        </DetailsCard>
        <!-- //유사식물 -->
      </div>
      <!-- // 상세 정보 -->
      <div class="btn_group right">
        <router-link to="/guide" class="btn btn_dark">목록으로</router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getPlantDetail } from '@/services/guide'
import { useAsyncState } from '@vueuse/core'
import { useIsShow } from '@/composables/useIsShow'
import DetailsCard from '@/components/base/DetailsCard.vue'
import ShortInfo from '@/pages/components/details/ShortInfo.vue'
import Growing from '@/pages/components/details/Growing.vue'
import Features from '@/pages/components/details/Features.vue'
import Signature from '@/pages/components/details/Signature.vue'
import Similar from '@/pages/components/details/Similar.vue'

const info = ref()
const route = useRoute()
const { isShow } = useIsShow()

const { error } = useAsyncState(() => getPlantDetail(route.params.code), null, {
  onSuccess: (result) => {
    info.value = result
  }
})
</script>

<style scoped></style>
