<script lang="ts" setup>
import axios from 'axios'
import type { IHomePage } from '~/types'
import { HomePageTypes } from '~/types'
import { useAsyncData, useRuntimeConfig } from '#app'

import { LazyHomepageNewStory, LazyHomepageRepresentCategory, LazyHomepageSpotlight, LazyHomepageTrending, PulseHomeLoading, SharedBannerBar } from '#components'
const config = useRuntimeConfig()
const { data: homepages, pending } = await useAsyncData<IHomePage>('home-page', () => axios.get('/api/wb/homepage', {
  baseURL: config.public.publicURL,
}).then(res => res.data))
</script>

<template>
  <div v-if="pending" class="bg-white">
    <PulseHomeLoading />
  </div>
  <main v-else class="h-[auto] bg-white">
    <div v-for="record in homepages.data" :key="record._id">
      <LazyHomepageSpotlight
        v-if="record.type === HomePageTypes._banner"
        :banner="record"
      />
      <SharedBannerBar v-if="record.type === HomePageTypes._menu" />
      <LazyHomepageTrending v-if="record.type === HomePageTypes._trend" :record="record" />
      <LazyHomepageRepresentCategory v-if="record.type === HomePageTypes._representCategory" :record="record" />
      <LazyHomepageNewStory
        v-if="record.type === HomePageTypes._newest || record.type === HomePageTypes._recommendation"
        :record="record"
      />
    </div>
  </main>
</template>
