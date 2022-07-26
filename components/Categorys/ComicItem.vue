<script setup lang="ts">
import type { PropType } from 'vue'
import type { IManga } from '~/types'

defineProps({
  mangas: Object as PropType<IManga[]>,
})
</script>

<template>
  <div v-for="manga in mangas" :key="manga.slug">
    <NuxtLink class="flex items-center p-4" :to="useNavigatorComicPreview(manga.slug)">
      <div class="relative">
        <SharedImg
          loading="lazy"
          class="rounded-2xl w-[125px] h-[168px] object-cover"
          :src="manga.thumbnail"
          fil="fill"
        />
        <div class="absolute bottom-0 bg-deep-black h-[30px] w-full rounded-b-xl opacity-80" />
        <div
          class="absolute bottom-0 w-full text-xl font-semibold text-white h-[30px] flex items-center justify-center "
        >
          <a>{{ manga.newChapter }}</a>
        </div>
      </div>
      <div class="px-5 h-[168px]" style="width: calc(100% - 102px)">
        <h3 class="text-1xl font-semibold line-clamp-1 mb-1">
          <NuxtLink :to="useNavigatorComicPreview(manga.slug)">
            {{ manga.name }}
          </NuxtLink>
        </h3>
        <p class="text-primary-gray mb-3 text-base">
          {{ manga.newChapter }}
        </p>
        <p class="text-primary-gray text-xl">
          Lượt xem: {{ manga.view }}
        </p>
        <p class="text-primary-gray text-xl mt-4">
          Cập nhật cuối: {{ manga.updatedAt }}
        </p>
      </div>
    </NuxtLink>
  </div>
</template>
