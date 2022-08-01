<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { COMIC_STATUS } from '~/contants'

defineProps({
  record: Object,
})
</script>

<template>
  <div class="px-4 mb-4 mt-10">
    <h2 class=" h-[20px] text-3xl font-bold flex justify-start items-center text-black mb-4">
      # {{ record.typeName }}
    </h2>
    <Swiper
      :breakpoints="{
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
      }"
    >
      <SwiperSlide v-for="comic in record.content" :key="comic._id">
        <div class="duration-200 ease-in-out transition-all">
          <NuxtLink class="relative" :to="useNavigatorComicPreview(comic.slug, comic._id)">
            <div class="absolute top-0">
              <span v-if="!comic.adultContent" class="bg-primary rounded-xl text-white text-xl font-bold px-3 py-1 ml-1">
                {{ COMIC_STATUS[comic.status] }}
              </span>
              <span v-else class="bg-primary rounded-xl text-white text-xl font-bold px-3 py-1 ml-1">
                17+
              </span>
            </div>
            <SharedMeeToonImg
              loading="lazy"
              class="rounded-xl w-full"
              :src="comic.verticalLogo"
              :height="138"
            />
          </NuxtLink>
          <h2 class="text-xl line-clamp-2 mt-1 text-black font-semibold">
            {{ comic.comicName }}
          </h2>
          <p>
            <a class="text-xl font-secondary text-primary-gray mr-1">
              Chương {{ comic.newestChapter }}
            </a>
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>
