<script lang="ts" setup>
import useMangaDetailPagePath from '~/composables/useMangaDetailPagePath';
import {EyeIcon} from '@heroicons/vue/solid';
import {randomColors} from '~/serveless/utils';
import {TailwindColors} from '~/contants';
import {PropType} from 'vue';
import {Manga} from '~/types';

const {data: mangas, pending} = useLazyFetch(`/api/top-month`);

</script>

<template>
  <div class="w-full pb-4 box-tab" v-if="!pending">
    <ul class="tab-nav flex justify-around">
      <li class="w-[33.33333%]">
        <NuxtLink to="/filter?view=month" rel="nofollow" title="BXH truyện tranh theo tháng" class="active">
          Top Tháng
        </NuxtLink>
      </li>
      <li class="w-[33.33333%]">
        <NuxtLink to="/filter?view=week" rel="nofollow" title="BXH truyện tranh theo tuần">
          Top Tuần
        </NuxtLink>
      </li>
      <li class="w-[33.33333%]">
        <NuxtLink to="/filter?view=day" rel="nofollow" title="BXH truyện tranh theo ngày">
          Top Ngày
        </NuxtLink>
      </li>
    </ul>
    <div class="tab-pane dark-box">
      <ul class="w-full space-y-4 overflow-hidden">
        <li class="flex w-full px-4 py-2" v-for="manga in mangas" :key="manga.slug">
          <LazyNuxtLink :to="useMangaDetailPagePath(manga.slug)">
            <figure class="relative h-[45px] w-[100px]">
            <span class="default-span-figure">
              <nuxt-img
                  placeholder="../assets/images/placeholder.png"
                  format="webp"
                  loading="lazy"
                  fil="fill"
                  :src="manga.thumbnail"
                  class="aspect-w-3 aspect-h-4 absolute object-cover object-center"
                  sizes="sm:100vw md:100vw lg:100vw">
                </nuxt-img>
            </span>
            </figure>
          </LazyNuxtLink>
          <div class="flex w-full flex-col space-y-2 pl-4 ">
            <h3
                class="font-secondary text-2xl font-semibold transition-all line-clamp-1 hover:cursor-pointer hover:text-primary md:text-3xl chap-title">
              <a>{{ manga.name }}</a>
            </h3>
            <div class="flex justify-between">
              <a class="text-lg text-mode">
                {{ manga.newChapter }}
              </a>
              <div class="flex align-center chapter">
                <EyeIcon class="h-6 w-5 mr-2 text-mode view" style="margin-top: 1px"/>
                <i class="text-lg text-mode view"> {{ manga.view }}</i>
              </div>
            </div>

          </div>
        </li>
      </ul>
    </div>
  </div>
</template>