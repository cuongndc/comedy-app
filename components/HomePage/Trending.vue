<script lang="ts" setup>
import { Grid } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ChevronDoubleRightIcon } from '@heroicons/vue/solid'
import { convertUnit } from '~/common'
import useNavigatorComicPreview from '~/composables/useNavigatorComicPreview'
import { navigateTo } from '#app'
import { TRENDING } from '~/contants'

defineProps({
  record: Object,
})
const navigatorComicPreview = (slug: string, _id: string) => {
  return navigateTo(useNavigatorComicPreview(slug, _id))
}
</script>

<template>
  <div class="px-4 bg-contain">
    <div>
      <NuxtLink href="/">
        <img
          class="w-full"
          src="/icons/widgets/trend/img-header.svg"
          alt="Có chắc đây là hot"
        >
      </NuxtLink>
    </div>
    <div class="bg-white px-2 shadow">
      <Swiper
        :slides-per-view="1.3"
        :space-between="14"
        :modules="[Grid]"
        :grid="{
          rows: 3,
          fill: 'row',
        }"
      >
        <SwiperSlide v-for="content in record.content" :key="content.slug" class="h-[130px]">
          <div class="flex items-center p-5" @click="navigatorComicPreview(content.slug, content._id)">
            <SharedMeeToonImg
              fil="cover"
              class="aspect-[3/4] w-[75px] h-full relative rounded-2xl"
              :src="content.verticalLogo"
            />
            <div class="px-5">
              <h3 class="text-xl font-semibold line-clamp-1 mb-1">
                <NuxtLink :to="useNavigatorComicPreview(content.slug, content._id)">
                  {{ content.comicName }}
                </NuxtLink>
              </h3>
              <p class=" text-primary-gray mb-3 text-base">
                Chương {{ content.newestChapter }}
              </p>
              <div class="flex items-center">
                <div class="flex items-center mr-2">
                  <img class="w-5 h-5 mr-1" src="/icons/homePage/icon-view-chapter.svg" alt="view chapter">
                  <span class="text-base text-primary-gray">{{ convertUnit(content.viewCount) }}</span>
                </div>
                <div class="flex items-center">
                  <img class="mr-1" src="/icons/comicPage/icon-star.svg" alt="star">
                  <span class="text-base">5 </span>
                  <span class="text-base text-primary-gray">({{ convertUnit(content.reviewCount) }})</span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="rounded-b-xl shadow-[0_3px_20px_rgba(0,0,0,10%)] bg-white">
      <div>
        <NuxtLink :to="`/${TRENDING}`" class="flex items-center justify-center p-5">
          <span class="text-xl text-primary-gray">Xem tất cả</span>
          <ChevronDoubleRightIcon class="h-4 w-4 text-primary-gray ml-2" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@media only screen and (min-width: 375px) {
  .swiper-slide {
    margin-right: 0 !important;
    margin-top: 0 !important;
  }
}
</style>
