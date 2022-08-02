<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { COMIC_STATUS } from '~/contants'
import ComicsComicHorizontal from '~/components/comics/ComicHorizontal'

defineProps({
  record: Object,
})
</script>

<template>
  <div class="px-4 mb-4 mt-10">
    <h2 class=" h-[20px] text-3xl font-bold flex justify-start items-center text-black mb-4">
      # {{ record.typeName }}
    </h2>

    <div class="whitespace-nowrap overflow-x-auto mb-10 scrollbar-hide">
      <ComicsComicHorizontal
          v-for="comic in record.content"
          :key="comic.slug"
          :_id="comic._id"
          :comic="comic"
          :adult-content="comic.adultContent"
          :chap-number="comic.newestChapter"
          :comic-name="comic.comicName"
          :slug="comic.slug"
          :status="comic.status"
          :vertical-logo="comic.verticalLogo"
      />
    </div>
  </div>
</template>
