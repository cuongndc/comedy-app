<script lang="ts" setup>
import {Swiper, SwiperSlide} from "swiper/vue";
import {Autoplay} from "swiper";
import {ref} from 'vue';

type autoSettingSwiper = {
  delay: number;
  disableOnInteraction: boolean
}
const modules = ref([Autoplay]);
// A ref object that is passed to the Swiper component.
const autoPlaySettings = ref<autoSettingSwiper>({
  delay: 3000,
  disableOnInteraction: false
});

const {data: spotlights, pending} = await useFetch('/api/spotlights')
</script>

<template>
  <div>
    <SectionSpotlightBannerLoading v-if="pending"/>
    <ClientOnly>
      <Swiper :loop="true" :modules="modules" :autoplay="autoPlaySettings" class="relative">
        <SwiperSlide v-for="spotlight in spotlights">
          <NuxtLink :to="useMangaDetailPagePath(spotlight.slug)">
            <div class="relative aspect-w-16 aspect-h-9 rounded-xl-md">
              <div
                  class="z-20 absolute fixed-0 bg-gradient-to-b from-transparent via-black/10 to-black/80 flex items-end bottom-0 w-full">
                <div class="p-4 w-full">
                  <h1 class="text-xl font-semibold uppercase line-clamp-2 text-white w-[70%]">
                    <a class="flex items-end h-[100%]">{{ spotlight.name }}</a>
                  </h1>
                  <div class="flex flex-wrap items-center mt-2 text-sm gap-x-8">
                    <div class="flex items-center gap-x-2">
                      <p class="text-white flex items-center">
                    <span class="text-base mr-1">
                      <SvgViewSpotLight class="text-white mr-1"/>
                    </span>
                        {{ spotlight.view }}
                      </p>
                    </div>
                    <div class="flex items-center gap-x-2">
                      <div class="flex items-center gap-x-2">
                        <p class="text-white flex items-center text-base">
                          <SvgFollow class="mr-1"/>
                          {{ spotlight.follow }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <figure class="w-full bg-cover bg-center bg-no-repeat z-50"
                      style="background-image: url(https://cdn.funtoon.vn/image/resources/1641268437278.1942.png)">
              </figure>
              <div>
                <SharedImg
                    loading="lazy"
                    class="img-position z-10 object-cover"
                    format="webp"
                    :src="spotlight.thumbnail"/>
              </div>
            </div>
          </NuxtLink>
        </SwiperSlide>
      </Swiper>
    </ClientOnly>
  </div>

</template>