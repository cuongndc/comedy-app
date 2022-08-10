<script lang="ts" setup>
import { onMounted, watchEffect } from 'vue'
import { onClickOutside, set } from '@vueuse/core'
import { TRUYEN_CHU_CHAPTER } from '~/contants'
import { navigateTo, useLazyFetch, useState } from '#app'
import type { Chapter, ReadPage } from '~/types'

const route = useRoute()
const params = route.params

const chapterSlug = ref(params.chapter_slug)
const novelInfo = useState('novelInfo')

const chapters = useState<Chapter[]>('chapters')
const shouldShowControl = ref(true)

const settingFont = ref(false)
const fontDefault = ref(15)

const chapterListEL = ref(null)
const shouldShowChapterList = ref(false)
onClickOutside(chapterListEL, event => set(shouldShowChapterList, false))

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
        novelId: readPage.value?.novel._id,
      },
    })
    set(chapters, novelInfo.value?.chapters)
  }
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

const readQuickly = (slug: string) => {
  return navigateTo(`/${TRUYEN_CHU_CHAPTER}/${slug}}`)
}

const handleChapter = async (action: 'next' | 'prev') => {
  const chapterNum = readPage.value?.chapter.chapterNum
  if (action === 'next') {
    const nextC = chapterNum + 1
    const next = chapters.value.find((chap: Chapter) => chap.chapterNum === nextC)

    navigateTo({
      path: `/${TRUYEN_CHU_CHAPTER}/${next.slug}/${next._id}`,
      replace: true,
    })
  }

  if (action === 'prev') {
    const prevC = chapterNum - 1
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
        {{ readPage.novel?.name }} | Chương {{ readPage?.chapter.chapterNum }}
      </Title>
    </Head>
    <div class="relative flex h-fit flex-1 text-white">
      <div class="h-fit min-h-screen w-full bg-[#f8f3e6] text-black" @click.prevent="handleControl">
        <div :class="{ 'top-0': shouldShowControl }" class="ease-in-out duration-300 fixed top-[-70px] left-0 z-[999] h-[44px] w-full">
          <div class="flex h-full w-full items-center justify-between text-lg md:text-2xl bg-black/40">
            <LazyNuxtLink :to="useNavigatorNovel(readPage.novel?.slug)" class="w-[30px] h-[30px] flex ml-4">
              <img src="/icons/novelChapterPage/icon-back.svg" alt="back">
            </LazyNuxtLink>
            <div class="flex align-center" @click.stop="shouldShowChapterList = true">
              <span class="text-2xl font-semibold text-white">
                Chương {{ readPage?.chapter.chapterNum }}
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
            <div class="flex align-center w-[30px]" @click.stop="handleChapter('prev')">
              <img src="/icons/novelChapterPage/icon-prev.svg" alt="setting">
            </div>
            <div class="flex align-center w-[30px] mr-3" @click.stop="handleChapter('next')">
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
        <div v-if="shouldShowChapterList" ref="chapterListEL" class="fixed z-[9999] bottom-0 w-full h-full h-[90%] bg-accent-4 overflow-auto scrollbar-hide">
          <div class="absolute w-full">
            <div class="rounded-l-2xl rounded-r-2xl px-5 py-5">
              <h3 class="text-white text-3xl">
                Chapters
              </h3>
            </div>
            <div v-for="chapter in chapters" :key="chapter._id" class="relative" style="border-bottom: 1px solid rgb(27, 28, 35)">
              <div class="px-5 py-5 cursor-pointe ">
                <a @click="readQuickly(chapter.slug)">
                  <h3 class="text-xl mb-4">
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
          </div>
        </div>

        <div>
          <h1 class="px-7 pt-[60px] font-[Literata] text-3xl">
            Chương {{ readPage?.chapter.chapterNum }}: {{ readPage?.chapter.chapterName ? readPage?.chapter.chapterName : '...' }}
          </h1>
          <div :style="{ 'font-size': `${fontDefault}px` }" class="px-7 pt-10  chapter-content font-[Literata]" v-html="readPage?.chapter.content" />
        </div>
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
