<script lang="ts" setup>
import { newFeeds } from '~/contants'
</script>

<template>
  <main class="h-[auto] bg-white">
    <LazySectionSpotlight />
    <LazySharedBannerBar />
    <LazyVisitedComic />
    <LazyHomePageMangaUpdated />

    <template v-for="newFeed in newFeeds" :key="newFeed.id">
      <LazyHomePageNewFeed :new-feed="newFeed" />
    </template>
    <!--    <LazyHomePageNewFeed v-if="!pending" title="# Ngôn tình cổ đại" cateSlug="co-dai-207" :mangas="ngonTinh"/> -->
    <!--    <LazyHomePageCatelog/> -->
    <!--    <LazyHomePageNewFeed v-if="!pending" title="# Đam mỹ bách hợp" cateSlug="dam-my" :mangas="damMy"/> -->
    <!--    <LazyHomePageNewFeed v-if="!pending" title="# Xuyên không" cateSlug="xuyen-khong-205" :mangas="xuyenKhong"/> -->
    <LazyHomePageNewStory class="mt-10" />
    <LazyHomePageMaybeLove />
  </main>
</template>
