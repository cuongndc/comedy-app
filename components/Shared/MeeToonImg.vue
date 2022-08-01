<script setup lang="ts">
defineProps({
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
  <nuxt-img
    :preset="preset"
    :modifiers="modifiers"
    :sizes="sizes"
    :fil="fil"
    :class="className"
    :alt="alt"
    provider="imageengine"
    :src="src"
    :width="width"
    :height="height"
    :quality="quality"
    :format="format"
  />
</template>
