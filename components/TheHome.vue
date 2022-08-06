<script lang="ts" setup>
import type { IHomePage } from '~/types'
import { HomePageTypes } from '~/types'
import { useFetch, useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const { data: homepages, pending } = useFetch<IHomePage>('/api/homepage')
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
      <SharedBannerBar
        v-if="record.type === HomePageTypes._menu"
      />
      <LazyHomepageTrending
        v-if="record.type === HomePageTypes._trend"
        :record="record"
      />
      <LazyHomepageRepresentCategory
        v-if="record.type === HomePageTypes._representCategory"
        :record="record"
      />
      <LazyHomepageNewStory
        v-if="record.type === HomePageTypes._newest || record.type === HomePageTypes._recommendation"
        :record="record"
      />
    </div>
  </main>
</template>
