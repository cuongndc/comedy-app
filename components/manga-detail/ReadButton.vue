<script lang="ts" setup>
import useFirstPathChapter from "~/composables/useFirstPathChapter";
import {navigateTo, useRoute, ref} from '#imports';
import {HeartIcon, ShareIcon} from "@heroicons/vue/outline";

const route = useRoute();
const params = route.params;
const slug = ref(params.slug);

const share = () => {

}
const follow = () => {

}
const navigateToManga = async () => {
  const path = await useFirstPathChapter(null, slug.value);
  return navigateTo({
    path: path
  })
}
</script>

<template>
  <div class="md:max-w-[750px] read-action fixed bottom-0 h-[60px] flex items-center w-full justify-between max-w-[450px] read-bar">
    <div class="flex items-start ml-10">
      <div class="text-dark mr-8" @click="share">
        <div class="flex items-center justify-center">
          <ShareIcon class="h-8 w-8"/>
        </div>
        <a class="text-base">Chia sẻ</a>
      </div>
      <div class="text-dark" @click="follow">
        <div class="flex items-center justify-center">
          <HeartIcon class="h-8 w-8"/>
        </div>
        <a class="text-base">Follow</a>
      </div>
    </div>

    <div>
      <button
          class="btn bg-primary mr-5 h-[35px] text-base hover:bg-highlight flex items-center justify-center w-[160px] rounded-[60px]"
          @click="navigateToManga">
        <a>Đọc từ đầu</a>
      </button>
    </div>

  </div>
</template>