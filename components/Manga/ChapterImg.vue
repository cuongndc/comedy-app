<script setup lang="ts">
defineProps({
  pages: Array,
})
</script>

<template>
  <div class="pt-24 mx-auto w-full lg:w-[60%] bg-accent-1">
    <div v-for="page in pages" :key="page._id" class="relative my-0 h-fit w-full">
      <SharedMeeToonImg
        class="w-full h-full"
        :src="page.linkHD"
      />
    </div>
  </div>
</template>
