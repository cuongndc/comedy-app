<script setup lang="ts">
import type { PropType } from 'vue'
import { useRuntimeConfig } from '#imports'
import type { ChapterImg } from '~~/types'

defineProps({
  chapters: Array as PropType<ChapterImg[]>,
})
const config = useRuntimeConfig()
const publicAPI = config.public.NUXT_PUBLIC_SERVICE_URL

const proxy = async (src: string) => {
  return await $fetch('/api/proxy', {
    params: {
      src: src.replace('?data=net', ''),
      url: 'http://www.nettruyenco.com',
    },
  })
}
</script>

<template>
  <div class="pt-24 mx-auto w-full lg:w-[60%] bg-accent-1">
    <div v-for="(chap, index) in chapters" :key="`page-${index}`" class="relative my-0 h-fit w-full">
      <SharedImg
        format="webp"
        loading="lazy"
        fil="cover"
        class="h-auto comic-img mx-auto w-auto"
        :data-original="chap?.imgSrc"
        :data-cdn="chap.imgSrcCDN"
        :src="`${publicAPI}/api/proxy?src=${chap?.imgSrc}&url=http://www.nettruyenco.com`"
      />
    </div>
  </div>
</template>
