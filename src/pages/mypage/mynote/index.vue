<template>
  <section class="wrap_mynote">
    <div class="inner">
      <div class="page_header">
        <div class="title_wrap">
          <h2 class="page_title">마이페이지</h2>
        </div>
      </div>
      <div class="sidebar_layout mypage_wrap">
        <Sidebar />
        <div class="sidebar_content mypage_inner">
          <h3 class="content_title">내 노트</h3>
          <div class="guide_list_wrap">
            <div v-if="isLoading" class="guide_list_loading">
              <div class="loader_inner">
                <div class="loader">로딩중...</div>
              </div>
            </div>
            <div v-else>
              <div v-if="!isNoData" class="guide_list_inner">
                <GuideList :plant-items="plantItems" />
              </div>
              <div v-else class="no_data">노트를 작성한 식물도감이 없습니다.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAsyncState } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { usePageStore } from '@/stores/pagination'
import { getNoteID, getBookmarkList } from '@/services/guide'
import Sidebar from '@/layouts/mypage/Sidebar.vue'
import GuideList from '@/components/apps/guide/GuideList.vue'
import type { NoteList } from '@/types/guide'

const guidePageStore = usePageStore()
const { keyword, currentPage } = storeToRefs(guidePageStore)

const plantItems = ref()
const isNoData = ref(false)
const pageSize = ref(16)
const userNote = ref()
const total = ref(0)

// 노트한 식물 ID 가져오기
useAsyncState(getNoteID, [], {
  throwError: true,
  onSuccess: (result) => {
    if (result?.length === 0 || result === null) {
      isNoData.value = true
    } else {
      isNoData.value = false
      userNote.value = result
    }
  }
})

watch(userNote, () => {
  keyword.value = userNote.value.map((item: NoteList) => item.plantId)
  executePage()
})

// 식물도감정보 데이터 가져오기
const { isLoading, execute } = useAsyncState(
  () =>
    getBookmarkList({
      currentPage: currentPage.value,
      currentPageSize: pageSize.value,
      searchWord: keyword.value
    }),
  null,
  {
    immediate: false,
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
</script>

<style scoped></style>
