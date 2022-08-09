<script lang="ts" setup>
import type { IHomePage } from '~/types'
import { HomePageTypes } from '~/types'
import { useLazyAsyncData } from '#app'

const { data: homepages, pending } = await useLazyAsyncData<IHomePage>('novel', () => $fetch('/api/home-novel'))
</script>

<template>
  <PulseHomeLoading v-if="pending" />
  <main v-else class="h-[auto] bg-white">
    <div v-for="record in homepages.data" :key="record._id">
      <LazyNovelsSpotlight v-if="record.type === HomePageTypes._banner" :banner="record" />
      <SharedBannerBar v-if="record.type === HomePageTypes._menu" />
      <LazyNovelsTrending v-if="record.type === HomePageTypes._hottest_in_week" :record="record" />
      <LazyNovelsRepresentCategory v-if="record.type === HomePageTypes._representCategory" :record="record" />
      <LazyNovelsNewStory
        v-if="record.type === HomePageTypes._newest || record.type === HomePageTypes._recommendation"
        :record="record"
      />
    </div>
  </main>
</template>
