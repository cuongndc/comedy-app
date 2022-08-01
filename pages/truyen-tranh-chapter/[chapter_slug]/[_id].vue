<script lang="ts" setup>
import { onMounted, watchEffect } from 'vue'
import { TRUYEN_TRANH_CHAPTER } from '~/contants'
import { navigateTo, useAsyncData, useLazyFetch, useState } from '#app'
import type { Chapter, ReadPage } from '~/types'

const route = useRoute()
const params = route.params

const chapterSlug = ref(params.chapter_slug)
const chapters = useState<Chapter[]>('chapters')

const {
  pending,
  data: readPage,
  refresh,
} = await useLazyFetch<ReadPage>('/api/read-comic', {
  params: {
    chapter_slug: chapterSlug.value,
  },
})

onMounted(async () => {
  chapters.value = await $fetch('/api/chapters', {
    params: {
      comic_slug: readPage.value.chapter.comicSlug,
    },
  })
})

watchEffect(() => {
  refresh()
})

const handleChapter = async (action: 'next' | 'prev') => {
  if (action === 'next') {
    const nextC = readPage.value.chapter.chapterOrderIndex + 1
    const next = chapters.value.find((chap: Chapter) => chap.chapterOrderIndex === nextC)

    navigateTo({
      path: `/${TRUYEN_TRANH_CHAPTER}/${next.slug}/${next._id}`,
      replace: true,
    })
  }

  if (action === 'prev') {
    const prevC = readPage.value.chapter.chapterOrderIndex - 1
    const prev = chapters.value.find((chap: Chapter) => chap.chapterOrderIndex === prevC)

    navigateTo({
      path: `/${TRUYEN_TRANH_CHAPTER}/${prev.slug}/${prev._id}`,
      replace: true,
    })
  }
}
const handleNextProcess = (action: 'next' | 'prev') => {
  handleChapter(action)
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
        {{ readPage.chapter?.chapterName }} | Chương {{ readPage.chapter?.chapterNum }}
      </Title>
    </Head>
    <div class="relative flex h-fit flex-1 text-white">
      <div class="h-fit min-h-screen w-full bg-black">
        <div class="fixed top-0 left-0 z-[999] h-[60px] w-full">
          <div class="flex h-full w-full items-center justify-between text-lg md:text-2xl bg-accent-1">
            <div class="flex h-full w-fit items-center justify-evenly gap-4 px-4 md:space-x-4">
              <LazyNuxtLink :to="useNavigatorComicPreview(readPage.chapter.comicSlug, readPage.chapter.comicId)" class="flex">
                <button>
                  <ArrowNarrowLeftIcon class="h-9 w-9" />
                </button>
              </LazyNuxtLink>
              <h1 class="fond-bold h-fit w-[25%] capitalize line-clamp-1 md:w-[30%]">
                {{ readPage.chapter?.chapterName }}
              </h1>
              <button
                class="h-[60%] w-fit max-w-[80px] whitespace-nowrap rounded-xl bg-highlight p-2 text-base line-clamp-1 md:text-lg"
              >
                Chapter: {{ readPage.chapter?.chapterNum }}
              </button>
              <div class="absolute-center h-full w-fit gap-4 md:mx-6">
                <button data-id="prev" class="rounded-xl-lg bg-highlight p-4 md:p-4" @click="handleChapter('prev')">
                  <ArrowLeftIcon class="h-7 w-7" />
                </button>
                <button data-id="next" class="rounded-xl-lg bg-highlight p-4 md:p-4" @click="handleChapter('next')">
                  <ArrowRightIcon class="w-8 h-7" />
                </button>
              </div>
            </div>
            <!--            <div class="flex h-full w-fit items-center pr-2 md:gap-10 md:px-4"> -->
            <!--            <button class="rounded-xl-lg bg-highlight p-2"> -->
            <!--              <CogIcon class="h8 w-8"/> -->
            <!--            </button> -->
            <!--          </div> -->
          </div>
        </div>
        <ClientOnly>
          <LazyMangaChapterImg :pages="readPage.pages" />
        </ClientOnly>
        <LazyMangaReadMangaFooter @next-process="handleNextProcess" />
      </div>
    </div>
  </div>
</template>
