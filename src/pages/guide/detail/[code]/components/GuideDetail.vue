<template>
  <section class="wrap_detail">
    <div v-if="isLoading" class="inner con_loader">
      <div class="loader_inner">
        <div class="loader">로딩중...</div>
      </div>
    </div>
    <div v-else class="inner">
      <!-- 기본 정보 -->
      <div class="card_gallery">
        <ShortInfo
          :code="code"
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
          :toggle-bookmark="toggleBookmark"
          :is-bookmark="isBookmark"
          :toggle-note="toggleNote"
          :is-note="isNote"
          :is-note-view="isNoteView"
          :is-edit-note="isEditNote"
        />
      </div>
      <!-- // 기본 정보 -->
      <!-- 노트 -->
      <ShortNote
        :is-bookmark="isBookmark"
        :is-note="isNote"
        :is-note-view="isNoteView"
        :is-edit-note="isEditNote"
        :note-save="noteSave"
        :edit-note="editNote"
        :prev-note="prevNote"
        :note-remove="noteRemove"
        v-model:note-content="noteContent"
      />
      <!-- // 노트 -->
      <!-- 상세 정보 -->
      <div class="card_detail">
        <!-- 재배 정보 -->
        <DetailsCard
          title="재배 정보"
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
          title="외형"
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
          title="특징"
          v-if="isShow(info?.spft) || isShow(info?.useMthdDesc) || isShow(info?.note)"
        >
          <Signature :special="info?.spft" :use="info?.useMthdDesc" :note="info?.note" />
        </DetailsCard>
        <!-- // 특징 -->
        <!-- 유사식물 -->
        <DetailsCard title="유사식물" v-if="isShow(info?.smlrPlntDesc)">
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
import { useRoute, useRouter } from 'vue-router'
import { getGuideDetail } from '@/services/guide'
import { useAsyncState } from '@vueuse/core'
import { useIsShow } from '@/composables/useIsShow'
import { useBookmark } from '@/composables/useBookmark'
import { useNote } from '@/composables/useNote'
import DetailsCard from '@/components/base/DetailsCard.vue'
import ShortNote from '@/pages/components/guide/details/ShortNote.vue'
import ShortInfo from '@/pages/components/guide/details/ShortInfo.vue'
import Growing from '@/pages/components/guide/details/Growing.vue'
import Features from '@/pages/components/guide/details/Features.vue'
import Signature from '@/pages/components/guide/details/Signature.vue'
import Similar from '@/pages/components/guide/details/Similar.vue'

const info = ref()
const route = useRoute()
const router = useRouter()
const code = ref(String(route.params.code))
const prevNote = ref('')
const { isShow } = useIsShow()

const { isLoading } = useAsyncState(() => getGuideDetail(code.value), null, {
  onSuccess: (result) => {
    if (result === undefined) {
      alert('잘못된 접근입니다.')
      router.go(-1)
    } else {
      info.value = result
    }
  }
})

// 북마크 컴포저블
const { toggleBookmark, isBookmark } = useBookmark(code.value)

// 메모 컴포저블
const { toggleNote, isNote, isNoteView, isEditNote, noteSave, noteContent, noteRemove } = useNote(
  code.value
)

// 노트 작성 모드
const editNote = () => {
  isEditNote.value = true
  prevNote.value = noteContent.value
}
</script>

<style scoped></style>
