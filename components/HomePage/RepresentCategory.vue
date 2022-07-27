<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useRuntimeConfig } from '#app'
import { SWIPER_BREAK_POINTS } from '~/types'

defineProps({
  record: Object,
})
const config = useRuntimeConfig()
</script>

<template>
  <div v-for="content in record.content" :key="content._id" class="px-4 mb-10">
    <div class="h-[70px] mb-4 flex justify-between">
      <h2 class="text-3xl font-bold flex justify-start items-center text-black">
        {{ content.name }}
      </h2>
      <NuxtLink :to="`/category/${content.slug}`" class="text-xl font-semibold flex items-center text-primary mr-1">
        Thêm
      </NuxtLink>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-14 mb-10">
      <div
        v-for="comic in content.comicsReviewNewest"
        :key="comic._id"
        class="col-span-1 rounded-[8px] p-13 max-w-[384px] w-full h-[138px] bg-white relative shadow-[0_3px_20px_rgba(0,0,0,10%)]"
      >
        <div class="absolute bottom-[13px] left-[13px]">
          <NuxtLink :to="useNavigatorComicPreview(comic.slug)">
            <div class=" max-w-full w-[105px]">
              <div class="relative pb-[133.3333%]">
                <SharedImg
                  class="rounded-2xl visible h-full left-0 absolute top-0 w-full"
                  :src="`${config.public.imageCdn}/${comic.verticalLogo}`"
                />
              </div>
            </div>
          </NuxtLink>
        </div>
        <div class="ml-[118px] p-4">
          <h3 class="text-xl font-bold">
            <a>{{ comic.comicName }}</a>
          </h3>
          <div>
            <div class="rating flex items-center">
              <SvgStar />
              <SvgStar />
              <SvgStar />
              <SvgStar />
              <SvgStar />
              <p class="text-xl">
                {{ comic.avgRate.toFixed(1) }}
                <span class="text-base font-semibold text-gray-500"> (369)</span>
              </p>
            </div>
            <a>
              <i class="w-full text-base">
                "{{ comic.contentReview }}"
              </i>
            </a>
            <div class="mt-3">
              <a class="mt-3">
                <p class="flex items-center justify-start w-full text-gray-500">
                  <SvgComment class="mr-2" />
                  <span class="name text-base font-semibold">{{ comic.userComment.name }}</span>
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Swiper :breakpoints="SWIPER_BREAK_POINTS">
      <SwiperSlide v-for="comic in content.comics" :key="comic.slug">
        <div>
          <NuxtLink :to="useNavigatorComicPreview(comic.slug)">
            <SharedImg
              format="webp"
              loading="lazy"
              class="rounded-xl object-cover h-[139px] w-full"
              :src="`${config.public.imageCdn}/${comic.verticalLogo}`"
              fil="fill"
            />
          </NuxtLink>
          <div class="h-[30px] flex flex-wrap">
            <h2 class="text-base line-clamp-1 mt-1 text-black font-semibold">
              {{ comic.comicName }}
            </h2>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>
