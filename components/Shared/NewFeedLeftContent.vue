<script setup lang="ts">
import type { PropType } from 'vue'
import type { IManga } from '~/types'

defineProps({
  comicsReviewNewest: Array,
})
</script>

<template>
  <div class="absolute bottom-[13px] left-[13px]">
    <NuxtLink :to="useNavigatorComicPreview(mangas[mangas.length - 1].slug)">
      <div class=" max-w-full w-[105px]">
        <div class="relative pb-[133.3333%]">
          <SharedImg
            class="rounded-2xl visible h-full left-0 absolute top-0 w-full"
            :src="mangas[mangas.length - 1].thumbnail"
          />
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
