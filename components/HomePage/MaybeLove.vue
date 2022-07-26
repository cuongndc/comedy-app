<script setup lang="ts">
import { useFetch } from '#imports'

const { data: mangas, pending } = useFetch('/api/recommend-story?genres=manhua')
</script>

<template>
  <div class="px-3 mb-4 mt-8">
    <h2 class=" h-[20px] text-3xl font-bold flex justify-start items-center text-black">
      # Được đề xuất
    </h2>
    <PulseMaybeLoveLoading v-if="pending" />
    <div v-else>
      <div class="grid grid-cols-4 gap-4">
        <div v-for="manga in mangas" class="col-span-1  mt-5" :key="manga.slug">
          <NuxtLink :to="useNavigatorComicPreview(manga.slug)">
            <SharedImg
              loading="lazy" class="rounded-xl h-[100px] w-full object-cover" format="webp"
              :src="manga.thumbnail" fil="fill"
            />
          </NuxtLink>
          <h2 class="text-base line-clamp-1 mt-1 text-black font-semibold">
            {{ manga.name }}
          </h2>
          <p class="text-sm text-zinc-500 line-clamp-1 font-secondary">
            <a v-for="genre in manga.genres" :key="genre" class="text-sm font-secondary text-zinc-500 mr-1">
              {{ genre }}
            </a>
          </p>
          <p class="text-sm text-zinc-500 line-clamp-1 font-secondary">
            <a class="text-sm font-secondary text-zinc-500 mr-1">
              {{ manga.newChapter }}
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
