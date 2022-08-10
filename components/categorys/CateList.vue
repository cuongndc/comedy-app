<script setup lang="ts">
import { ref } from 'vue'
import { navigateTo, useRoute } from '#app'

defineProps({
  categories: Array,
})
const route = useRoute()
const params = route.params
const slug = ref(params.slug)
const to = (cate) => {
  return navigateTo(cate)
}
</script>

<template>
  <NuxtLink
    v-for="cate in categories"
    :key="cate.slug"
    :class="slug === cate.slug ? 'text-red-500 border-red-500' : 'text-gray-800'"
    class="flex items-center justify-center w-[110px] h-[50px] p-3 border-gray-200 rounded-2xl border text-xl text-center font-normal mx-2 my-2"
    @click="to(cate.router)"
  >
    {{ cate.label }}
  </NuxtLink>
</template>
