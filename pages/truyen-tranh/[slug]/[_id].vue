<script setup lang="ts">
import { computed, onMounted, watchEffect } from 'vue'
import { convertUnit } from '~/common'
import { navigateTo, useFetch, useRuntimeConfig, useState } from '#app'
import type { Chapter, Comic } from '~/types'
import { TRUYEN_TRANH_CHAPTER, comicTabs } from '~/contants'
import ComicChapterTab from '~/components/ComicChapterTab.vue'
import ComicTab from '~/components/ComicTab.vue'

const route = useRoute()
const params = route.params
const slug = ref(params.slug)
const _id = ref(params._id)
const tab = ref<string>('comic')
const chapters = useState<Chapter[]>('chapters')
const runtimeConfig = useRuntimeConfig()

const {
  data: comic,
  pending,
  refresh,
} = await useFetch<Comic>(`/api/comic/${slug.value}/${_id.value}`)
onMounted(async () => {
  if (!comic.value)
    return
  chapters.value = await $fetch('/api/chapters', {
    params: {
      comic_slug: comic.value.slug,
    },
  })
})
watchEffect(async () => {
  await refresh()
})
const comicTab = computed(() => {
  return tab.value === comicTabs.comic
})
const chapterTab = computed(() => {
  return tab.value === comicTabs.chapter
})
const reviewTab = computed(() => {
  return tab.value === comicTabs.review
})
const setTab = (T: string) => {
  tab.value = T
}
const startRead = () => {
  if (chapters.value && chapters.value.length > 0)
    return navigateTo(`/${TRUYEN_TRANH_CHAPTER}/${chapters.value[0]?.slug}/${chapters.value[0]?._id}`)

  return ''
}
const backgroundImage = (image) => {
  return {
    backgroundImage: `url(${runtimeConfig.public.PUBLIC_IMAGE_CDN}${image})`,
  }
}
</script>

<template>
  <section>
    <div
      :style="backgroundImage(comic.squareCover)"
      class="flex items-center justify-between h-[50px] z-10 fixed top-0 w-full overflow-hidden bg-cover"
    >
      <NuxtLink to="/" class="ml-4">
        <img src="/icons/comicPage/icon-back.svg" alt="back">
      </NuxtLink>
      <div class="flex items-center bg-deep-black/50 h-[30px] rounded-2xl px-3 mr-4">
        <img class="mr-2" src="/icons/comicPage/icon-report.svg" alt="report">
        <span class="text-white text-2xl">Báo cáo</span>
      </div>
    </div>
    <div class="fixed top-0 w-full max-w-[768px]">
      <SharedMeeToonImg
        class="relative w-full"
        :src="comic.squareCover"
      />
    </div>
    <div class="relative mt-[150px]">
      <div class="px-5" style="background: linear-gradient(rgba(17, 18, 23, 0) 0%, rgba(17, 18, 23, 0.5) 33.85%, rgba(17, 18, 23, 0.8) 68.75%, rgb(17, 18, 23) 100%)">
        <div class="bg-contain p-6 bg-comic flex items-center justify-between rounded-xl" style="background-image: url(/icons/comicPage/backgroundInfo.png)">
          <div class="left">
            <div class="ComicPage__ComicName-sc-1l8m850-8 jYlKUE">
              <h1>
                {{ comic?.comicName }}
              </h1>
            </div>
            <div class="flex flex-wrap">
              <div
                class=" my-4 flex items-center justify-center rounded-xl text-primary text-base border-[1px] border-red-700 h-[20px]  w-[80px]"
              >
                Hoàn tất
              </div>
              <div class="mx-4 my-4 flex items-center text-gray-50 text-base">
                <img
                  src="/icons/comicPage/icon-view-count.svg" alt="view count"
                >
                <span class="ml-1">{{ convertUnit(comic.viewCount) }}</span>
              </div>
              <div class="mx-4 my-4 flex items-center text-gray-50 text-base">
                <img
                  class="w-[18px] h-[18px]"
                  src="/icons/comicPage/icon-follow-count.svg" alt="follow count"
                >
                <span class="ml-1">{{ convertUnit(comic.followingCount) }}</span>
              </div>
              <div class="flex items-center text-base text-gray-50">
                <img
                  src="/icons/comicPage/icon-comment-count.svg" alt="comment count"
                >
                <span class="ml-1">{{ convertUnit(comic.totalComment) }}</span>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="w-[80px] text-center cursor-pointer">
              <p class="text-yellow-400 text-4xl">
                5
              </p>
              <div class="flex items-center justify-center">
                <img v-for="i of 5" :key="i" src="/icons/comicPage/icon-star.svg" alt="rating">
              </div>
              <div>
                <span class="text-white text-xl">{{ comic.reviewCount }} Đánh giá</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-footer-comic_page px-3 fixed bottom-0 w-full h-[52px] max-w-[768px] flex items-center z-50">
      <div class="cursor-pointer">
        <img
          src="/icons/comicPage/icon-share.svg"
          alt="Chia sẻ"
        >
      </div>
      <div class="ml-6 cursor-pointer">
        <img
          src="/icons/comicPage/icon-follow.svg"
          alt="Theo dõi"
        >
      </div>
      <a class="comic-read" @click="startRead">
        Bắt đầu đọc
      </a>
    </div>
    <div class="relative bg-accent-4">
      <div class="whitespace-nowrap overflow-x-auto" style="border-bottom: 1px solid rgb(27, 28, 35)">
        <div :class="{ active: comicTab }" class="eKaTWX inline-block" @click="setTab(comicTabs.comic)">
          <span>Giới thiệu</span>
        </div>
        <div :class="{ active: chapterTab }" class="eKaTWX" @click="setTab(comicTabs.chapter)">
          <a>Chapters ({{ chapters?.length }})</a>
        </div>
        <div :class="{ active: reviewTab }" class="eKaTWX" @click="setTab(comicTabs.review)">
          <a>Đánh giá</a>
        </div>
      </div>
    </div>
    <ComicTab v-if="comicTab" :comic="comic" />
    <ComicChapterTab v-if="chapterTab" :chapters="chapters" />
  </section>
</template>

<style scoped lang="scss">
.jYlKUE {
  margin-right: 20px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}

.jYlKUE h1 {
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0px 0px 10px;
  font-size: 20px;
  font-weight: 700;
  line-height: 26px;
  color: rgb(255, 255, 255);
}

.dQstsf {
  position: fixed;
  top: 0px;
  width: 100%;
  max-width: 768px;
}

.cEgEjS {
  display: flex;
  flex-wrap: wrap;
}

.Igwhr.end {
  color: rgb(45, 203, 72);
  border-color: rgb(45, 203, 72);
}

.Igwhr {
  margin: 0px 16px 10px 0px;
  padding: 3px 5px;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 12px;
  color: rgb(0, 173, 233);
  border: 1px solid rgb(0, 173, 233);
  border-radius: 4px;
}

.bQLxpi {
  margin: 0px 16px 10px 0px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
}

.bQLxpi img {
  margin-right: 5px;
}

.bQLxpi span {
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  color: rgb(218, 218, 218);
}

.hBvvRn {
  margin: 0px 16px 10px 0px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
}

.ePWraS {
  margin: 0px 16px 10px 0px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
}

.kqexPd {
  position: relative;
  background-color: rgb(17, 18, 23);
}

.AAQSf {
  white-space: nowrap;
  overflow-x: auto;
  border-bottom: 1px solid rgb(27, 28, 35);
}

.eKaTWX {
  display: inline-block;
}

.eKaTWX.active a, .eKaTWX.active span {
  font-weight: 600;
  color: rgb(31, 207, 132);
}

.eKaTWX a, .eKaTWX span {
  display: block;
  position: relative;
  margin: 0px 15px;
  padding: 14px 0px;
  font-size: 17px;
  font-weight: 400;
  line-height: 22px;
  color: rgb(218, 218, 218);
}

.eKaTWX.active a::after, .eKaTWX.active span::after {
  content: "";
  display: block;
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 3px;
  background: rgb(31, 207, 132);
  border-radius: 3px 3px 0px 0px;
}

.eKaTWX {
  display: inline-block;
}

.eKaTWX a, .eKaTWX span {
  display: block;
  position: relative;
  margin: 0px 15px;
  padding: 14px 0px;
  font-size: 17px;
  font-weight: 400;
  line-height: 22px;
  color: rgb(218, 218, 218);
}

.dWXcPB {
  position: relative;
  background: rgb(17, 18, 23);
}

.bAA-DKX {
  display: inline-block;
  margin: 15px 13px 0px;
}

.bAA-DKX .content {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 3px 10px 3px 5px;
  border-radius: 14px;
}

.bAA-DKX span {
  margin-left: 8px;
  display: block;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  color: rgb(255, 133, 74);
}

.iDELMo.mobile {
  display: -webkit-box;
  overflow: auto hidden;
  white-space: nowrap;
}

.iDELMo {
  padding: 15px 13px;
  background: rgb(17, 18, 23);
  display: block;
  border-top: 1px solid rgb(27, 28, 35);
}

.iDELMo.mobile a {
  margin-bottom: 0px;
}

.iDELMo a {
  display: inline-block;
  margin-right: 8px;
  margin-bottom: 8px;
  padding: 5px 10px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  color: rgb(255, 255, 255);
  background: rgb(38, 40, 49);
  border-radius: 8px;
}

.gMmtuI .content {
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  padding: 9px 12px;
}

.iXLSbq {
  padding: 0px 13px;
  background: rgb(17, 18, 23);
}

.iXLSbq h3 {
  margin: 0px;
  padding: 15px 0px 5px;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  color: rgb(255, 255, 255);
}

.crztuk {
  padding: 15px 0px;
}

.jObhDp {
  display: flex;
  margin-bottom: 15px;
  background: rgb(17, 18, 23);
  color: rgb(255, 255, 255);
}

.ieLuOe {
  width: calc(100% - 36px);
  margin-left: 13px;
}

.phDKU {
  position: relative;
  padding: 10px 12px;
  background: rgb(27, 28, 35);
  border-radius: 12px;
}

.phDKU h4 {
  margin: 0px;
  font-size: 13px;
  font-weight: 700;
  line-height: 17px;
  color: rgb(138, 138, 143);
}

.phDKU h4 a.username {
  color: rgb(138, 138, 143);
}

.phDKU h4 a.chapter {
  color: rgb(31, 207, 132);
}

.phDKU p a {
  color: rgb(255, 255, 255);
}

.fNnMeE {
  position: absolute;
  right: 12px;
  bottom: -12px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 3px 6px;
  background: rgb(38, 40, 49);
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 10%) 0px 4px 10px;
}

.fNnMeE span {
  font-size: 11px;
  font-weight: 400;
  line-height: 11px;
  color: rgb(255, 255, 255);
}

.fNnMeE img {
  margin-left: 3px;
}

.phDKU p {
  margin: 0px;
}

.dEGLdF {
  padding: 20px 0px 10px 13px;
  border-top: 3px solid rgb(27, 28, 35);
}

.ivOyJq {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  margin: 0px 13px 20px 0px;
}

.ivOyJq {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  margin: 0px 13px 20px 0px;
}

.ivOyJq h2 {
  margin: 0px;
  font-size: 20px;
  font-weight: 700;
  line-height: 26px;
  color: rgb(255, 255, 255);
}

.jDXLco {
  white-space: nowrap;
  overflow-x: auto;
}

.jDXLco .comicItem {
  margin-right: 10px;
}

.eMTnkV {
  display: inline-block;
  width: 105px;
  margin-right: 10px;
}

.fpWJnZ {
  position: relative;
}

.hPsokp {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 9;
}

.hPsokp > span {
  display: inline-block;
  margin: 3px 0px 0px 3px;
  padding: 1px 5px;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  color: rgb(255, 255, 255);
  border-radius: 6px;
}

.kDxWKq {
  background: rgb(45, 203, 72);
}

.fpWJnZ img {
  width: 105px;
  height: 140px;
  object-fit: cover;
  border: 1px solid rgb(238, 238, 238);
  border-radius: 8px;
}

.eMTnkV > h3 {
  margin: 10px 0px 5px;
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(255, 255, 255);
}

.bUAGYH {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  position: fixed;
  bottom: 0px;
  z-index: 100;
  width: 100%;
  max-width: 768px;
  height: 52px;
  padding: 0px 13px;
  background: rgb(27, 28, 35);

}

.ilMCJd {
  cursor: pointer;
}

.ilMCJd img {
  height: 30px;
  width: 30px;
  border-radius: 50%;
}

.gjzfNW {
  margin-left: 20px;
  cursor: pointer;
}

.gjzfNW img {
  height: 30px;
  width: 30px;
  border-radius: 50%;

}

.comic-read {
  color: #fff;
  -webkit-box-flex: 1;
  flex-grow: 1;
  margin-left: 20px;
  padding: 10px 0px;
  border-radius: 24px;
  font-weight: 600;
  font-size: 17px;
  line-height: 22px;
  text-align: center;
  background: linear-gradient(91.77deg, hsl(11deg 80% 45%) 0%, hsl(11deg 100% 42%) 100%);
}
</style>
