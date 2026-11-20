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
                <Pagination
                  v-if="totalPage > 1"
                  :page-array="pageArray"
                  :start-page="startPage"
                  :current-page="currentPage"
                  :prev-page="prevPage"
                  :next-page="nextPage"
                  :get-page="getPage"
                  :is-prev="isPrev"
                  :is-next="isNext"
                  path="/mypage/mynote?page="
                />
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
import { getNoteID } from '@/services/guide'
import { useMypageList } from '@/composables/useMypageList'
import Sidebar from '@/layouts/mypage/Sidebar.vue'
import GuideList from '@/components/apps/guide/GuideList.vue'
import Pagination from '@/components/pagination/Pagination.vue'

const {
  plantItems,
  isNoData,
  isLoading,
  currentPage,
  pageArray,
  prevPage,
  nextPage,
  getPage,
  totalPage,
  startPage,
  isPrev,
  isNext
} = useMypageList(getNoteID)
</script>

<style scoped></style>
