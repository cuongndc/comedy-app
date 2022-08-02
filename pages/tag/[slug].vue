<script setup lang="ts">
import { onMounted } from 'vue'
import type { Comic } from '~/types'
import SearchLoading from '~/components/common/SearchLoading.vue'

const route = useRoute()
const params = route.params

const slug = ref(params.slug)
const loading = ref(false)
const comics = useState<Comic[]>('comics')
onMounted(async () => {
  loading.value = true
  comics.value = await $fetch(`/api/tag/${slug.value}`)
  loading.value = false
})
</script>

<template>
  <div class="bg-white h-[100vh]">
    <div class="flex justify-between justify-center" style="box-shadow: rgb(242 242 242) 0 -1px 0 inset">
      <NuxtLink to="/" class="mx-2 my-2 flex items-center">
        <img src="/icons/header/icon-back-white.svg" alt="back">
      </NuxtLink>
      <div class="flex items-center justify-center w-[70%] mx-2 my-2 text-4xl text-black font-semibold">
        #Danh mục truyện
      </div>
      <NuxtLink to="/tim-kiem" class="flex items-center mr-2 h-[40px] w-[30px] mx-2 my-2 rounded-2xl text-white">
        <img src="/icons/header/icon-search.svg" alt="search">
      </NuxtLink>
    </div>
    <div class="flex flex-wrap p-4 bg-white">
      <SearchLoading v-if="loading" class="w-[150px] h-[50px]" />
      <section v-else ref="scrollComponent" class="mt-4 overflow-auto scrollbar-hide" style="height: calc(100vh - 50px)">
        <LazyCategorysComicItem :comics="comics" />
      </section>
    </div>
  </div>
</template>
