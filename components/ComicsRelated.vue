<script setup lang="ts">
import { onMounted } from 'vue'
import type { Comic } from '~/types'
import { COMIC_STATUS } from '~/contants'
import useNavigatorComicPreview from '~/composables/useNavigatorComicPreview'

const { tags } = defineProps({
  tags: Array as () => string[],
})

const comicsRelated = useState<Comic[]>('comicsRelated')
onMounted(async () => {
  comicsRelated.value = await $fetch('/api/comic/related', {
    method: 'POST',
    body: {
      tags,
    },
  })
})
</script>

<template>
  <div class="px-5 py-5 mb-10" style="border-top: 3px solid rgb(27, 28, 35)">
    <div class=" flex items-center justify-between">
      <h2 class="text-white font-bold text-3xl mb-7">
        Đề xuất liên quan
      </h2>
    </div>
    <div class="whitespace-nowrap overflow-x-auto mb-10 scrollbar-hide min-h-[100px]">
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
            :to="useNavigatorComicPreview(comicRelated.slug, comicRelated._id)"
            :title="comicRelated.comicName"
          >
            <div>
              <SharedMeeToonImg
                :width="105"
                :lazy-src="comicRelated.verticalLogo"
                :src="comicRelated.verticalLogo"
              />
            </div>
          </NuxtLink>
        </div>
        <h3 class="w-[100px] line-clamp-1">
          <NuxtLink
            class="text-white font-bold text-xl"
            :title="comicRelated.comicName"
            :to="useNavigatorComicPreview(comicRelated.slug, comicRelated._id)"
          >
            {{ comicRelated.comicName }}
          </NuxtLink>
        </h3>
      </div>
    </div>
  </div>
</template>
