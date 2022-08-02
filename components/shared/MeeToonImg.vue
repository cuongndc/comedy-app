<script setup lang="ts">
const props = defineProps({
  src: String,
  fil: String,
  width: Number,
  height: Number,
  className: String,
  alt: String,
  sizes: String,
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
    :width="width"
    :height="height"
    :class="className"
    :src="$img(src, { quality: 20, format: 'webp' }, { provider: 'imageengine' })"
    :lazy-src="$img(src, { quality: 20, format: 'webp' }, { provider: 'imageengine' })"
  />
</template>
