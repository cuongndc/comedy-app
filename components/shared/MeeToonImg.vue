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
    default: 40,
  },
  format: {
    type: String,
    default: 'webp',
  },
})
</script>

<template>
  <nuxt-img
    :loading="loading"
    :width="width"
    :height="height"
    :quality="quality"
    :format="format"
    :preset="preset"
    :modifiers="modifiers"
    :sizes="sizes"
    :fil="fil"
    :class="className"
    :alt="alt"
    provider="imageengine"
    :src="src"
  />
</template>
