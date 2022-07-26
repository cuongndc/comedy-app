<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { keys } from '~/types'

const visitedComics: any = await useStorage(keys.visitedComics, {
  serializer: {
    read: (v: any) => v ? JSON.parse(v) : null,
    write: (v: any) => JSON.stringify(v),
  },
})
</script>

<template>
  <ClientOnly>
    <div v-if="visitedComics && visitedComics.length > 0" class="visited-comics px-3 mt-10">
      <h2 class=" h-[40px] mb-2 text-2xl font-semibold flex justify-start items-center text-black">
        # Truyện đang đọc
      </h2>
      <Swiper
        :slides-per-view="1.3"
        :space-between="14" class="pt-20_important h-[175px]"
      >
        <SwiperSlide v-for="manga in visitedComics" :key="manga.slug" class="duration-300 magictime">
          <div
            class="col-span-1 rounded-[8px] p-13 max-w-[384px] w-full h-[138px] bg-white relative shadow-[0_3px_20px_rgba(0,0,0,10%)]"
          >
            <div class="absolute bottom-[13px] left-[13px]">
              <NuxtLink :to="useNavigatorComicPreview(manga.slug)">
                <div class=" max-w-full w-[105px]">
                  <div class="relative pb-[133.3333%]">
                    <SharedImg
                      class="rounded-2xl visible h-full left-0 absolute top-0 w-full"
                      :src="manga.thumbnail"
                    />
                  </div>
                </div>
              </NuxtLink>
            </div>
            <div class="ml-[118px] p-4">
              <h3 class="text-xl font-semibold line-clamp-1">
                <a>{{ manga.name ? manga.name : manga.title }}</a>
              </h3>
              <p class="line-clamp-2 text-xs italic">
                {{ manga.review }}
              </p>
              <div>
                <a class="text-primary text-base">
                  Chương {{ manga.chapterNumber ? manga.chapterNumber : 0 }}/{{ manga?.chapterList?.length }}
                </a>
              </div>
              <button class="bg-primary p-1 text-base w-[80px] rounded-3xl h-[25px]">
                Đọc tiếp
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </ClientOnly>
</template>
