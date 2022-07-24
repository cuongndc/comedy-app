<script lang="ts" setup>
import {Manga} from "~/types";
import {Swiper, SwiperSlide} from 'swiper/vue';

const {data: mangas, pending} = useFetch<Manga[]>(`/api/manga-new`);
const SWIPER_BREAK_POINTS = {
  1: {
    slidesPerView: 4,
    spaceBetween: 2,
  },
  320: {
    slidesPerView: 3.4,
    spaceBetween: 10,
  },
  480: {
    slidesPerView: 4.4,
    spaceBetween: 10,
  },
  640: {
    slidesPerView: 5.4,
    spaceBetween: 20,
  },
  750: {
    slidesPerView: 6.4,
    spaceBetween: 20,
  },
  800: {
    slidesPerView: 7.4,
    spaceBetween: 20,
  },
};
</script>

<template>
  <div class="px-4 mb-4" v-if="!pending">
    <h2 class=" h-[20px] text-3xl font-bold flex justify-start items-center text-black mb-4">
      # Truyện mới cập nhật
    </h2>
    <ClientOnly>
      <Swiper :breakpoints="SWIPER_BREAK_POINTS">
        <SwiperSlide v-for="manga in mangas" :key="manga.slug">
          <div class="duration-200 ease-in-out transition-all">
            <NuxtLink :to="useMangaDetailPagePath(manga.slug)">
              <SharedImg loading="lazy" class="rounded-xl h-[130px] object-cover" :src="manga.thumbnail" fil="fill"/>
            </NuxtLink>
            <h2 class="text-base line-clamp-1 mt-1 text-black font-semibold">
              {{ manga.name }}
            </h2>
            <p class="text-sm text-zinc-500 line-clamp-1 font-secondary">
              <a class="text-sm font-secondary text-zinc-500 mr-1" v-for="genre in manga.genres">
                {{ genre }}
              </a>
            </p>
            <p class="text-sm text-zinc-500 line-clamp-1 font-secondary">
              <a class="text-sm font-secondary text-zinc-500 mr-1">
                {{ manga.newChapter }}
              </a>
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </ClientOnly>
  </div>
</template>