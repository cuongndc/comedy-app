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
      <SharedImg
        format="webp"
        loading="lazy"
        fil="cover"
        class="h-auto comic-img mx-auto w-auto"
        :data-original="`${config.public.imageCdn}${page.linkHD}`"
        :data-cdn="`${config.public.imageCdn}${page.linkHD}`"
        :src="`${config.public.imageCdn}${page.linkHD}`"
      />
    </div>
  </div>
</template>
