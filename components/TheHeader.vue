<script setup>
import {useRoute} from "#app";
import {ref} from "vue";

const route = useRoute();

const scrollTransform = ref(0);
if (typeof document !== 'undefined')
  document.addEventListener('scroll', (e) => {
    scrollTransform.value = window.pageYOffset || document.documentElement.scrollTop;
  });

</script>

<template>
  <div :class="scrollTransform === 0  ? '' : 'bg-black/70'"
      class="max-w-[450px] md:max-w-[750px] px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-36 px-4 md:px-12 flex items-center h-24 fixed top w-full z-50 transition duration-500 to-transparent">
    <div class="mr-4">
      <NuxtLink class="flex items-center" to="/" v-if="route.name !== 'index'">
        <SvgBack class="h-12 w-12 text-white"/>
      </NuxtLink>
    </div>
    <div class="flex items-center space-x-4 ml-auto">
      <form @click="open" class="flex">
        <div class="h-full w-fit rounded-2xl p-4 hover:cursor-pointer hover:opacity-60 text-background flex items-center">
          <NuxtLink to="/filter">
            <SvgSearch class="mr-4"/>
          </NuxtLink>
          <SvgNotify class=""/>
        </div>
      </form>
    </div>
  </div>
</template>