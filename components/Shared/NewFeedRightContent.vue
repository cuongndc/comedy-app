<script setup lang="ts">
import {PropType} from "vue";
import {IManga} from "~/types";

defineProps({
  mangas: Array as PropType<IManga[]>,
})
</script>

<template>
  <div class="ml-[118px] p-4">
    <h3 class="text-xl font-bold">
      <a>{{ mangas[mangas.length - 1].name }}</a>
    </h3>
    <div>
      <div class="rating flex items-center">
        <SvgStar/>
        <SvgStar/>
        <SvgStar/>
        <SvgStar/>
        <SvgStar/>
        <p class="text-xl">4.8
          <span class="text-base font-semibold text-gray-500"> (369)</span>
        </p>
      </div>
      <div class="mt-3">
        <a>
          <p class="w-full text-xl">
            "Làm thêm nữa nhá"
          </p>
        </a>
      </div>
      <div class="mt-3">
        <a class="mt-3">
          <p class="flex items-center justify-start w-full text-gray-500">
            <SvgComment class="mr-2"/>
            <span class="name text-base font-semibold">Bang Vo</span>
            <span class="mx-2 text-xl">•</span>
            <span class="text-base">21 giờ trước</span>
          </p>
        </a>
      </div>
    </div>
  </div>
</template>