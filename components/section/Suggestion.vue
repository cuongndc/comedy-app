<script lang="ts" setup>
import useMangaDetailPagePath from '~/composables/useMangaDetailPagePath';
import {Manga} from '~/types';
import {ChevronRightIcon} from "@heroicons/vue/solid";

const {
  data: mangas,
  pending,
} = await useFetch<Manga[]>(`/api/manga-updated`);
const navigateToManga = async (chapterNumber: string, chapterId: string, slug: string) => {
  const path = await useChapter(chapterNumber, chapterId, slug);

  return navigateTo({
    path: path
  })
}
</script>

<template>
  <div class="w-full rounded-xl pb-4 lg:my-4 col-span-3" v-if="!pending">
    <NuxtLink to="/filter?view=newComic"
              class="items-center	justify-start font-secondary h-[40px] flex mx-3 page-title custom-title">
      Cập nhật truyện mới
      <ChevronRightIcon class="h-8 w-8"/>
    </NuxtLink>
    <ul class="w-full text-white grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 items">
      <li class="flex px-3 py-1 w-full inline-grid mb-4 item" v-for="manga in mangas" :key="manga.slug">
        <LazyNuxtLink :to="useMangaDetailPagePath(manga.slug)">
          <figure
              class="duration-500 relative lg:h-full lg:w-full rounded-xl-md">
            <nuxt-img
                class="h-[240px] w-full"
                fil="fill"
                loading="lazy"
                :src="manga.thumbnail"
                format="webp">
            </nuxt-img>
          </figure>
        </LazyNuxtLink>
        <figcaption class="flex w-full flex-col justify-center mt-4">
          <h3
              class="mb-3 font-secondary text-2xl font-semibold transition-all line-clamp-1 hover:cursor-pointer hover:text-primary md:text-3xl chap-title">
            <a>
              {{ manga.name }}
            </a>
          </h3>
          <div class="flex align-center place-content-between mb-2 cursor-pointer chapter"
               v-for="chapSug in manga.chapSuggests">
            <a @click="navigateToManga(chapSug.chapNumber, chapSug.chapId, manga.slug)" :data-id="chapSug.chapNumber"
               :title="`Chapter ${chapSug.chapId}`" class="text-xl font-normal chap-title">Chapter {{
                chapSug.chapId
              }}</a>
            <div class="flex">
              <!-- <EyeIcon class="h-6 w-5 mr-2" style="margin-top: 1px" /> -->
              <h4 class="text-lg chap-title chapter">
                <i class="time">
                  {{ chapSug.updatedAt }}
                </i>
              </h4>
            </div>
          </div>
        </figcaption>
      </li>
      <li
          class="flex w-full items-center justify-center rounded-xl py-4 px-4 transition-all hover:cursor-pointer hover:bg-highlight">
        <button class="lg:text-3xl">
          <NuxtLink to="/filter?view=all">Xem thêm</NuxtLink>
        </button>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
             stroke="currentColor" aria-hidden="true" class="h-8 w-8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
        </svg>
      </li>
    </ul>
  </div>
</template>