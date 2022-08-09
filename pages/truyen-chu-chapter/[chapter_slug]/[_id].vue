<script lang="ts" setup>
import { onMounted, watchEffect } from 'vue'
import { set } from '@vueuse/core'
import { TRUYEN_CHU_CHAPTER } from '~/contants'
import { navigateTo, useLazyFetch, useState } from '#app'
import type { Chapter, ReadPage } from '~/types'

const route = useRoute()
const params = route.params

const chapterSlug = ref(params.chapter_slug)
const novelInfo = useState<ReadPage>('novelInfo')
const chapters = useState<Chapter[]>('chapters')
const novel = useState<Chapter[]>('novel')
const shouldShowControl = ref(true)
const settingFont = ref(false)
const fontDefault = ref(15)

const {
  pending,
  data: readPage,
  refresh,
} = await useLazyFetch<ReadPage>('/api/novel/read-novel', {
  params: {
    slug: chapterSlug.value,
  },
})

onMounted(async () => {
  if (!chapters.value) {
    novelInfo.value = await $fetch('/api/novel/information', {
      params: {
        novelId: readPage.value?.novelId,
      },
    })
  }

  set(chapters, novelInfo.value?.chapters)
  set(novel, novelInfo.value?.novel)
})

watchEffect(() => {
  refresh()
})

const downSize = () => {
  set(fontDefault, fontDefault.value - 1)
}

const upSize = () => {
  set(fontDefault, fontDefault.value + 1)
}

const resetDefault = () => {
  set(fontDefault, 15)
}

const handleControl = () => {
  set(shouldShowControl, !shouldShowControl.value)
  set(settingFont, false)
}

const handleChapter = async (action: 'next' | 'prev') => {
  if (action === 'next') {
    const nextC = readPage.value?.chapterNum + 1
    const next = chapters.value.find((chap: Chapter) => chap.chapterNum === nextC)

    navigateTo({
      path: `/${TRUYEN_CHU_CHAPTER}/${next.slug}/${next._id}`,
      replace: true,
    })
  }

  if (action === 'prev') {
    const prevC = readPage.value?.chapterNum - 1
    const prev = chapters.value.find((chap: Chapter) => chap.chapterNum === prevC)

    navigateTo({
      path: `/${TRUYEN_CHU_CHAPTER}/${prev.slug}/${prev._id}`,
      replace: true,
    })
  }
}
</script>

<template>
  <div v-if="pending">
    <CommonPageLoading />
  </div>
  <div
    v-else
    ref="scrollComponent"
    class="flex h-fit min-h-screen flex-col bg-black scrollbar-hide"
  >
    <Head>
      <Title>
        {{ novel?.name }} | Chương {{ readPage?.chapterNum }}
      </Title>
    </Head>
    <div class="relative flex h-fit flex-1 text-white" @click="handleControl">
      <div class="h-fit min-h-screen w-full bg-[#f8f3e6] text-black">
        <div :class="{ 'top-0': shouldShowControl }" class="ease-in-out duration-300 fixed top-[-70px] left-0 z-[999] h-[44px] w-full">
          <div class="flex h-full w-full items-center justify-between text-lg md:text-2xl bg-black/40">
            <LazyNuxtLink :to="useNavigatorNovel(novel?.slug)" class="w-[30px] h-[30px] flex ml-4">
              <img src="/icons/novelChapterPage/icon-back.svg" alt="back">
            </LazyNuxtLink>
            <div class="flex align-center">
              <span class="text-2xl font-semibold text-white">
                Chương {{ readPage?.chapterNum }}
              </span>
              <img src="/icons/novelChapterPage/icon-arrow-down.svg" alt="arrow down">
            </div>

            <div class="mr-4">
              <img src="/icons/novelChapterPage/icon-report.svg" alt="report">
            </div>
          </div>
        </div>
        <footer class="fixed bottom-[-70px] h-[70px] bg-black/40 backdrop-blur-xl w-full ease-in-out duration-300" :class="{ 'bottom-0': shouldShowControl }">
          <div v-show="!settingFont" class="flex justify-around h-full">
            <div class="flex align-center w-[30px] ml-3">
              <img src="/icons/novelChapterPage/icon-follow-footer-unactive.svg" alt="follow">
            </div>
            <div class="flex align-center w-[30px]">
              <img src="/icons/novelChapterPage/icon-comment.svg" alt="comment">
            </div>
            <div class="flex align-center w-[30px]">
              <img src="/icons/novelChapterPage/icon-share.svg" alt="share">
            </div>
            <div class="flex align-center w-[30px]" @click.stop="settingFont = true">
              <img src="/icons/novelChapterPage/icon-footer-setting.svg" alt="setting">
            </div>
            <div class="flex align-center w-[30px]" @click="handleChapter('prev')">
              <img src="/icons/novelChapterPage/icon-prev.svg" alt="setting">
            </div>
            <div class="flex align-center w-[30px] mr-3" @click="handleChapter('next')">
              <img src="/icons/novelChapterPage/icon-next.svg" alt="setting">
            </div>
          </div>
          <div v-show="settingFont" class="setting-font flex items-center justify-around h-full">
            <div class="flex items-center justify-center w-[95px] h-[30px] border-[1px] border-white rounded-2xl text-white text-center" @click.stop="downSize">
              A
            </div>
            <div class="flex items-center justify-center w-[95px] h-[30px] border-[1px] border-white rounded-2xl text-white text-center" @click.stop="upSize">
              A+
            </div>
            <div class="flex items-center justify-center w-[95px] h-[30px] border-[1px] border-white rounded-2xl text-white text-center" @click.stop="resetDefault">
              Mặc định
            </div>
          </div>
        </footer>
        <h1 class="px-7 pt-[60px] font-[Literata] text-3xl">
          Chương {{ readPage?.chapterNum }}: {{ readPage?.chapterName ? readPage?.chapterName : '...' }}
        </h1>
        <div :style="{ 'font-size': `${fontDefault}px` }" class="px-7 pt-10  chapter-content font-[Literata]" v-html="readPage?.content" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.chapter-content p {
  line-height: 130% !important;
  margin-bottom: 20px;
  margin-top: 20px;
}

.bottom-0 {
  bottom: 0 !important;
}

.top-0 {
  top: 0 !important;
}
</style>
