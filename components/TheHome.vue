<script lang="ts" setup>
import type { IHomePage } from '~/types'
import { HomePageTypes } from '~/types'
import { useFetch } from '#app'
const { data: homepages, pending } = await useFetch<IHomePage>('/api/homepage')
</script>

<template>
  <main class="h-[auto] bg-white">
    <div v-for="record in homepages" :key="record._id" v-memo="homepages">
      <LazySectionSpotlight
        v-if="record.type === HomePageTypes._banner"
        :banner="record"
      />
      <LazySharedBannerBar v-if="record.type === HomePageTypes._menu" />
      <LazyHomePageTrending v-if="record.type === HomePageTypes._trend" :trending="record" />
      <LazyHomePageRepresentCategory v-if="record.type === HomePageTypes._representCategory" :record="record" />
      <LazyHomePageNewStory v-if="record.type === HomePageTypes._newest || record.type === HomePageTypes._recommendation" :record="record" />
    </div>

    <!--    <div v-for="newFeed in newFeeds" :key="newFeed.id"> -->
    <!--      <LazyHomePageNewFeed :new-feed="newFeed" /> -->
    <!--    </div> -->
    <!--    <LazyHomePageNewFeed v-if="!pending" title="# Ngôn tình cổ đại" cateSlug="co-dai-207" :mangas="ngonTinh"/> -->
    <!--    <LazyHomePageCatelog/> -->
    <!--    <LazyHomePageNewFeed v-if="!pending" title="# Đam mỹ bách hợp" cateSlug="dam-my" :mangas="damMy"/> -->
    <!--    <LazyHomePageNewFeed v-if="!pending" title="# Xuyên không" cateSlug="xuyen-khong-205" :mangas="xuyenKhong"/> -->
    <!--    <LazyHomePageNewStory class="mt-10" /> -->
    <!--    <LazyHomePageMaybeLove /> -->
  </main>
</template>
