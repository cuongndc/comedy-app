<script setup lang="ts">
import type { PropType } from 'vue'
import { navigateTo } from '#imports'
import type { Manga } from '~/types'

defineProps({
  spotlight: Object as PropType<Manga | undefined>,
})

const navigateToManga = async (spotlight) => {
  if (!spotlight)
    return
  const path = await useReadFirstComic(spotlight, '')
  return navigateTo({
    path,
  })
}
</script>

<template>
  <div class="flex space-x-6 text-xl md:text-2xl lg:pt-6">
    <button
      class="absolute-center rounded-xl bg-primary py-3 px-5 transition-all hover:scale-110 md:w-[100px]"
      @click="navigateToManga(spotlight)"
    >
      Đọc ngay
    </button>
    <LazyNuxtLink :to="useNavigatorComicPreview(spotlight?.slug)">
      <button
        class="absolute-center rounded-xl bg-white py-3 px-5 text-gray-800 transition-all hover:scale-110 md:w-[100px]"
      >
        Chi tiết
      </button>
    </LazyNuxtLink>
  </div>
</template>
