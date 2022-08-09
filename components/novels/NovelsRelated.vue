<script setup lang="ts">
import { onMounted } from 'vue'
import type { Comic } from '~/types'
import { COMIC_STATUS } from '~/contants'
import useNavigatorNovel from '~/composables/useNavigatorNovel'

const { tags } = defineProps({
  tags: Array as () => string[],
})

const comicsRelated = useState<Comic[]>('comicsRelated')
onMounted(async () => {
  comicsRelated.value = await $fetch('/api/novel/related', {
    method: 'POST',
    body: {
      tags,
    },
  })
})
</script>

<template>
  <div class="px-5 py-5 mb-14" style="border-top: 3px solid rgb(27, 28, 35)">
    <div class=" flex items-center justify-between">
      <h2 class="text-white font-bold text-3xl mb-7">
        Đề xuất liên quan
      </h2>
    </div>
    <div class="whitespace-nowrap overflow-x-auto scrollbar-hide min-h-[200px]">
      <div v-for="comicRelated in comicsRelated" :key="comicRelated._id" class="inline-block w-[105px] mr-6">
        <div class="relative">
          <div class="absolute top-[-3px] left-0 w-full z-10">
            <span
              class="inline-block bg-primary px-3 rounded-xl bg-primary font-bold text-white text-xl"
            >
              {{ COMIC_STATUS[comicRelated.status] }}
            </span>
          </div>
          <NuxtLink
            :to="useNavigatorNovel(comicRelated.slug)"
            :title="comicRelated.comicName"
          >
            <LazySharedMeeToonImg
              class="rounded-2xl"
              :src="comicRelated.verticalLogo"
            />
          </NuxtLink>
        </div>
        <h3 class="line-clamp-1">
          <NuxtLink
            class="text-white font-bold text-xl"
            :title="comicRelated.comicName"
            :to="useNavigatorNovel(comicRelated.slug)"
          >
            {{ comicRelated.name }}
          </NuxtLink>
        </h3>
        <p class="text-gray-100 text-base">
          Chương {{ comicRelated.newestChapter }}
        </p>
      </div>
    </div>
  </div>
</template>
