<script lang="ts" setup>
import {GENRES_NT, MANGA_NT} from "~/types";
import {onClickOutside} from "@vueuse/core";
import {XIcon} from "@heroicons/vue/solid";

const open = useState('openNav', () => false)
const nav = ref(null)
onClickOutside(nav, (event) => open.value = false)

</script>

<template>
  <div class="animate__fadeIn animate__animated animate__faster fixed inset-0 z-[100] bg-black/30" aria-hidden="true">
    <aside
        ref="nav"
        class="slideLeftReturn magictime absolute-center  fixed inset-0 z-[999] w-[250px] min-w-[230px] bg-black p-4 md:w-[40%]">
      <div class="flex h-full w-full flex-col">
        <div class="absolute-center flex h-fit w-full items-center justify-end">
          <button @click="open = false" class="absolute-center bg-hight-light ml-4 rounded-xl-full p-4 text-white md:p-5"
                  tabindex="0">
            <XIcon class="h-9 w-9"/>
          </button>
        </div>
        <div class="relative flex mx-auto h-[96px] w-[96px]">
          <div style="opacity: 1;">
            <span
                style="box-sizing: border-box; display: block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: absolute; inset: 0px;"><img
                alt="logo"
                src="~/assets/images/logo-banner.png"
                sizes="100vw"
                style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: contain;"></span>
          </div>
        </div>
        <ul class="mt-4 h-full w-full text-white main-menu">
          <li class="mx-4 mt-4 md:mt-8">
            <a class="font-secondary text-3xl md:text-5xl">Truyện tranh</a>
          </li>
          <li class="flex flex-wrap">
            <NuxtLink :to="`/filter?comics=${manga.value}`"
                      class="text-xl md:text-3xl absolute-center bg-hight-light ml-4 mt-4 w-fit rounded-xl py-2 px-4 md:mt-6"
                      v-for="manga in MANGA_NT">
              {{ manga.label }}
            </NuxtLink>
          </li>
          <li class="mx-4 mt-4 border-t-[2px] border-highlight pt-4 md:mt-8">
            <a class="font-secondary text-3xl md:text-5xl">
              Thể loại
            </a>
          </li>
          <li class="grid grid-cols-2">
            <NuxtLink :to="`/filter?genres=${genre.value}`"
                      class="text-xl md:text-3xl hover:bg-hight-light ml-4 mt-4 flex w-full items-center rounded-xl py-2 px-4 md:mt-6"
                      v-for="genre in GENRES_NT.slice(0, 8)">
              {{ genre.label }}
            </NuxtLink>
          </li>
          <li class="mx-4 mt-4 border-t-[2px] border-highlight pt-4 md:mt-8">
            <NuxtLink class="flex items-center font-secondary text-3xl md:text-5xl"
                      to="/filter?view=newComic">
              Mới cập nhật
              <button class="absolute-center h-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                     stroke="currentColor" aria-hidden="true" class="ml-2 h-6 w-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </NuxtLink>
          </li>
          <li class="mx-4 mt-4 border-t-[2px] border-highlight pt-4 md:mt-8">
            <NuxtLink class="flex items-center font-secondary text-3xl md:text-5xl" href="/filter?view=all">
              Bảng xếp hạng
              <button class="absolute-center h-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                     stroke="currentColor" aria-hidden="true" class="ml-2 h-6 w-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>