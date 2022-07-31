<script setup lang="ts">
import AsImage from '@awesome-image/image'

defineProps({
  lazySrc: String,
  src: String,
  fil: String,
  width: Number,
  height: Number,
  className: String,
  alt: String,
})

const config = useRuntimeConfig()
</script>

<template>
  <AsImage
    :alt="alt"
    format="webp"
    :fil="fil"
    :class="className"
    :width="width"
    :height="height"
    :lazy="true"
    :lazy-src="`${config.public.PUBLIC_IMAGE_CDN}${lazySrc}`"
    :src="`${config.public.PUBLIC_IMAGE_CDN}${src}`"
    class="rounded-xl"
  />
</template>
