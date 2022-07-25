<script lang="ts" setup>
import {keys, ComicPreview} from "~/types";
import {TabGroup, TabList, Tab, TabPanels, TabPanel} from '@headlessui/vue'
import {watchEffect} from "vue";
import {useStorage} from "@vueuse/core";
import PageLoading from "~/components/common/PageLoading.vue";

const route = useRoute();
const params = route.params;
const slug = ref(params.slug);

const {
  data: manga,
  pending,
  refresh
} = await useFetch<ComicPreview>('/api/comic', {
  params: {
    slug: slug.value,
  }
});
const backgroundImage = (spotlight) => {
  return {
    backgroundImage: `url(${spotlight.thumbnail})`,
  }
}
const categories = ref({
  'Chi tiết': [] as any,
  'Chapters': [] as any,
})
watchEffect(async () => {
  const cache: any = useStorage(keys.comicCacheLocalPreview, {
    serializer: {
      read: (v: any) => v ? JSON.parse(v) : null,
      write: (v: any) => JSON.stringify(v),
    }
  });

  cache.value = null
  cache.value = {
    slug: slug,
    ...manga.value,
  }

  slug.value = params.slug
  categories.value['Chi tiết'] = [
    {
      id: 1,
      ...manga.value
    }
  ]
  categories.value['Chapters'] = [
    {
      id: 2,
      ...manga.value?.chapterList
    }
  ]
  await refresh();
});
const getView = (view) => {
  const pView = parseFloat(view.replaceAll('.' ,''))
  if (pView > 1000000) {
    return `${(pView / 1000000).toFixed(1)} Triệu`
  } else if (pView > 1000) {
    return `${(pView / 1000).toFixed(1)} Nghìn`
  } else {
    return `${pView}`
  }
}
const getFollow = (follow) => {
  if (parseFloat(follow)) {
    return parseFloat(follow).toFixed(2) + 'K'
  }

  return 'N/a'
}

useHead({
  title: manga.value?.title,
  meta: [
    {
      name: 'description',
      content: manga.value?.author,
    },
    {
      name: 'keywords',
      content: manga.value?.title,
    },
  ]
})
</script>

<template>
  <div>
    <PageLoading v-if="pending" />
    <NuxtLayout name="manga" v-else>
      <div class="relative flex h-[100vh] flex-col bg-accent-4">
        <LazyMangaPreviewReadButton/>
        <div class=" aspect-w-16 aspect-h-9 rounded-xl-md">
          <div
              class="z-20 absolute fixed-0 bg-gradient-to-b from-transparent via-black/60 to-black/80 flex items-end bottom-0 w-full">
            <div class="p-4 w-full">
              <h1 class="text-xl font-bold uppercase line-clamp-2 text-white w-[70%] h-[35px]">
                <a class="flex items-end h-[100%]">{{ manga.title ? manga.title : manga.name }}</a>
              </h1>
              <div class="flex flex-wrap items-center mt-4 text-lg gap-x-8">
                <div class="flex items-center gap-x-2">
                  <p class="text-white bg-highlight banner-author">
                    <a class="p-3">{{ manga.author ? manga.author : 'Đang cập nhật' }}</a>
                  </p>
                </div>
                <div class="flex items-center gap-x-2">
                  <p class="text-white flex items-center">
                    <span class="text-xs mr-1">📆</span>
                    {{ manga.status }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <figure class="deslide-cover w-full bg-cover bg-center bg-no-repeat"
                  :style="backgroundImage(manga)">
          </figure>
          <SharedImg class="z-10 object-contain" :src="manga.thumbnail"/>
        </div>
        <div id="item-detail" class="mx-auto mt-4 w-[95%] grid grid-cols-1">
          <div class="detail-info-counts bg-primary mb-2">
            <div class="detail-info-count-item">
              <p class="detail-info-count-item-value text-white">
                {{ getView(manga.view) }}
              </p>
              <p class="detail-info-count-item-label text-white">
                Lượt xem
              </p>
            </div>
            <div class="detail-info-count-item">
              <p class="detail-info-count-item-value text-white">
                {{ getFollow(manga.follow) }}
              </p>
              <p class="detail-info-count-item-label text-white">
                Follow
              </p>
            </div>
            <div class="detail-info-count-item">
              <p class="detail-info-count-item-value text-white">
                <span>4.5</span>/5
              </p>
              <p class="detail-info-count-item-label text-white">Đánh giá</p>
            </div>
          </div>
          <TabGroup>
            <TabList class="flex space-x-1 rounded-xl flex justify-around">
              <Tab v-for="category in Object.keys(categories)" as="template" :key="category" v-slot="{ selected }">
                <button :class="[
                    'w-full py-2.5 text-xl leading-5 w-[100px]',
                    selected
                      ? 'shadow text-primary border-b-[1px] border-rose-900'
                      : 'border-b-[1px] border-gray-600 text-primary-gray']">
                  {{ category }}
                </button>
              </Tab>
            </TabList>
            <TabPanels class="mt-2 px-3">
              <TabPanel v-for="(cates, cId) in Object.values(categories)" :key="cId">
                <div v-for="cate in cates" :key="cate.id">
                  <div v-if="cate.id === 1">
                    <h4 class="text-base leading-7 text-dark mt-2">
                      <LazyMangaPreviewReview :review="cate.review"/>
                    </h4>
                    <div class="flex flex-wrap mt-4">
                      <span class="mr-2">🎓</span>
                      <span class="banner-author text-white bg-highlight mr-3 flex items-center h-[20px]"
                            v-for="genre in manga.genres">
                              <a class="p-3 text-base line-clamp-1">
                                {{ genre.genreTitle }}
                              </a>
                            </span>
                    </div>
                  </div>
                  <div v-if="cate.id === 2">
                    <LazyMangaChaplist :slug="slug" :chapterList="cate"/>
                  </div>
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </NuxtLayout>

  </div>
</template>

