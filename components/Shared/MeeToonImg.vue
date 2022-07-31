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
  progressive: {
    type: Boolean,
    default: true,
  },
  responsive: {
    type: Boolean,
    default: true,
  },
  lazy: {
    type: Boolean,
    default: false,
  },
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
    :lazy="lazy"
    :lazy-src="`${config.public.PUBLIC_IMAGE_CDN}${lazySrc}`"
    :src="`${config.public.PUBLIC_IMAGE_CDN}${src}`"
    :progressive="progressive"
    :responsive="responsive"
    :auto-wepb="true"
    class="rounded-xl"
  >
    <template #loading>
      <div class="placeholder" />
    </template><AsImage />
  </asimage>
</template>
