<script setup>
import {GENRES_NT} from '~/types';
</script>

<template>
  <div class="genres dark-box col-span-1 lg:my-4 p-5 border-[1px]">
    <a class="uppercase font-medium font-semibold">
      Thể loại
    </a>
    <ul class="grid grid-cols-2 cursor-pointer">
      <li>
        <a>
          Tất cả thể loại
        </a>
      </li>
      <li v-for="genre in GENRES_NT" :key="genre.id">
        <NuxtLink :to="`/filter?genres=${genre.value}`" class="genre_list-title">{{ genre.label }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>