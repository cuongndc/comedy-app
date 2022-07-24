<script setup lang="ts">
import {watchEffect, ref, onMounted, onUnmounted} from "vue";
import {useFetch, useRoute} from "#app";

const route = useRoute();
const params = route.params;
const cate = ref(params.cate)
const page = ref(1)
const {pending, data: mangas, refresh} = await useFetch(`/api/filter`, {
  params: {
    page: page.value,
    genres: cate.value,
  }
});
watchEffect(async () => {
  await refresh();
})
</script>

<template>
  <CommonPageLoading v-if="pending"/>
  <div class="bg-white h-[100vh]" v-else>
    <div class="flex justify-between justify-center" style="box-shadow: rgb(242 242 242) 0 -1px 0 inset">
      <NuxtLink to="/" class="mx-2 my-2 flex items-center">
        <SvgHeaderFilterBack/>
      </NuxtLink>
      <div class="flex items-center w-[70%] mx-2 my-2 text-4xl text-black font-bold">
        #Danh mục truyện
      </div>
      <NuxtLink to="/filter" class="flex items-center mr-2 h-[40px] w-[30px] mx-2 my-2 rounded-2xl text-white">
        <SvgSearchFilterHeader/>
      </NuxtLink>
    </div>
    <div class="flex flex-wrap p-4 bg-white">
      <CategorysCateList :cates="cates" v-once/>
      <section ref="scrollComponent" class="mt-4 overflow-auto scrollbar-hide" style="height: calc(100vh - 200px)">
        <LazyCategorysComicItem :mangas="mangas"/>
      </section>
    </div>
  </div>
</template>