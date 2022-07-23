<script lang="ts" setup>
import useMangaDetailPagePath from '~/composables/useMangaDetailPagePath';
const { data: mangas, pending } = useLazyFetch(`/api/top-month`);

</script>

<template>
  <div class="px-3 mb-4 mt-8" v-if="!pending">
    <h2 class="flex h-[20px] text-2xl font-semibold  justify-start items-center text-black">
      🏆 BXH Hot
    </h2>

    <div class="rank-list">
      <ul class="overflow-hidden">
        <li class="p-4 flex w-full mt-3 rank_list-item bg-white relative shadow-[0_3px_20px_rgba(0,0,0,10%)]"
          v-for="(manga, mI) in mangas" :key="manga.slug">
          <LazyNuxtLink :to="useMangaDetailPagePath(manga.slug)" class="flex items-center">
            ️<span class="text-4xl mr-2 w-[25px]" v-if="mI == 0">🥇</span>
            ️<span class="text-4xl mr-2 w-[25px]" v-if="mI == 1">️🥈</span>
            ️<span class="text-4xl mr-2 w-[25px]" v-if="mI == 2">🥉</span>
            ️<span class="text-3xl mr-2 w-[25px] font-secondary flex items-center justify-center" v-if="mI > 2">️{{ mI +
              1
              }}</span>
            <figure class="relative">
              <span class="rounded-xl">
                <SharedImg class="h-[109px] w-[80px] w-full object-cover object-center rounded-xl" format="webp" loading="lazy"
                  fil="fill" :src="manga.thumbnail" sizes="sm:100vw md:100vw lg:100vw" />
              </span>
            </figure>
          </LazyNuxtLink>
          <div class="flex flex-col pl-4 w-[60%]">
            <h3 class="mt-4 transition-all line-clamp-1 hover:cursor-pointer hover:text-primary md:text-3xl">
              <a class="text-2xl font-bold">{{ manga.name }}</a>
            </h3>
            <a class="text-base text-gray-600 mt-2">
              {{ manga.newChapter }}
            </a>
            <div class="flex align-center mt-1">
              <i class="text-lg text-gray-600 line-clamp-1"> {{ manga.review }}</i>
            </div>
            <div class="flex align-center">
              <i class="text-base text-gray-600 line-clamp-1"> {{ manga.view }}</i>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>