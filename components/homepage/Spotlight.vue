<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper'
import type { PropType } from 'vue'
import { ref } from 'vue'
import { useRuntimeConfig } from '#app'
import useNavigatorComicPreview from '~/composables/useNavigatorComicPreview'
import type { IBanner } from '~/types'

const props = defineProps({
  banner: Object as PropType<IBanner>,
})

interface autoSettingSwiper {
  delay: number
  disableOnInteraction: boolean
}

const modules = ref([Autoplay])
const config = useRuntimeConfig()
// A ref object that is passed to the Swiper component.
const autoPlaySettings = ref<autoSettingSwiper>({
  delay: 25333300,
  disableOnInteraction: false,
})
</script>

<template>
  <Swiper :loop="true" :modules="modules" :autoplay="autoPlaySettings">
    <SwiperSlide v-for="cover in banner.covers" :key="cover._id">
      <NuxtLink
        :to="useNavigatorComicPreview(cover.slug, cover._id)" class="relative block h-[65vw] sm:h-[460px] md:[460px]"
        :title="cover.comicName"
      >
        <div class="w-full bottom-0">
          <shared-mee-toon-img
            class="w-full"
            :alt="cover.comicName"
            :src="`${cover.link}`"
            sizes="xs:320px 2xs:390px sm:640px md:768px"
          />
        </div>
        <shared-mee-toon-img
          v-for="animation in cover.animations"
          :key="animation.image"
          class="absolute w-full bottom-0"
          :alt="cover.comicName"
          :src="`${animation.image}`"
          sizes="xs:320px 2xs:390px sm:640px md:768px"
          :width="375"
          :height="280"
        />
      </NuxtLink>
    </SwiperSlide>
  </Swiper>
</template>
