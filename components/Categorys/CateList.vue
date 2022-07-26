<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from '#app'

defineProps({
  cates: Array,
})
const route = useRoute()
const params = route.params
const cate = ref(params.cate)
const top = ref(params.top)
</script>

<template>
  <NuxtLink
    v-for="cateD in cates"
    :key="cateD.slug"
    :to="cateD.router"
    :class="cate === cateD.slug || top === cateD.slug ? 'text-red-500 border-red-500' : 'text-gray-800'"
    class="flex items-center justify-center w-[110px] h-[50px] p-3 border-gray-200 rounded-2xl border text-xl text-center font-bold mx-2 my-2"
  >
    {{ cateD.title }}
  </NuxtLink>
</template>
