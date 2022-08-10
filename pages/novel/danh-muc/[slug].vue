<script setup lang="ts">
import { watchEffect } from 'vue'
import CateList from '~/components/categorys/CateList.vue'
import { novelCategories } from '~/contants'
import SearchLoading from '~/components/common/SearchLoading.vue'
import { useLazyAsyncData } from '#app'
import { LazyNovelsCategoriesNoveItem } from '#components'
import PageLoading from '~/components/common/PageLoading.vue'

const route = useRoute()
const params = route.params

const slug = ref(params.slug)
const loading = ref(false)
const { data: novels, pending, refresh } = await useLazyAsyncData('novels', () => $fetch(`/api/novel/danh-muc/${slug.value}`))

watchEffect(() => {
  refresh()
})
</script>

<template>
  <div>
    <PageLoading v-if="pending" />
    <div class="bg-white h-[100vh]">
      <div class="flex justify-between justify-center" style="box-shadow: rgb(242 242 242) 0 -1px 0 inset">
        <NuxtLink class="mx-2 my-2 flex items-center" to="/novel">
          <img src="/icons/header/icon-back-white.svg" alt="back">
        </NuxtLink>
        <div class="flex items-center justify-center w-[70%] mx-2 my-2 text-4xl text-black font-semibold">
          #Danh mục truyện chữ
        </div>
        <NuxtLink to="/tim-kiem" class="flex items-center mr-2 h-[40px] w-[30px] mx-2 my-2 rounded-2xl text-white">
          <img src="/icons/header/icon-search.svg" alt="search">
        </NuxtLink>
      </div>
      <div class="flex flex-wrap p-4 bg-white">
        <CateList :categories="novelCategories" />
        <section v-if="!pending" ref="scrollComponent" class="mt-4 overflow-auto scrollbar-hide" style="height: calc(100vh - 50px)">
          <LazyNovelsCategoriesNoveItem :novels="novels" />
        </section>
      </div>
    </div>
  </div>
</template>
