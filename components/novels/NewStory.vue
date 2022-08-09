<script lang="ts" setup>
import { LazyNovelsNovelHorizontal } from '#components'

defineProps({
  record: Object,
})
</script>

<template>
  <div class="px-4 mb-4 mt-10">
    <h2 class=" h-[20px] text-3xl font-bold flex justify-start items-center text-black mb-4">
      # {{ record.typeName }}
    </h2>
    <div class="whitespace-nowrap overflow-x-auto mb-10 scrollbar-hide">
      <LazyNovelsNovelHorizontal
        v-for="novel in record.content"
        :key="novel.slug"
        :_id="novel._id"
        :adult-content="novel.adultContent"
        :chap-number="novel.newestChapter"
        :name="novel.name"
        :slug="novel.slug"
        :status="novel.status"
        :vertical-logo="novel.verticalLogo"
      />
    </div>
  </div>
</template>
