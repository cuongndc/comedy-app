<script setup lang="ts">
import AsImage from '@awesome-image/image'
import { useRuntimeConfig } from '#imports'

defineProps({
  pages: Array,
})
const config = useRuntimeConfig()
</script>

<template>
  <div class="pt-24 mx-auto w-full lg:w-[60%] bg-accent-1">
    <div v-for="page in pages" :key="page._id" class="relative my-0 h-fit w-full">
      <AsImage
        class="w-full h-full"
        format="webp"
        :lazy="true"
        :duratio="2"
        :src="`${config.public.imageCdn}${page.linkHD}`"
      />
    </div>
  </div>
</template>
