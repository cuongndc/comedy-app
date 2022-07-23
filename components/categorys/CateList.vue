<script setup lang="ts">
import {useRoute} from "#app";
import {ref} from "vue";

const route = useRoute();
const params = route.params;
const cate = ref(params.cate)

interface ICate {
  title: string;
  slug: string;
}

const cates: ICate[] = [
  {
    title: 'Tất cả Danh mục',
    slug: 'all'
  },
  {
    title: 'Đam mỹ bách hợp',
    slug: 'dam-my'
  },
  {
    title: 'Ngôn tình cổ đại',
    slug: 'co-dai-207'
  },
  {
    title: 'Hành động phưu lưu',
    slug: 'manhua'
  },
  {
    title: 'Xuyên không trùng sinh',
    slug: 'xuyen-khong-205'
  },
  {
    title: 'Đô thị hiện tại tu tiên',
    slug: 'truyen-mau'
  }
]
</script>

<template>
  <NuxtLink
      v-for="cateD in cates"
      :key="cateD.slug"
      :to="`/category/${cateD.slug}`"
      :class="cate === cateD.slug ? 'text-red-500 border-red-500' : 'text-gray-800'"
      class="w-[110px] h-[50px] p-3 border-gray-200 rounded-2xl border text-xl text-center font-bold mx-2 my-2">
    {{ cateD.title }}
  </NuxtLink>
</template>