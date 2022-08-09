<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  loading: {
    type: String,
    default: 'lazy',
  },
  fil: String,
  width: Number,
  height: Number,
  className: String,
  alt: String,
  sizes: {
    type: String,
    default: 'xs:100vw 2xs:100vw sm:100vw',
  },
  modifiers: Object,
  preset: String,
  quality: {
    type: Number,
    default: 80,
  },
  format: {
    type: String,
    default: 'webp',
  },
})
</script>

<template>
  <v-img
    fil
    :alt="alt"
    :width="width"
    :height="height"
    :class="className"
    :src="$img(src, { quality, format: 'webp' }, { provider: 'imageengine' })"
    :lazy-src="$img(src, { quality, format: 'webp' }, { provider: 'imageengine' })"
    :sizes="sizes"
    :srcset="sizes"
  />
</template>
