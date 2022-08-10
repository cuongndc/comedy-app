<script setup lang="ts">
import { computed, onMounted, watchEffect } from 'vue'
import { isClient } from '@vueuse/core'
import { convertUnit } from '~/common'
import { navigateTo, useFetch, useRuntimeConfig, useState } from '#app'
import type { Chapter, Comic } from '~/types'
import { COMIC_STATUS, TRUYEN_CHU_CHAPTER, comicTabs } from '~/contants'
import ComicChapterTab from '~/components/comics/ComicChapterTab.vue'
import ComicTab from '~/components/comics/ComicTab.vue'
import { definePageMeta } from '#imports'

definePageMeta({
  pageTransition: {
    name: 'out-in',
    css: false,
  },
})

const route = useRoute()
const params = route.params
const slug = ref(params.slug)
const tab = ref<string>('comic')
const chapters = useState<Chapter[]>('chapters')
const runtimeConfig = useRuntimeConfig()

const {
  data: comic,
  pending,
  refresh,
} = await useFetch<Comic>(`/api/novel/${slug.value}`)

onMounted(async () => {
  if (!comic.value)
    return
  chapters.value = await $fetch('/api/novel/chapters', {
    params: {
      novelId: comic.value._id,
    },
  })
})

watchEffect(async () => {
  if (isClient)
    window.scrollTo({ top: 0, behavior: 'smooth' })

  await refresh()
})

const comicTab = computed(() => {
  return tab.value === comicTabs.comic
})

const chapterTab = computed(() => {
  return tab.value === comicTabs.chapter
})

const reviewTab = computed(() => {
  return tab.value === comicTabs.review
})

const setTab = (T: string) => {
  tab.value = T
}

const startRead = () => {
  if (chapters.value && chapters.value.length > 0)
    return navigateTo(`/${TRUYEN_CHU_CHAPTER}/${chapters.value[0]?.slug}/${chapters.value[0]?._id}`)

  return ''
}

const backgroundImage = (image) => {
  return {
    backgroundImage: `url(${runtimeConfig.public.imgCDN}${image})`,
  }
}
</script>

<template>
  <section>
    <div
      :style="backgroundImage(comic?.verticalLogo)"
      class="flex items-center justify-between h-[50px] z-10 fixed top-0 w-full overflow-hidden bg-cover"
    >
      <NuxtLink class="ml-4" @click="$router.back()">
        <img src="/icons/comicPage/icon-back.svg" alt="back">
      </NuxtLink>
      <div class="flex items-center bg-deep-black/50 h-[30px] rounded-2xl px-3 mr-4">
        <img class="mr-2" src="/icons/comicPage/icon-report.svg" alt="report">
        <span class="text-white text-2xl">Báo cáo</span>
      </div>
    </div>
    <div class="fixed top-0 w-full max-w-[768px]">
      <LazySharedMeeToonImg
        class="relative w-full"
        :src="comic?.verticalLogo"
      />
    </div>
    <div class="relative mt-[150px]">
      <div class="px-5" style="background: linear-gradient(rgba(17, 18, 23, 0) 0%, rgba(17, 18, 23, 0.5) 33.85%, rgba(17, 18, 23, 0.8) 68.75%, rgb(17, 18, 23) 100%)">
        <div class="bg-contain p-6 bg-comic flex items-center justify-between rounded-xl" style="background-image: url(/icons/comicPage/backgroundInfo.png)">
          <div class="left">
            <div>
              <h1 class="text-ellipsis line-clamp-1 text-3xl font-bold text-white">
                {{ comic?.name }}
              </h1>
            </div>
            <div class="flex flex-wrap">
              <div
                class="my-4 flex items-center justify-center rounded-xl text-[#1fcf84] border-[#1fcf84] text-base border-[1px] h-[20px] w-[80px]"
              >
                {{ COMIC_STATUS[comic?.novelStatus] }}
              </div>
              <div class="mx-4 my-4 flex items-center text-gray-50 text-base">
                <img
                  src="/icons/comicPage/icon-view-count.svg" alt="view count"
                >
                <span class="ml-1">{{ convertUnit(comic?.viewCount) }}</span>
              </div>
              <div class="mx-4 my-4 flex items-center text-gray-50 text-base">
                <img
                  class="w-[18px] h-[18px]"
                  src="/icons/comicPage/icon-follow-count.svg" alt="follow count"
                >
                <span class="ml-1">{{ convertUnit(comic?.followingCount) }}</span>
              </div>
              <div class="flex items-center text-base text-gray-50">
                <img
                  src="/icons/comicPage/icon-comment-count.svg" alt="comment count"
                >
                <span class="ml-1">{{ convertUnit(comic?.totalComment) }}</span>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="w-[80px] text-center cursor-pointer">
              <p class="text-yellow-400 text-4xl">
                5
              </p>
              <div class="flex items-center justify-center">
                <img v-for="i of 5" :key="i" src="/icons/comicPage/icon-star.svg" alt="rating">
              </div>
              <div>
                <span class="text-white text-xl">{{ comic?.reviewCount }} Đánh giá</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-footer-comic_page px-3 fixed bottom-0 w-full h-[60px] max-w-[768px] flex items-center z-50">
      <div class="cursor-pointer">
        <img
          src="/icons/comicPage/icon-share.svg"
          alt="Chia sẻ"
        >
      </div>
      <div class="ml-6 cursor-pointer">
        <img
          src="/icons/comicPage/icon-follow.svg"
          alt="Theo dõi"
        >
      </div>
      <a class="comic-read" @click="startRead">
        Bắt đầu đọc
      </a>
    </div>
    <div class="relative bg-accent-4">
      <div class="whitespace-nowrap overflow-x-auto border-b-[1px solid rgb(27, 28, 35)]">
        <div :class="{ active: comicTab }" class="eKaTWX inline-block" @click="setTab(comicTabs.comic)">
          <span>Giới thiệu</span>
        </div>
        <div :class="{ active: chapterTab }" class="eKaTWX" @click="setTab(comicTabs.chapter)">
          <a>Chapters ({{ chapters?.length ? chapters?.length : 0 }})</a>
        </div>
        <div :class="{ active: reviewTab }" class="eKaTWX" @click="setTab(comicTabs.review)">
          <a>Đánh giá</a>
        </div>
      </div>
    </div>
    <ComicTab v-if="comicTab" :comic="comic" />
    <ComicChapterTab v-if="chapterTab" :chapters="chapters" />
  </section>
</template>

<style scoped lang="scss">
.eKaTWX {
  display: inline-block;
}

.eKaTWX.active a, .eKaTWX.active span {
  font-weight: 600;
  color: rgb(31, 207, 132);
}

.eKaTWX a, .eKaTWX span {
  display: block;
  position: relative;
  margin: 0px 15px;
  padding: 14px 0px;
  font-size: 17px;
  font-weight: 400;
  line-height: 22px;
  color: rgb(218, 218, 218);
}

.eKaTWX.active a::after, .eKaTWX.active span::after {
  content: "";
  display: block;
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 3px;
  background: rgb(31, 207, 132);
  border-radius: 3px 3px 0px 0px;
}

.eKaTWX {
  display: inline-block;
}

.eKaTWX a, .eKaTWX span {
  display: block;
  position: relative;
  margin: 0px 15px;
  padding: 14px 0px;
  font-size: 17px;
  font-weight: 400;
  line-height: 22px;
  color: rgb(218, 218, 218);
}
</style>
