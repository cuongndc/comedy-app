<script lang="ts" setup>
import type { IHomePage } from '~/types'
import { HomePageTypes } from '~/types'
import { useAsyncData, useFetch } from '#app'

const { data: homepages } = useFetch<IHomePage>('/api/homepage')
</script>

<template>
  <NuxtLayout>
    <LazyTheHome />
  </NuxtLayout>
  <!--  <div v-if="pending" class="bg-white"> -->
  <!--    <PulseHomeLoading /> -->
  <!--  </div> -->
<!--  <main class="h-[auto] bg-white">-->
<!--    <div v-for="record in homepages" :key="record._id" v-memo="homepages">-->
<!--      <LazyHomePageSpotlight-->
<!--        v-if="record.type === HomePageTypes._banner"-->
<!--        :banner="record"-->
<!--      />-->
<!--      <LazySharedBannerBar v-if="record.type === HomePageTypes._menu" />-->
<!--      <LazyHomePageTrending v-if="record.type === HomePageTypes._trend" :record="record" />-->
<!--      <LazyHomePageRepresentCategory v-if="record.type === HomePageTypes._representCategory" :record="record" />-->
<!--      <LazyHomePageNewStory-->
<!--        v-if="record.type === HomePageTypes._newest || record.type === HomePageTypes._recommendation"-->
<!--        :record="record"-->
<!--      />-->
<!--    </div>-->
<!--  </main>-->
</template>
