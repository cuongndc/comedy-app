<script lang="ts" setup>
import {Manga, SWIPER_BREAK_POINTS} from "~/types";
import {Swiper, SwiperSlide} from 'swiper/vue';
import useMangaDetailPagePath from '~/composables/useMangaDetailPagePath'

const {data: mangas, pending} = useFetch<Manga[]>(`/api/follow-story?genres=manhua`);
</script>
<template>
  <div>
    <PulseMangaUpdatedLoading v-if="pending"/>
    <div class="px-4" v-else>
      <h2 class=" h-[70px] text-3xl font-bold flex justify-start items-center text-black mb-4">
        # Được yêu thích
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
            class="col-span-1 rounded-[8px] p-13 max-w-[384px] w-full h-[138px] bg-white relative shadow-[0_3px_20px_rgba(0,0,0,10%)]">
          <div class="absolute bottom-[13px] left-[13px]">
            <NuxtLink :to="useMangaDetailPagePath(mangas[mangas.length - 1].slug)">
              <div class="max-w-full w-[105px]">
                <div class="relative pb-[133.3333%]">
                  <SharedImg class="rounded-2xl visible h-full left-0 absolute top-0 w-full"
                             :src="mangas[mangas.length - 1].thumbnail"/>
                </div>
              </div>
            </NuxtLink>
          </div>
          <div class="ml-[118px] p-4">
            <h3 class="text-xl font-bold">
              <a>{{ mangas[mangas.length - 1].name }}</a>
            </h3>
            <div>
              <div class="rating flex items-center">
                <SvgStar/>
                <SvgStar/>
                <SvgStar/>
                <SvgStar/>
                <SvgStar/>
                <p class="text-xl">4.8
                  <span class="text-base font-semibold text-gray-500"> (369)</span>
                </p>
              </div>
              <div class="mt-3">
                <a>
                  <p class="w-full text-xl">
                    "Làm thêm nữa nhá"
                  </p>
                </a>
              </div>
              <div class="mt-3">
                <a class="mt-3">
                  <p class="flex items-center justify-start w-full text-gray-500">
                    <SvgComment class="mr-2"/>
                    <span class="name text-base font-semibold">Bang Vo</span>
                    <span class="mx-2 text-xl">•</span>
                    <span class="text-base">21 giờ trước</span>
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10">
        <ClientOnly>
          <Swiper :breakpoints="SWIPER_BREAK_POINTS">
            <SwiperSlide v-for="manga in mangas">
              <div class="duration-200 ease-in-out transition-all">
                <NuxtLink :to="useMangaDetailPagePath(manga.slug)">
                  <SharedImg
                      format="webp"
                      loading="lazy"
                      class="rounded-xl object-cover h-[139px] w-full"
                      :src="manga.thumbnail"
                      fil="fill"/>
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
      </div>
    </div>
  </div>
</template>