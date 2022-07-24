<script lang="ts" setup>
import { IManga } from "~/types";
import { useFetch } from "#app";

const [{ data: ngonTinh, pending }, { data: damMy }, { data: xuyenKhong }] = await Promise.all([
  useFetch<IManga[]>(`/api/ngon-tinh`),
  useFetch<IManga[]>(`/api/dam-my`),
  useFetch<IManga[]>(`/api/xuyen-khong`)
]);

</script>

<template>
  <main class="h-[auto] bg-white">
    <LazySectionSpotlight />
    <LazySharedBannerBar />
    <LazyVisitedComic />
    <LazyHomePageMangaUpdated />
    <LazyHomePageNewFeed v-if="!pending" title="# Ngôn tình cổ đại" cateSlug="co-dai-207" :mangas="ngonTinh" />
    <LazyHomePageCatelog />
    <LazyHomePageNewFeed v-if="!pending" title="# Đam mỹ bách hợp" cateSlug="dam-my" :mangas="damMy" />
    <LazyHomePageNewFeed v-if="!pending" title="# Xuyên không" cateSlug="xuyen-khong-205" :mangas="xuyenKhong" />
    <LazyHomePageNewStory class="mt-10" />

  </main>
</template>
