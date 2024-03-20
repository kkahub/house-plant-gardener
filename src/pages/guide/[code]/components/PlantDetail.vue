<template>
  <section class="wrap_detail">
    <div class="inner">
      <div class="card_gallery">
        <div class="wrap_img">
          <img
            v-if="info?.imgUrl !== 'NONE'"
            :src="info?.imgUrl"
            :alt="info?.familyKorNm + ' 사진'"
          />
          <div v-else class="no_img">
            <div class="msg">
              <font-awesome-icon :icon="['fas', 'seedling']" />
              도감에 등록된 이미지가 없습니다.
            </div>
          </div>
        </div>
        <!-- 기본 정보 -->
        <div class="short_info">
          <div class="wrap_name">
            <h2 class="name_info">
              {{ info?.plantGnrlNm }}<br />
              <span class="original_name">{{ info?.plantSpecsScnm }}</span>
            </h2>
            <div class="wrap_btn">
              <button type="button"><font-awesome-icon :icon="['far', 'heart']" /></button>
              <button type="button"><font-awesome-icon :icon="['far', 'bookmark']" /></button>
            </div>
          </div>
          <div class="short_line">
            <h3 class="short_title">분류</h3>
            <div class="desc">
              {{ info?.familyKorNm }} {{ info?.genusKorNm }}<br />
              {{ info?.familyNm }} {{ info?.genusNm }}
            </div>
          </div>
          <div v-if="isShow(info?.orplcNm)" class="short_line">
            <h3 class="short_title">원산지</h3>
            <div class="desc">{{ info?.orplcNm }}</div>
          </div>
          <div v-if="isShow(info?.dstrb)" class="short_line">
            <h3 class="short_title">국내 분포</h3>
            <div class="desc">{{ info?.dstrb }}</div>
          </div>
          <div v-if="isShow(info?.osDstrb)" class="short_line">
            <h3 class="short_title">해외분포</h3>
            <div class="desc">{{ info?.osDstrb }}</div>
            <p class="notice_copy">* {{ info?.cprtCtnt }}</p>
          </div>
        </div>
        <!-- // 기본 정보 -->
      </div>
      <div class="card_detail">
        <!-- 재배 정보 -->
        <DetailsCard summary="재배 정보">
          <Growing
            v-if="
              isShow(info?.grwEvrntDesc) ||
              isShow(info?.rrngType) ||
              isShow(info?.farmSpftDesc) ||
              isShow(info?.brdMthdDesc)
            "
            :grow-condition="info?.grwEvrntDesc"
            :annual="info?.rrngType"
            :grow-special="info?.farmSpftDesc"
            :breeding="info?.brdMthdDesc"
          />
        </DetailsCard>
        <!-- // 재배 정보 -->
        <!-- 외형 -->
        <DetailsCard summary="외형">
          <Features
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
        <DetailsCard summary="특징">
          <Signature
            v-if="isShow(info?.spft) || isShow(info?.useMthdDesc) || isShow(info?.note)"
            :special="info?.spft"
            :use="info?.useMthdDesc"
            :note="info?.note"
          />
        </DetailsCard>
        <!-- // 특징 -->
        <!-- 유사식물 -->
        <DetailsCard summary="유사식물">
          <Similar v-if="isShow(info?.smlrPlntDesc)" :similar-plant="info?.smlrPlntDesc" />
        </DetailsCard>
        <!-- //유사식물 -->
      </div>
      <router-link to="/" class="btn btn_dark">목록으로</router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getPlantDetail } from '@/service/guide'
import { useAsyncState } from '@vueuse/core'
import { useIsShow } from '@/composables/useIsShow'
import DetailsCard from '@/components/base/DetailsCard.vue'
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
