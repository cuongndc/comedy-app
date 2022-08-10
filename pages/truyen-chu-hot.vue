<script setup lang="ts">
import { watchEffect } from 'vue'
import { isClient } from '@vueuse/core'
import type { Comic } from '~/types'
import { navigateTo, useFetch } from '#app'
import SearchLoading from '~/components/common/SearchLoading.vue'
import { convertUnit } from '~/common'
import { COMIC_STATUS } from '~/contants'

const { data: comics, pending } = await useFetch<Comic>('/api/novel/trending')
const navigator = (slug: string, _id: string) => {
  return navigateTo(useNavigatorComicPreview(slug, _id))
}
watchEffect(() => {
  if (isClient)
    window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<template>
  <SearchLoading v-if="pending" class="w-[150px] h-[50px]" />
  <div v-else class="bg-white h-[100vh]">
    <div class="flex justify-between justify-center" style="box-shadow: rgb(242 242 242) 0 -1px 0 inset">
      <NuxtLink to="/" class="mx-2 my-2 flex items-center">
        <img src="/icons/header/icon-back-white.svg" alt="back">
      </NuxtLink>
      <div class="flex items-center justify-center w-[70%] mx-2 my-2 text-4xl text-black font-semibold">
        #Truyện chữ hot nhất
      </div>
      <NuxtLink to="/" class="flex items-center mr-2 h-[40px] w-[30px] mx-2 my-2 rounded-2xl text-white">
        <img src="/icons/header/icon-search.svg" alt="search">
      </NuxtLink>
    </div>
    <div class="flex flex-wrap bg-white">
      <section class="mt-4 overflow-auto scrollbar-hide" style="height: calc(100vh - 50px)">
        <div v-for="(novel, id) in comics" :key="novel._id" class="p-4 col-span-1 flex items-center">
          <div v-if="id === 0" class="text-4xl px-4 text-red-500">
            {{ id + 1 }}
          </div>
          <div v-if="id === 1" class="text-4xl px-4 text-red-400">
            {{ id + 1 }}
          </div>
          <div v-if="id === 2" class="text-4xl px-4 text-red-300">
            {{ id + 1 }}
          </div>
          <div v-if="id > 2" class="text-4xl px-4">
            {{ id + 1 }}
          </div>
          <div class="flex items-center" @click="navigator(novel.slug, novel._id)">
            <div class="relative">
              <SharedMeeToonImg
                :width="75"
                :height="100"
                class="rounded-xl w-[75px] h-[100px] object-cover"
                :src="novel.verticalLogo"
              />
            </div>
            <div class="px-5" style="width: calc(100% - 102px)">
              <h3 class="text-xl font-semibold line-clamp-1 mb-1">
                <NuxtLink :to="useNavigatorNovel(novel.slug)">
                  {{ novel.name }}
                </NuxtLink>
              </h3>
              <span class="line-clamp-2 text-primary-gray text-base">
                {{ novel.description }}
              </span>
              <p class="text-background my-2 text-base">
                Chương {{ novel.newestChapter }}
                <span v-if="novel.adultContent" class="text-[red] font-normal pl-2">
                  17+
                </span>
                <span class="text-[#2dcb48] font-normal px-2">
                  {{ COMIC_STATUS[novel.novelStatus] }}
                </span>
              </p>
              <div class="flex items-center">
                <div class="text-primary-gray mb-3 text-base flex items-center mr-4">
                  <img class="mr-1 w-6" src="/icons/searchPage/icon-view-count.svg" alt="">
                  <span>
                    {{ convertUnit(novel.viewCount) }}
                  </span>
                </div>
                <div class="text-primary-gray mb-3 text-base flex items-center">
                  <img class="mr-1" src="/icons/searchPage/icon-star.svg" alt="">
                  <span>
                    ({{ novel.reviewCount }})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
