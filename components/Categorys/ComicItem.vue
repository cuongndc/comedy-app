<script setup lang="ts">
import type { PropType } from 'vue'
import type { Comic } from '~/types'
import { convertUnit } from '~/common'
import useNavigatorComicPreview from '~/composables/useNavigatorComicPreview'
defineProps({
  comics: Object as PropType<Comic[]>,
})
</script>

<template>
  <div v-for="comic in comics" :key="comic.slug">
    <NuxtLink class="flex items-center p-4" :to="useNavigatorComicPreview(comic.slug, comic._id)">
      <div class="relative">
        <SharedMeeToonImg
          class="rounded-2xl w-[125px] h-[168px] object-cover"
          :src="comic.verticalLogo"
          fil="fill"
        />
        <div class="absolute bottom-0 bg-deep-black h-[30px] w-full rounded-b-xl opacity-80" />
        <div
          class="absolute bottom-0 w-full text-xl font-semibold text-white h-[30px] flex items-center justify-center"
        >
          <a>Chương {{ comic.newestChapter }}</a>
        </div>
      </div>
      <div class="px-5 h-[168px]" style="width: calc(100% - 102px)">
        <h3 class="text-1xl font-semibold line-clamp-1 mb-1">
          <NuxtLink :to="useNavigatorComicPreview(comic.slug, comic._id)">
            {{ comic.comicName }}
          </NuxtLink>
        </h3>
        <p class="text-primary-gray mb-3 text-base line-clamp-3">
          {{ comic.description }}
        </p>
        <p class="text-primary-gray text-xl">
          Lượt xem: {{ convertUnit(comic.viewCount) }}
        </p>
        <p class="text-primary-gray text-xl mt-4">
          Cập nhật cuối: {{ new Date(comic.updatedAt).toLocaleDateString('vi-VN') }}
        </p>
      </div>
    </NuxtLink>
  </div>
</template>
