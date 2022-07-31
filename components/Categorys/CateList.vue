<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from '#app'

defineProps({
  categories: Array,
})
const route = useRoute()
const params = route.params
const slug = ref(params.slug)
</script>

<template>
  <NuxtLink
    v-for="cate in categories"
    :key="cate.slug"
    :to="cate.router"
    :class="slug === cate.slug ? 'text-red-500 border-red-500' : 'text-gray-800'"
    class="flex items-center justify-center w-[110px] h-[50px] p-3 border-gray-200 rounded-2xl border text-xl text-center font-semibold mx-2 my-2"
  >
    {{ cate.label }}
  </NuxtLink>
</template>
