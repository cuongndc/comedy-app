<script lang="ts" setup>
defineProps({
  searchData: Object
});

</script>

<template>
  <section class="bg-white">
    <h2 class="font-bold text-2xl text-black p-4">
      Truyện tranh ({{ searchData.length ? searchData.length : 0 }})
    </h2>
    <div class="result grid grid-cols-1 md:grid-cols-2">
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
</template>