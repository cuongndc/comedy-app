<script lang="ts" setup>
import type { IHomePage } from '~/types'
import { HomePageTypes } from '~/types'
import { useAsyncData } from '#app'
import SharedBannerBar from '~/components/Shared/BannerBar.vue'
import HomePageRepresentCategory from '~/components/HomePage/RepresentCategory.vue'
import HomePageNewStory from '~/components/HomePage/NewStory.vue'

const { data: homepages } = await useAsyncData<IHomePage>('home-page', () => $fetch('/api/homepage'))
</script>

<template>
  <!--  <div v-if="pending" class="bg-white"> -->
  <!--    <PulseHomeLoading /> -->
  <!--  </div> -->
  <main class="h-[auto] bg-white">
    <div v-for="record in homepages" :key="record._id" v-memo="homepages">
      <!--      <LazyHomePageSpotlight -->
      <!--        v-if="record.type === HomePageTypes._banner" -->
      <!--        :banner="record" -->
      <!--      /> -->
      <SharedBannerBar v-if="record.type === HomePageTypes._menu" />
      <!--      <LazyHomePageTrending v-if="record.type === HomePageTypes._trend" :record="record" /> -->
      <HomePageRepresentCategory v-if="record.type === HomePageTypes._representCategory" :record="record" />
      <HomePageNewStory
        v-if="record.type === HomePageTypes._newest || record.type === HomePageTypes._recommendation"
        :record="record"
      />
    </div>
  </main>
</template>
