<script setup lang="ts">
import type { Chapter } from '~/types'
import { convertUnit } from '~/common'
import { navigateTo } from '#app'
import { TRUYEN_TRANH_CHAPTER } from '~/contants'

defineProps({
  chapters: Array as () => Chapter[],
})
const readQuickly = (slug: string, _id: string) => {
  return navigateTo(`/${TRUYEN_TRANH_CHAPTER}/${slug}/${_id}`)
}
</script>

<template>
  <div v-for="chapter in chapters" :key="chapter._id" class="relative bg-accent-4" style="border-bottom: 1px solid rgb(27, 28, 35)">
    <div class="px-5 py-5 cursor-pointe ">
      <a @click="readQuickly(chapter.slug, chapter._id)">
        <h3 class="text-2xl mb-4">
          <b>
            Chương {{ chapter.chapterNum }}
          </b>
        </h3>
        <div class="flex">
          <p class="mr-8 text-primary-gray text-2xl flex items-center">
            {{ new Date(chapter.createdAt).toLocaleDateString() }}
          </p>
          <div class="mr-[17px] flex items-center justify-center text-2xl">
            <img class="mr-2" src="/icons/chapterItem/icon-view.svg" alt="view">
            <span class="text-primary-gray">
              {{ chapter.totalView ? convertUnit(chapter.totalView) : 0 }}
            </span>
          </div>
          <div class="mr-8 flex items-center justify-center text-2xl">
            <img class="mr-2" src="/icons/chapterItem/icon-like.svg" alt="like">
            <span class="text-primary-gray">
              {{ chapter.totalLike ? convertUnit(chapter.totalLike) : 0 }}
            </span>
          </div>
          <div class="flex items-center justify-center mr-4 text-2xl">
            <img class="mr-2" src="/icons/chapterItem/icon-comment.svg" alt="comment">
            <span class="text-primary-gray">
              {{ chapter.totalComment ? convertUnit(chapter.totalComment) : 0 }}
            </span>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
