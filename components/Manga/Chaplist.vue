<script lang="ts" setup>
import {PropType} from "vue";
import {Chapter} from '~/types';

defineProps({
  slug: String,
  chapterList: Object as PropType<Chapter[]>
})

const navigateToManga = async (chapterNumber: string, chapterId: string, slug: string) => {
  const path = await useReadComic(chapterNumber, chapterId, slug);

  return navigateTo({
    path: path
  })
}
</script>

<template>
  <div class="list-chapter overflow-auto" style="height: calc(100vh - 400px)">
    <ul>
      <li class="flex items-center justify-between py-3 grid grid-cols-1 chapter_list-detail"
          v-for="(chap, cI) in chapterList">
        <div v-if="cI >= 0">
          <div class="chapter">
            <a class="text-xl text-white font-bold" @click="navigateToManga(chap.chapterNumber, chap.chapterId, slug)">
              Chương {{ chap.chapterNumber }}</a>
          </div>
          <div class="flex justify-between items-center">
            <div class="text-primary-gray text-base">{{ chap.updatedAt }}</div>
            <div class="text-primary-gray text-base flex items-center">
              <SvgViewChapter class="w-5 h-5 mb-1" />
              {{ chap.view }}
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>

</template>