<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useDebounce } from '@vueuse/core'
import type { Comic } from '~/types'
import useNavigatorComicPreview from '~/composables/useNavigatorComicPreview'
import { convertUnit } from '~/common'

const refInput = ref('')
const debounced = useDebounce(refInput, 200)
const searchData = ref<Comic[]>([])
const loading = ref(true)

const comicNameSuggestion = [
  'Lục Cung Phong Hoa',
  'Daddy của con đâu',
  'Cô Vợ Câm',
  'Cô vợ đáng yêu',
  'luyến phân công lược',
  'thạch thiếu hiệp',
  'boss xấu xa',
  'tổng tài',
  'trói chặt trái tim',
  'long trù kỷ',
]
const clearInput = () => {
  refInput.value = ' '
  searchData.value = []
}
watchEffect(async () => {
  loading.value = true
  try {
    searchData.value = await $fetch('/api/comic/search', {
      params: {
        q: debounced.value,
      },
    })

    loading.value = false
  }
  catch (error) {
    loading.value = false
  }
})
</script>

<template>
  <div class="bg-white h-[100vh] w-full">
    <div class="flex justify-between">
      <NuxtLink to="/" class="mx-2 my-2">
        <img src="/icons/searchPage/icon-back.svg" alt="">
      </NuxtLink>
      <div class="flex w-[90%] relative mx-2 my-2">
        <div class="absolute top-1 left-1">
          <img src="/icons/searchPage/icon-search.svg" alt="">
        </div>
        <input v-model="refInput" class="search-input" placeholder="Nhập nội dung tìm kiếm...">
        <img
          v-if="refInput.length > 0" class="w-8 h-8 text-primary-gray absolute right-5 top-2.5"
          src="/icons/searchPage/icon-close.svg" alt="" @click="clearInput"
        >
      </div>
    </div>
    <section class="bg-white h-[calc(100vh_-_44px)] overflow-auto scrollbar-hide">
      <h2 class="font-bold text-2xl text-black p-4">
        #Từ khoá Hot
      </h2>
      <div class="flex flex-wrap px-5">
        <span v-for="comicName in comicNameSuggestion" :key="comicName" v-memo="comicNameSuggestion" class="search-hotkey mx-4 my-2" @click="refInput = comicName">
          {{ comicName }}
        </span>
      </div>
      <h2 class="font-bold text-2xl text-black p-4">
        Truyện tranh ({{ searchData.length ? searchData.length : 0 }})
      </h2>
      <CommonSearchLoading v-if="loading" class="w-16 h-16" />
      <div v-if="searchData && searchData.length > 0 && !loading" class="result grid grid-cols-1 md:grid-cols-2 overflow-y-scroll scrollbar-hide">
        <div v-for="comic in searchData" :key="comic._id" class="p-4 col-span-1">
          <NuxtLink class="flex items-center" :to="useNavigatorComicPreview(comic.slug, comic._id)">
            <SharedMeeToonImg
              class="rounded-xl w-[75px] h-[100px] object-cover"
              :src="comic.verticalLogo"
              fil="fill"
            />
            <div class="px-5" style="width: calc(100% - 102px)">
              <h3 class="text-xl font-semibold line-clamp-1 mb-1">
                <NuxtLink :to="useNavigatorComicPreview(comic.slug, comic._id)">
                  {{ comic.comicName }}
                </NuxtLink>
              </h3>
              <span class="line-clamp-2 text-primary-gray text-base">
                {{ comic.description }}
              </span>
              <p class="text-background my-2 text-base">
                Chương {{ comic.newestChapter }}
              </p>
              <div class="flex items-center">
                <div class="text-primary-gray mb-3 text-base flex items-center mr-4">
                  <img class="mr-1 w-6" src="/icons/searchPage/icon-view-count.svg" alt="">
                  <span>
                    {{ convertUnit(comic.viewCount) }}
                  </span>
                </div>
                <div class="text-primary-gray mb-3 text-base flex items-center">
                  <img class="mr-1" src="/icons/searchPage/icon-star.svg" alt="">
                  <span>
                    ({{ comic.reviewCount }})
                  </span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
