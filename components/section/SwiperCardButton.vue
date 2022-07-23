<script setup lang="ts">
import useMangaDetailPagePath from '~/composables/useMangaDetailPagePath';
import useFirstPathChapter from "~/composables/useFirstPathChapter";
import {navigateTo} from "#imports";
import {PropType} from 'vue';
import {Manga} from '~/types';

defineProps({
  spotlight: Object as PropType<Manga | undefined>
})

const navigateToManga = async (spotlight) => {
  if (!spotlight) return;
  const path = await useFirstPathChapter(spotlight, '');
  return navigateTo({
    path: path
  })
}

</script>

<template>
  <div class="flex space-x-6 text-xl md:text-2xl lg:pt-6">
    <button @click="navigateToManga(spotlight)"
            class="absolute-center rounded-xl bg-primary py-3 px-5 transition-all hover:scale-110 md:w-[100px]">
      Đọc ngay
    </button>
    <LazyNuxtLink :to="useMangaDetailPagePath(spotlight?.slug)">
      <button
          class="absolute-center rounded-xl bg-white py-3 px-5 text-gray-800 transition-all hover:scale-110 md:w-[100px]">
        Chi tiết
      </button>
    </LazyNuxtLink>
  </div>

</template>