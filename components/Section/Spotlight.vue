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
          <div class="aspect-w-16 aspect-h-12">
            <nuxt-img
              :alt="cover.comicName"
              loading="lazy"
              format="webp"
              provider="imageengine"
              :src="`${cover.link}`"
            />
          </div>
        </div>
        <div v-for="animation in cover.animations" :key="animation.image" class="w-full absolute bottom-0">
          <div class="aspect-w-16 aspect-h-12">
            <nuxt-img
              :alt="cover.comicName"
              loading="lazy"
              provider="imageengine"
              format="webp"
              sizes="xs:100px 2xs:390px"
              :src="`${animation.image}`"
            />
          </div>
        </div>
      </NuxtLink>
    </SwiperSlide>
  </Swiper>
</template>
