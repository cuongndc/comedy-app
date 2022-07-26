<script lang="ts" setup>
import type { PropType } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { IManga } from '~/types'
import { SWIPER_BREAK_POINTS } from '~/types'

defineProps({
  mangas: Array as PropType<IManga[]>,
})
</script>

<template>
  <ClientOnly>
    <Swiper
      :breakpoints="SWIPER_BREAK_POINTS"
    >
      <SwiperSlide v-for="manga in mangas" :key="manga.slug">
        <div class="duration-200 ease-in-out transition-all">
          <NuxtLink :to="useNavigatorComicPreview(manga.slug)">
            <SharedImg
              format="webp"
              loading="lazy"
              class="rounded-xl object-cover h-[139px] w-full"
              :src="manga.thumbnail"
              fil="fill"
            />
          </NuxtLink>
          <div class="h-[30px] flex flex-wrap">
            <h2 class="text-base line-clamp-1 mt-1 text-black font-semibold">
              {{ manga.name }}
            </h2>
            <a class="text-sm text-zinc-500">
              {{ manga.newChapter }}
            </a>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </ClientOnly>
</template>
