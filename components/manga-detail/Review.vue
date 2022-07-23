<script setup>
import {DocumentIcon, ChevronRightIcon, ChevronLeftIcon, PencilIcon} from '@heroicons/vue/solid'

const moreReview = ref(false);
defineProps({
  review: String
})
</script>

<template>
  <div class="detail-content">
    <div class="">
      <span class="relative" :class="{'shortened' : !moreReview }">
        <span class="text-xl">💡</span> {{ review }}
      </span>
    </div>

      <a v-if="!moreReview" class="morelink flex items-center text-base text-primary" @click="moreReview = true">
        Xem thêm
        <ChevronRightIcon class="h-5 w-5"/>
      </a>

      <a v-if="moreReview" class="morelink flex items-center text-base text-primary" @click="moreReview = false">
        <ChevronLeftIcon class="h-5 w-5"/>
        Thu gọn
      </a>
    </div>
</template>