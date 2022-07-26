<script lang="ts" setup>
import { isClient, useStorage } from '@vueuse/core'

import {
  ArrowLeftIcon,
  ArrowNarrowLeftIcon,
  ArrowRightIcon,
} from '@heroicons/vue/solid'
import { onMounted, onUnmounted, watchEffect } from 'vue'
import { keys } from '~/types'
import { MANGA_PATH_NAME, MANGA_PATH_READ_NAME } from '~/contants'

const route = useRoute()
const router = useRouter()
const params = route.params

const chapterID = ref(params.id)
const chapterNumber = ref(params.chapter)
const realSlug = params.slug.slice(0, params.slug.lastIndexOf('-'))

const {
  pending,
  data: chapters,
  refresh,
} = await useFetch('/api/chapters', {
  params: {
    slug: realSlug,
    chapter: chapterNumber.value,
    id: chapterID.value,
  },
})

const manga: any = await useStorage(keys.comicCacheLocalPreview, {
  serializer: {
    read: (v: any) => v ? JSON.parse(v) : null,
    write: (v: any) => JSON.stringify(v),
  },
})

const visitedComics: any = useStorage(keys.visitedComics, {
  serializer: {
    read: (v: any) => v ? JSON.parse(v) : null,
    write: (v: any) => JSON.stringify(v),
  },
})

const scrollToTop = () => {
  if (isClient)
    window.scrollTo(0, 0)
}

const handleChapter = async (action: string) => {
  let stt = manga.value.chapterList.findIndex(chapter => chapter.chapterNumber === params.chapter)
  const visited = visitedComics.value.find(visited => visited.slug === manga.value.slug)

  if (action === 'next') {
    if (!manga.value.chapterList[--stt])
      return

    const [cNum, cID] = [
      manga.value.chapterList[stt].chapterNumber,
      manga.value.chapterList[stt].chapterId,
    ]

    if (visited) {
      visited.chapterNumber = cNum
      visited.chapterId = cID
    }

    chapterID.value = cID
    chapterNumber.value = cNum

    router.replace(
        `/${MANGA_PATH_NAME}/${MANGA_PATH_READ_NAME}/${params.slug}/${cNum}/${cID}`,
    )
  }

  if (action === 'prev') {
    if (!manga.value.chapterList[++stt])
      return

    const [cNum, cID] = [
      manga.value.chapterList[stt].chapterNumber,
      manga.value.chapterList[stt].chapterId,
    ]

    if (visited) {
      visited.chapterNumber = cNum
      visited.chapterId = cID
    }

    chapterNumber.value = cNum
    chapterID.value = cID

    router.replace(
        `/${MANGA_PATH_NAME}/${MANGA_PATH_READ_NAME}/${params.slug}/${cNum}/${cID}`,
    )
  }

  await refresh()
  scrollToTop()
}

const scrollComponent = ref(null)
const handleScroll = () => {
  const element = scrollComponent.value
  if (!element)
    return
  if (element.getBoundingClientRect().bottom - 10 < window.innerHeight) {
    setTimeout(() => {
      handleChapter('next')
    }, 1500)
  }
}

onMounted(() => {
  if (isClient)
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  if (isClient)
    window.removeEventListener('scroll', handleScroll)
})

const handleNextProcess = (action: string) => {
  handleChapter(action)
}

watchEffect(() => {
  refresh()
})

useHead({
  title: `${manga.value.title ? manga.value.title : manga.value.name} | Chapter ${chapterNumber.value}`,
  description: manga.value?.review,
})
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
    <div class="relative flex h-fit flex-1 text-white">
      <div class="h-fit min-h-screen w-full bg-black">
        <div class="fixed top-0 left-0 z-[999] h-[60px] w-full">
          <div class="flex h-full w-full items-center justify-between text-lg md:text-2xl bg-accent-1">
            <div class="flex h-full w-fit items-center justify-evenly gap-4 px-4 md:space-x-4">
              <LazyNuxtLink :to="useNavigatorComicPreview(params.slug)" class="flex">
                <button>
                  <ArrowNarrowLeftIcon class="h-9 w-9" />
                </button>
              </LazyNuxtLink>
              <h1 class="fond-bold h-fit w-[25%] capitalize line-clamp-1 md:w-[30%]">
                {{ manga.title ? manga.title : manga.name }}
              </h1>
              <button
                class="h-[60%] w-fit max-w-[80px] whitespace-nowrap rounded-xl bg-highlight p-2 text-base line-clamp-1 md:text-lg"
              >
                Chapter: {{ chapterNumber }}
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
        <LazyMangaChapterImg :chapters="chapters.data" />
        <LazyMangaReadMangaFooter @next-process="handleNextProcess" />
      </div>
    </div>
  </div>
</template>
