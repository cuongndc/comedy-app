<script lang="ts" setup>
import {
  ArrowLeftIcon,
  ArrowNarrowLeftIcon,
  ArrowRightIcon,
} from '@heroicons/vue/solid'
import { onMounted, onUnmounted, watchEffect } from 'vue'
import { TRUYEN_TRANH_CHAPTER } from '~/contants'
import { useFetch, useLazyFetch, useState } from '#app'

const route = useRoute()
const router = useRouter()
const params = route.params

const slug = ref(params.slug)
const _id = ref(params._id)
const chapters = useState('chapters')

const {
  pending,
  data: response,
  refresh,
} = useLazyFetch('/api/read-comic', {
  params: {
    slug: slug.value,
    _id: _id.value,
  },
})
onMounted(async () => {
  chapters.value = await $fetch('/api/chapters', {
    params: {
      comic_id: response.value.comic._id,
      comic_slug: response.value.comic.slug,
    },
  })
})

watchEffect(() => {
  // refresh()
})

const handleChapter = async (action: 'next' | 'prev') => {
  const cuChapterNumber = response.value.chapterOrderIndex
  if (action === 'next') {
    const nextChapter = chapters.value.data.find(chapter => chapter.chapterOrderIndex === cuChapterNumber + 1)
    router.replace(`/${TRUYEN_TRANH_CHAPTER}/${nextChapter.slug}/${nextChapter._id}`)

    await refresh()
  }

  if (action === 'prev') {
    const nextChapter = chapters.value.data.find(chapter => chapter.chapterOrderIndex === cuChapterNumber - 1)
    router.replace(`/${TRUYEN_TRANH_CHAPTER}/${nextChapter.slug}/${nextChapter._id}`)

    await refresh()
  }
}
const handleNextProcess = (action: 'next' | 'prev') => {
  handleChapter(action)
}

useHead({
  title: `${response.value?.comicName} | ${response.value?.chapterName} - Chapter ${response.value?.chapterNum}`,
  description: response.value?.chapterName,
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
              <LazyNuxtLink :to="useNavigatorComicPreview(response.comic.slug, response.comic._id)" class="flex">
                <button>
                  <ArrowNarrowLeftIcon class="h-9 w-9" />
                </button>
              </LazyNuxtLink>
              <h1 class="fond-bold h-fit w-[25%] capitalize line-clamp-1 md:w-[30%]">
                {{ response.comicName }}
              </h1>
              <button
                class="h-[60%] w-fit max-w-[80px] whitespace-nowrap rounded-xl bg-highlight p-2 text-base line-clamp-1 md:text-lg"
              >
                Chapter: {{ response.chapterNum }}
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
          <LazyMangaChapterImg :pages="response.pages" />
        </ClientOnly>
        <LazyMangaReadMangaFooter @next-process="handleNextProcess" />
      </div>
    </div>
  </div>
</template>
