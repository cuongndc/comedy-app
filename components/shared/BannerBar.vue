<script setup>
import { DANH_MUC } from '~/contants'
</script>

<template>
  <div class="py-2 mt-6">
    <div class="grid grid-cols-5">
      <div class="grid grid-cols-1">
        <div class="flex items-center justify-center">
          <NuxtLink to="/">
            <div class="icon w-16 h-16 rounded-[100%] flex items-center justify-center">
              <img
                alt="ranking"
                src="/icons/menuBar/ranking_v2.png"
              >
            </div>
          </NuxtLink>
        </div>
        <p class="text-center text-xl mt-2">
          BXH
        </p>
      </div>
      <div class="grid grid-cols-1">
        <div class="flex items-center justify-center">
          <NuxtLink :to="`${DANH_MUC}/all`">
            <div class="icon w-16 h-16 flex items-center justify-center rounded-[100%]">
              <img
                alt="category"
                src="/icons/menuBar/category_v2.png"
              >
            </div>
          </NuxtLink>
        </div>
        <p class="text-center text-xl mt-2">
          Thể loại
        </p>
      </div>
      <div class="grid grid-cols-1">
        <div class="flex items-center justify-center">
          <NuxtLink to="/">
            <div class="icon w-16 h-16 rounded-[100%] flex items-center justify-center">
              <img
                alt="category"
                src="/icons/menuBar/follow_v2.png"
              >
            </div>
          </NuxtLink>
        </div>
        <p class="text-center text-xl mt-2">
          Theo dõi
        </p>
      </div>
      <div class="grid grid-cols-1">
        <div class="flex items-center justify-center">
          <NuxtLink to="/">
            <div class="icon w-16 h-16 rounded-[100%] flex items-center justify-center">
              <img
                alt="category"
                src="/icons/menuBar/community_v2.png"
              >
            </div>
          </NuxtLink>
        </div>
        <p class="text-center text-xl mt-2">
          Hội nhóm
        </p>
      </div>
      <div class="grid grid-cols-1">
        <div class="flex items-center justify-center">
          <NuxtLink to="/">
            <div class="icon w-16 h-16 rounded-[100%] flex items-center justify-center">
              <img
                alt="category"
                src="/icons/menuBar/mission_v2.png"
              >
            </div>
          </NuxtLink>
        </div>
        <p class="text-center text-xl mt-2">
          Nhiệm vụ
        </p>
      </div>
    </div>
  </div>
</template>
