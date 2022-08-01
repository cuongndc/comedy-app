<script setup lang="ts">
import { useRuntimeConfig } from '#imports'

defineProps({
  pages: Array,
})
const config = useRuntimeConfig()
</script>

<template>
  <div class="pt-24 mx-auto w-full lg:w-[60%] bg-accent-1">
    <div v-for="page in pages" :key="page._id" class="relative my-0 h-fit w-full">
      <SharedMeeToonImg
        class="w-full h-full"
        :src="`${config.public.PUBLIC_IMAGE_CDN}${page.linkHD}`"
      />
    </div>
  </div>
</template>
