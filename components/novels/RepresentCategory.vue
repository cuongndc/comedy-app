<script lang="ts" setup>
import { COMIC_STATUS, DANH_MUC, TAG } from '~/contants'
import { LazyNovelsNovelHorizontal } from '#components'

defineProps({
  record: Object,
})
const more = (content) => {
  const ref = content.type !== 'category' ? `${TAG}/${content.slug}` : `${DANH_MUC}/${content.slug}`
  return navigateTo(ref)
}
</script>

<template>
  <div v-for="content in record.content" :key="content._id" class="px-4">
    <div class="h-[40px] mb-4 flex justify-between">
      <h2 class="text-3xl font-bold flex justify-start items-center text-black">
        {{ content.name || content.categoryVietName }}
      </h2>
      <client-only>
        <NuxtLink class="text-xl font-semibold flex items-center text-primary mr-1" @click="more(content)">
          Thêm
        </NuxtLink>
      </client-only>
    </div>
    <div v-if="content.novelsReviewNewes && content.novelsReviewNewes.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-14 mb-10">
      <div
        v-for="novel in content.novelsReviewNewest"
        :key="novel._id"
        class="col-span-1 rounded-[8px] p-13 max-w-[384px] w-full h-[138px] bg-white relative shadow-[0_3px_20px_rgba(0,0,0,10%)]"
      >
        <div class="absolute bottom-[13px] left-[13px]">
          <NuxtLink :to="useNavigatorNovel(novel.slug)">
            <div class=" max-w-full w-[105px]">
              <div class="relative">
                <div class="absolute top-0">
                  <span
                    v-if="!novel.adultContent"
                    class="bg-primary rounded-xl text-white text-xl font-bold px-3 py-1 ml-1"
                  >
                    {{ COMIC_STATUS[novel.status] }}
                  </span>
                  <span v-else class="bg-primary rounded-xl text-white text-xl font-bold px-3 py-1 ml-1">
                    17+
                  </span>
                </div>
                <SharedMeeToonImg
                  :alt="novel.name"
                  sizes="sm:100px 2xs:150px md:200px md:300px"
                  class="rounded-2xl visible h-full left-0 relative top-0 w-full"
                  :src="novel.verticalLogo"
                />
              </div>
            </div>
          </NuxtLink>
        </div>
        <div class="ml-[118px] p-4">
          <h3 class="text-xl font-medium">
            <a>{{ novel?.name }}</a>
          </h3>
          <div>
            <div class="rating flex items-center">
              <img v-for="i of 5" :key="i" src="/icons/comicPage/icon-star.svg" alt="rating">
              <p class="text-xl">
                {{ novel?.avgRate }}
                <span class="text-xl font-semibold text-gray-500"> (369)</span>
              </p>
            </div>
            <a>
              <i class="w-full text-base line-clamp-3">
                "{{ novel?.contentReview }}"
              </i>
            </a>
            <div class="mt-3">
              <a class="mt-3">
                <p class="flex items-center justify-start w-full text-gray-500">
                  <img src="/icons/comicPage/icon-comment-count.svg" class="mr-2" alt="comment">
                  <span class="name text-base font-semibold">{{ novel.userComment.name }}</span>
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="whitespace-nowrap overflow-x-auto mb-10 scrollbar-hide">
      <LazyNovelsNovelHorizontal
        v-for="novel in content.novels"
        :key="novel?.slug"
        :_id="novel?._id"
        :adult-content="novel?.adultContent"
        :chap-number="novel?.newestChapter"
        :name="novel?.name"
        :slug="novel?.slug"
        :status="novel?.status"
        :vertical-logo="novel?.verticalLogo"
        :tags="novel?.tags"
      />
    </div>
  </div>
</template>
