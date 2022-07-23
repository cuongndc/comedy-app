<script lang="ts" setup>
import {Manga} from "~/types";
import {useFetch} from "#app";

const [{data: ngonTinh, pending}, {data: damMy}, {data: xuyenKhong}] = await Promise.all([
  useFetch<Manga[]>(`/api/ngon-tinh`),
  useFetch<Manga[]>(`/api/dam-my`),
  useFetch<Manga[]>(`/api/xuyen-khong`)
]);

</script>

<template>
  <main class="h-[auto] bg-white">
    <LazySectionSpotlight/>
    <LazySharedBannerBar/>
    <LazyVisitedComic/>
    <LazyHomePageMangaUpdated/>
    <LazyHomePageNewFeed
        v-if="!pending"
        title="# Ngôn tình cổ đại"
        cateSlug="ngon-tinh"
        :mangas="ngonTinh"/>
    <LazyHomePageCatelog/>
    <LazyHomePageNewFeed
        v-if="!pending"
        title="# Đam mỹ bách hợp"
        cateSlug="dam-my"
        :mangas="damMy"/>
    <LazyHomePageNewFeed
        v-if="!pending"
        title="# Xuyên không"
        cateSlug="xuyen-khong-205"
        :mangas="xuyenKhong"/>
    <LazyHomePageNewStory class="mt-10"/>
    <LazyHomePageMaybeLove/>
    <!--    <LazyHomePageRankList/>-->
  </main>
</template>
