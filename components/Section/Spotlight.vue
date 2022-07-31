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
  delay: 3003330,
  disableOnInteraction: false,
})
</script>

<template>
  <Swiper :loop="true" :modules="modules" :autoplay="autoPlaySettings">
    <SwiperSlide v-for="cover in banner.covers" :key="cover._id">
      <NuxtLink
        :to="useNavigatorComicPreview(cover.slug, cover._id)"
        class="relative block h-[65vw]"
        :title="cover.comicName"
      >
        <div class="w-full absolute bottom-0">
          <SharedMeeToonImg
            :alt="cover.comicName"
            :src="`${cover.link}`"
            :lazy-src="cover.link"
          />
        </div>
        <div v-for="animation in cover.animations" :key="animation.image" class="w-full absolute bottom-0">
          <SharedMeeToonImg
            :lazy-src="animation.image"
            :alt="cover.comicName"
            :src="`${animation.image}`"
          />
        </div>
      </NuxtLink>
    </SwiperSlide>
  </Swiper>
</template>
