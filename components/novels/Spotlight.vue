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
  delay: 2500,
  disableOnInteraction: false,
})
</script>

<template>
  <Swiper :loop="true" :modules="modules" :autoplay="autoPlaySettings" class="bc-banner">
    <SwiperSlide v-for="cover in banner.covers" :key="cover._id" class="carousel-image">
      <NuxtLink
        :to="useNavigatorNovel(cover.slug)"
        class="relative block h-[65vw] sm:h-[460px] md:[460px]"
        :title="cover.comicName"
      >
        <div class="w-full bottom-0">
          <SharedMeeToonImg
            class="w-full"
            :alt="cover.comicName"
            :src="`${cover.link}`"
          />
        </div>
        <SharedMeeToonImg
          v-for="animation in cover.animations"
          :key="animation.image"
          class="w-full bottom-0"
          :alt="cover.comicName"
          :src="`${animation.image}`"
        />
      </NuxtLink>
    </SwiperSlide>
  </Swiper>
</template>

<style scoped lang="scss">
.v-responsive {
  position: absolute !important;
  max-height: fit-content;
}
</style>
