<script lang="ts" setup>
import {IManga} from "~/types";
import {Grid} from "swiper";
import {Swiper, SwiperSlide} from 'swiper/vue';
import {ChevronDoubleRightIcon} from "@heroicons/vue/solid";

const {
  data: mangas,
  pending,
} = await useFetch<IManga[]>(`/api/manga-updated`);

</script>

<template>
  <div class="mb-4">
    <PulseMangaUpdatedLoading v-if="pending"/>
    <div class="px-4" v-else>
      <div>
        <a href="/xu-huong">
          <SharedImg class="w-full" src="https://weeboo.vn/icons/widgets/trend/img-header.svg" alt="trend"/>
        </a>
      </div>
      <div class="gxFbOF">
        <ClientOnly>
          <Swiper :modules="[Grid]" :grid="{
            rows: 3,
            fill: 'row'
          }" :slides-per-view="1.3" :space-between="14">
            <SwiperSlide v-for="manga in mangas" class="h-[130px]" :key="manga.slug">
              <div class="p-5 kesnlQ">
                <NuxtLink class="flex items-center" :to="useNavigatorComicPreview(manga.slug)">
                  <SharedImg
                      loading="lazy"
                      class="rounded-xl w-[75px] h-[100px] object-cover"
                      :src="manga.thumbnail"
                      fil="fill"/>
                  <div class="px-5" style="width: calc(100% - 102px)">
                    <h3 class="text-xl font-semibold line-clamp-1 mb-1">
                      <NuxtLink :to="useNavigatorComicPreview(manga.slug)">
                        {{ manga.name }}
                      </NuxtLink>
                    </h3>
                    <p class="text-xs italic line-clamp-2 mb-1">
                      {{ manga.review }}
                    </p>
                    <p class=" text-primary-gray mb-3 text-base">
                      {{ manga.newChapter }}
                    </p>
                    <div class="flex items-center">
                      <div class="flex items-center">
                        <SvgViewChapter class="w-5 h-5 mb-1"/>
                        <span class="text-base text-primary-gray">{{ manga.view }}</span>
                      </div>
                      <div class="flex items-center">
                        <SvgFollow class="w-5 h-5 ml-2 mr-1 mb-1"/>
                        <span class="text-base text-primary-gray">{{ manga.follow }}</span>
                      </div>
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </SwiperSlide>
          </Swiper>
        </ClientOnly>
      </div>
      <div class="rounded-b-xl shadow-[0_3px_20px_rgba(0,0,0,10%)] bg-white">
        <div>
          <NuxtLink to="/hot/1" class="flex items-center justify-center p-5">
            <span class="text-xl text-primary-gray">Xem tất cả</span>
            <ChevronDoubleRightIcon class="h-4 w-4 text-primary-gray ml-2"/>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media only screen and (min-width: 375px) {
  .swiper-slide {
    margin-right: 0 !important;
    margin-top: 0 !important;
  }
}

.hzqRqV {
  width: calc(100% - 102px);
  margin: 0px 10px 0px 15px;
}

.bTGYsm {
  margin: 0px 0px 10px;
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
}

.bTGYsm a {
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: rgb(38, 42, 65);
}

.jbgrIv {
  margin: 0px 0px 10px;
  font-size: 13px;
  line-height: 17px;
  color: rgb(138, 138, 143);
}

.hhWiSs {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}

.iUoBCq {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  margin-right: 15px;
}

.iCEPso {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}

.iUoBCq span {
  font-size: 13px;
  line-height: 18px;
  color: rgb(138, 138, 143);
}


.kesnlQ {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid rgb(255, 244, 238);
  cursor: pointer;
}

.GWlZw {
  padding: 0 13px;
  margin: 0 0 30px;
}

.gxFbOF {
  padding: 0 13px;
  background: rgb(255, 255, 255);
  box-shadow: rgb(0 0 0 / 10%) 0 3px 20px;
}

.jQjUBg {
  border-radius: 0px 0px 8px 8px;
  box-shadow: rgb(0 0 0 / 10%) 0px 3px 20px;
}

.iABAfw a {
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  padding: 11px;
  background: rgb(250, 250, 250);
  border-radius: 0 0 8px 8px;
}

.iABAfw span {
  font-size: 15px;
  font-weight: 400;
  line-height: 19px;
  color: rgb(138, 138, 143);
}
</style>