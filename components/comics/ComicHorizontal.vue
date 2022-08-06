<script setup lang="ts">
import { COMIC_STATUS } from '~/contants'
import useNavigatorComicPreview from '~/composables/useNavigatorComicPreview'

defineProps({
  _id: String,
  chapNumber: String,
  className: String,
  adultContent: Boolean,
  slug: String,
  status: String,
  verticalLogo: String,
  comicName: String,
  tags: Array,
})
</script>

<template>
  <NuxtLink
    :to="useNavigatorComicPreview(slug, _id)"
    :title="comicName"
  >
    <div class="inline-block w-[105px] mr-6">
      <div class="relative">
        <div class="absolute top-[-3px] left-1 w-full z-10">
          <span
            class="inline-block px-3 rounded-xl bg-primary font-bold text-white text-sm"
          >
            {{ COMIC_STATUS[status] }}
          </span>
        </div>
        <LazySharedMeeToonImg
          :alt="comicName"
          sizes="sm:100px 2xs:150px md:200px md:250px"
          :width="105"
          :height="140"
          class="rounded-2xl w-full"
          :src="verticalLogo"
        />
      </div>
      <h3
        class="text-xl line-clamp-1 mt-1 text-black font-semibold"
        :title="comicName"
      >
        {{ comicName }}
      </h3>
      <p v-if="tags && tags.length > 0" class="text-primary-gray text-base font-medium line-clamp-1">
        #{{ tags[0].name }}
      </p>
      <p v-if="chapNumber" class="text-primary-gray text-base">
        Chương {{ chapNumber }}
      </p>
    </div>
  </NuxtLink>
</template>
