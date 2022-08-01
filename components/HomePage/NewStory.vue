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
      }"
    >
      <SwiperSlide v-for="comic in record.content" :key="comic._id" />
    </Swiper>
  </div>
</template>
