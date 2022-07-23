<script setup>

defineProps({
  src: String,
  alt: String,
  className: String,
  loading: String,
  fil: String,
  format: String,
})

</script>

<template>
  <img
      :format="format"
      :fil="fil"
      :loading="loading"
      :class="className"
      :src="src"
      :alt="alt">
</template>