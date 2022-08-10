<script setup lang="ts">
import type { PropType } from 'vue'
import type { Comic } from '~/types'
import { COMIC_STATUS } from '~/contants'
import { LazySharedMeeToonImg } from '#components'

defineProps({
  novels: Object as PropType<Comic[]>,
})
</script>

<template>
  <div class="grid grid-cols-3">
    <NuxtLink v-for="novel in novels" :key="novel.slug" class="flex items-center p-4 grid-cols-1" :to="useNavigatorNovel(novel?.slug)">
      <div class="mr-6">
        <div class="relative">
          <div class="absolute top-[-3px] left-1 w-full z-10">
            <span
              class="inline-block px-3 rounded-xl bg-[#1fcf84] font-semibold text-white text-base my-2"
            >
              {{ COMIC_STATUS[novel.novelStatus] }}
            </span>
          </div>
          <LazySharedMeeToonImg
            :alt="novel.name"
            sizes="sm:100px 2xs:150px md:200px md:250px"
            :width="105"
            :height="140"
            class="rounded-2xl w-full"
            :src="novel.verticalLogo"
          />
        </div>
        <h3
          class="text-xl line-clamp-2 mt-1 text-black font-semibold"
          :title="novel.name"
        >
          {{ novel.name }}
        </h3>
        <p v-if="novel.tags && novel.tags.length > 0" class="text-primary-gray text-base font-medium line-clamp-1">
          #{{ novel.tags[0].name }}
        </p>
        <p v-else class="text-primary-gray text-base font-medium line-clamp-1">
          #
        </p>
        <p v-if="novel.newestChapter" class="text-primary-gray text-base">
          Chương {{ novel.newestChapter }}
        </p>
      </div>
      <!--      <div class="relative"> -->
      <!--        <LazySharedMeeToonImg -->
      <!--          class="w-[125px] h-[168px]" -->
      <!--          :width="125" -->
      <!--          :height="168" -->
      <!--          :lazy="true" -->
      <!--          :src="novel?.verticalLogo" -->
      <!--          fil="fill" -->
      <!--        /> -->
      <!--        <div class="absolute bottom-0 bg-deep-black h-[30px] w-full rounded-b-xl opacity-80" /> -->
      <!--        <div -->
      <!--          class="absolute bottom-0 w-full text-xl font-semibold text-white h-[30px] flex items-center justify-center" -->
      <!--        > -->
      <!--          <a>Chương {{ novel?.newestChapter }}</a> -->
      <!--        </div> -->
      <!--      </div> -->
      <!--      <div class="px-5 h-[168px]" style="width: calc(100% - 102px)"> -->
      <!--        <h3 class="text-1xl font-semibold line-clamp-1 mb-1"> -->
      <!--          <a> -->
      <!--            {{ novel?.name }} -->
      <!--          </a> -->
      <!--        </h3> -->
      <!--        <p class="text-primary-gray mb-3 text-base line-clamp-3"> -->
      <!--          {{ novel?.description }} -->
      <!--        </p> -->
      <!--        <p class="text-primary-gray text-xl"> -->
      <!--          Lượt xem: {{ convertUnit(novel?.viewCount) }} -->
      <!--        </p> -->
      <!--        <p class="text-primary-gray text-xl mt-4"> -->
      <!--          Cập nhật cuối: {{ new Date(novel?.updatedAt).toLocaleDateString('vi-VN') }} -->
      <!--        </p> -->
      <!--      </div> -->
    </NuxtLink>
  </div>
</template>
