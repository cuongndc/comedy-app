<script lang="ts" setup>
import {ref, watchEffect} from 'vue';
import {useDebounce} from '@vueuse/core';
import {XCircleIcon} from '@heroicons/vue/solid'
import {IManga} from "~/types";

const refInput = ref('');
const debounced = useDebounce(refInput, 200)
const searchData = ref<IManga[]>([]);
const loading = ref(true);

const clearInput = () => {
  refInput.value = ' ';
  searchData.value = [];
}

watchEffect(async () => {
  loading.value = true;
  try {
    searchData.value = await $fetch(`/api/search-manga`, {
      params: {
        q: debounced.value,
      }
    });

    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.log(error);
  }
})

</script>
<template>
  <div class="bg-white h-[100vh] w-full">
    <div class="flex justify-between">
      <NuxtLink to="/" class="mx-2 my-2">
        <SvgHeaderFilterBack/>
      </NuxtLink>
      <div class="flex w-[90%] relative mx-2 my-2">
        <div class="absolute top-1 left-1">
          <SvgSearchFilterHeader/>
        </div>
        <input v-model="refInput" class="search-input" placeholder="Nhập nội dung tìm kiếm"/>
        <XCircleIcon v-if="refInput.length > 0" @click="clearInput" class="w-8 h-8 text-gray-custom absolute "
                     style="right: 10px; top: 7px"/>
      </div>
    </div>
    <div class="tabs">
      <ul class="flex">
        <li class="p-3 border-y-red-700 text-black">Tất cả</li>
        <li class="p-3 text-gray-custom">Truyện tranh</li>
        <li class="p-3 text-gray-custom">Truyện chữ</li>
      </ul>
    </div>
    <section class="bg-white">
      <h2 class="font-bold text-2xl text-black p-4">
        Tìm kiếm hot
      </h2>
      <div class="flex flex-wrap">
        <span class="search-hotkey mx-4 my-2" @click="refInput = 'vo luyen dinh'">
          Võ luyện đỉnh phong
        </span>
        <span class="search-hotkey mx-4 my-2" @click="refInput = 'tren nguoi ta'">
          Trên người ta có một con rồng
        </span>
        <span class="search-hotkey mx-4 my-2" @click="refInput = 'tu la vo than'">
          Tu la võ thần
        </span>
        <span class="search-hotkey mx-4 my-2" @click="refInput = 'trong sinh do thi'">
          Trọng sinh đô thị tu tiên
        </span>
        <span class="search-hotkey mx-4 my-2" @click="refInput = 'dai quan gia'">
          Đại quản gia là ma hoàn
        </span>
      </div>
      <h2 class="font-bold text-2xl text-black p-4">
        Truyện tranh ({{ searchData.length ? searchData.length : 0 }})
      </h2>
      <CommonSearchLoading class="w-16 h-16" v-if="loading" />
      <div class="result grid grid-cols-1 md:grid-cols-2" v-if="searchData && searchData.length > 0 && !loading">
        <div class="p-4 col-span-1" v-for="manga in searchData">
          <NuxtLink class="flex items-center" :to="useMangaDetailPagePath(manga.slug)">
            <SharedImg
                loading="lazy"
                class="rounded-xl w-[75px] h-[100px] object-cover"
                :src="manga.thumbnail"
                fil="fill"/>
            <div class="px-5" style="width: calc(100% - 102px)">
              <h3 class="text-xl font-semibold line-clamp-1 mb-1">
                <NuxtLink :to="useMangaDetailPagePath(manga.slug)">
                  {{ manga.name }}
                </NuxtLink>
              </h3>
              <p class=" text-gray-custom mb-3 text-base">
                {{ manga.newChapter }}
              </p>
              <ul class="flex h-[50%] flex-wrap">
                <li class="text-gray-custom absolute-center m-2 h-[40%] w-[75px] rounded-xl text-base bg-primary"
                    v-for="genre in manga.genres">
                  {{ genre }}
                </li>
              </ul>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>

</template>