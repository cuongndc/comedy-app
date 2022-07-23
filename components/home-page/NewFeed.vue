<script lang="ts" setup>
import {IManga} from "~/types";
import {PropType} from 'vue';

defineProps({
  title: String,
  cateSlug: String,
  mangas: Array as PropType<IManga[]>,
})

</script>
<template>
  <div class="px-4 mb-10">
    <div class="h-[70px] mb-4 flex justify-between">
      <h2 class="text-3xl font-bold flex justify-start items-center text-black ">
        {{ title }}
      </h2>
      <NuxtLink :to="`/category/${cateSlug}`" class="text-xl font-semibold flex items-center text-primary mr-1">
        Thêm
      </NuxtLink>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
      <div
          class="col-span-1 rounded-[8px] p-13 max-w-[384px] w-full h-[138px] bg-white relative shadow-[0_3px_20px_rgba(0,0,0,10%)]">
        <SharedNewFeedLeftContent :mangas="mangas"/>
        <SharedNewFeedRightContent :mangas="mangas"/>
      </div>
    </div>
    <SharedSwiperContent :mangas="mangas"/>
  </div>
</template>