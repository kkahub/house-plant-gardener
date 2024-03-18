<template>
  <section class="wrap_detail">
    <div class="inner">
      <div class="card_gallery">
        <div class="wrap_img">
          <img :src="info?.imgUrl" :alt="info?.familyKorNm + ' 사진'" />
        </div>
        <!-- 기본 정보 -->
        <div class="short_info">
          <h2 class="name_info">
            {{ info?.plantGnrlNm }}<br />
            <span class="original_name">{{ info?.plantSpecsScnm }}</span>
          </h2>
          <table class="explain_table">
            <caption>
              식물 기본 정보
            </caption>
            <tbody>
              <tr>
                <th>분류</th>
                <td>
                  {{ info?.familyKorNm }} {{ info?.genusKorNm }}<br />
                  {{ info?.familyNm }} {{ info?.genusNm }}
                </td>
              </tr>
              <tr v-if="isShow(info?.orplcNm)">
                <th>원산지</th>
                <td>{{ info?.orplcNm }}</td>
              </tr>
              <tr v-if="isShow(info?.dstrb)">
                <th>국내 분포</th>
                <td>{{ info?.dstrb }}</td>
              </tr>
              <tr v-if="isShow(info?.osDstrb)">
                <th>해외분포</th>
                <td>{{ info?.osDstrb }}</td>
              </tr>
            </tbody>
          </table>
          <p class="notice_copy">* {{ info?.cprtCtnt }}</p>
        </div>
        <!-- // 기본 정보 -->
      </div>
      <div class="card_detail">
        <!-- 재배 정보 -->
        <div class="card detail_info">
          <h3 class="content_title">재배 정보</h3>
          <div class="info_item" v-if="isShow(info?.grwEvrntDesc)">
            <h4 class="sub_title">생육환경</h4>
            <p class="desc">{{ info?.grwEvrntDesc }}</p>
          </div>
          <div class="info_item" v-if="isShow(info?.rrngType)">
            <h4 class="sub_title">생육형</h4>
            <p class="desc">{{ info?.rrngType }}</p>
          </div>
          <div class="info_item" v-if="isShow(info?.farmSpftDesc)">
            <h4 class="sub_title">재배특성</h4>
            <p class="desc">{{ info?.farmSpftDesc }}</p>
          </div>
          <div class="info_item" v-if="isShow(info?.brdMthdDesc)">
            <h4 class="sub_title">번식방법</h4>
            <p class="desc">{{ info?.brdMthdDesc }}</p>
          </div>
        </div>
        <!-- // 재배 정보 -->
        <!-- 외형 -->
        <div class="card detail_info">
          <h3 class="content_title">외형</h3>
          <div class="info_item" v-if="isShow(info?.shpe)">
            <h4 class="sub_title">형태</h4>
            <p class="desc">{{ info?.shpe }}</p>
          </div>
          <div class="info_item" v-if="isShow(info?.leafDesc)">
            <h4 class="sub_title">잎</h4>
            <p class="desc">{{ info?.leafDesc }}</p>
          </div>
          <div class="info_item" v-if="isShow(info?.flwrDesc)">
            <h4 class="sub_title">꽃</h4>
            <p class="desc">{{ info?.flwrDesc }}</p>
          </div>
          <div class="info_item" v-if="isShow(info?.fritDesc)">
            <h4 class="sub_title">열매</h4>
            <p class="desc">{{ info?.fritDesc }}</p>
          </div>
          <div class="info_item" v-if="isShow(info?.stemDesc)">
            <h4 class="sub_title">줄기</h4>
            <p class="desc">{{ info?.stemDesc }}</p>
          </div>
          <div class="info_item" v-if="isShow(info?.rootDesc)">
            <h4 class="sub_title">뿌리</h4>
            <p class="desc">{{ info?.rootDesc }}</p>
          </div>
          <div class="info_item" v-if="isShow(info?.sz)">
            <h4 class="sub_title">크기</h4>
            <p class="desc">{{ info?.sz }}</p>
          </div>
          <div class="info_item" v-if="isShow(info?.sporeDesc)">
            <h4 class="sub_title">포자</h4>
            <p class="desc">{{ info?.sporeDesc }}</p>
          </div>
        </div>
        <!-- // 외형 -->
        <!-- 특징 -->
        <div class="card detail_info">
          <h3 class="content_title">특징</h3>
          <div class="info_item" v-if="isShow(info?.spft)">
            <h4 class="sub_title">특징</h4>
            <p class="desc">{{ info?.spft }}</p>
          </div>
          <div class="info_item" v-if="isShow(info?.note)">
            <h4 class="sub_title">노트</h4>
            <p class="desc">{{ info?.note }}</p>
          </div>
          <div class="info_item" v-if="isShow(info?.useMthdDesc)">
            <h4 class="sub_title">사용법</h4>
            <p class="desc">{{ info?.useMthdDesc }}</p>
          </div>
        </div>
        <!-- // 특징 -->
        <!-- 유사식물 -->
        <div class="card detail_info">
          <h3 class="content_title">유사식물</h3>
          <div class="info_item" v-if="isShow(info?.smlrPlntDesc)">
            <h4 class="sub_title">유사식물설명</h4>
            <p class="desc">{{ info?.smlrPlntDesc }}</p>
          </div>
        </div>
        <!-- //유사식물 -->
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getPlantDetail } from '@/service/guide'
import { useAsyncState } from '@vueuse/core'

const info = ref()
const route = useRoute()

const { error } = useAsyncState(() => getPlantDetail(route.params.code), null, {
  onSuccess: (result) => {
    info.value = result
  }
})

const isShow = (val: string) => val !== ' ' && val !== ''
</script>

<style scoped></style>
