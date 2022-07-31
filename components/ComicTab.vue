<script setup lang="ts">
import { computed } from 'vue'
import type { Comic } from '~/types'
import ComicsRelated from '~/components/ComicsRelated.vue'
import ChapterRepresent from '~/components/ChapterRepresent.vue'

const { comic } = defineProps({
  comic: Object as () => Comic,
})
const tags = computed(() => {
  return comic.tags.map((tag: any) => tag.slug)
})
</script>

<template>
  <div class="relative bg-dark-gray">
    <!--      <div class="content flex items-center"> -->
    <!--        <div class="w-[24px] max-w-[100%]"> -->
    <!--          <div style="position: relative; padding-bottom: 100%;"> -->
    <!--            <img src="/icons/comicPage/icon-promote.png"> -->
    <!--          </div> -->
    <!--        </div> -->
    <!--        <span>Top 1 nữ cường bá đạo</span> -->
    <!--      </div> -->
    <div class="px-6 h-auto relative overflow-hidden pt-6">
      <div class="content mb-4">
        <p class="text-xl text-white whitespace-pre-line">
          {{ comic?.description }}
        </p>
      </div>
    </div>
    <div class="scrollbar-hide overflow-auto whitespace-nowrap p-4" style="display: -webkit-box">
      <a v-for="tag in comic.tags" :key="tag._id" class="inline-block py-1 px-4 mr-2 text-xl rounded-xl bg-accent-5" href="#"># {{ tag.name }}</a>
    </div>
    <ChapterRepresent :represent-data="comic.chaptersRepresentData" />
    <ComicsRelated :tags="tags" />
  </div>
</template>
