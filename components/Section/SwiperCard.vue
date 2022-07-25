<script lang="ts" setup>

defineProps({
  spotlight: Object,
})

</script>

<template>
  <div
      class="aspect-[3/4] 0 absolute-center absolute top-1/2 right-[5%] md:right-[10%] z-10 flex h-[80%] w-[170px] -translate-y-1/2 items-center md:w-[220px] lg:w-[270px] px-3 mt-10">
    <div class="relative h-[195px] md:h-[270px] lg:h-full w-[90%] overflow-hidden">
      <span class="duration-500 transform hover:scale-90 transition-all default-span-figure w-full">
        <nuxt-img
            format="webp"
            sizes="100px sm:100px md:100px lg:100px"
            loading="lazy"
            :src="spotlight?.thumbnail"
            fil="cover"
            class="absolute inset-0 object-cover object-center w-full">
        </nuxt-img>
      </span>
    </div>
  </div>
</template>