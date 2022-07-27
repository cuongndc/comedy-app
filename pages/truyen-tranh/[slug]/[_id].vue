<script setup lang="ts">
import { convertUnit } from '~/common'
import { useRuntimeConfig } from '#app'
import {watchEffect} from "vue";

const route = useRoute()
const params = route.params
const slug = ref(params.slug)
const _id = ref(params._id)
const comic = ref({})
const chapters = ref([])
const config = useRuntimeConfig()

const {
  data: response,
  pending,
  refresh,
} = await useFetch('/api/comic', {
  params: {
    slug: slug.value,
    _id: _id.value,
  },
})
if (response.value) {
  comic.value = response.value.comic
  chapters.value = response.value.chapters
}
watchEffect(async () => {
  await refresh()
})
const backgroundImage = (image) => {
  return {
    backgroundImage: `url(${config.public.imageCdn}/${image})`,
  }
}
</script>

<template>
  <section class="ComicPage__Root-sc-1l8m850-0 kjrONi" v-if="!pending">
    <div
      :style="backgroundImage(comic.squareCover)"
      class="flex items-center justify-between h-[50px] z-10 fixed top-0 w-full overflow-hidden"
    >
      <NuxtLink to="/" class="ml-4">
        <img src="/icons/comicPage/icon-back.svg" alt="back">
      </NuxtLink>
      <div class="flex items-center bg-deep-black/50 h-[30px] rounded-2xl px-3 mr-4">
        <img class="mr-2" src="/icons/comicPage/icon-report.svg" alt="report">
        <span class="text-white text-2xl">Báo cáo</span>
      </div>
    </div>
    <div class="ComicPage__Background-sc-1l8m850-1 dQstsf">
      <img
        alt=""
        class="img-domain"
        :src="`${config.public.imageCdn}/${comic.squareCover}`"
        style="visibility: visible;"
      >
    </div>
    <div class="ComicPage__ComicContent-sc-1l8m850-5 ferexP">
      <div class="ComicPage__ComicInfo-sc-1l8m850-6 fUqEJv">
        <div class="ComicPage__ComicInfoContent-sc-1l8m850-7 hdvgOz">
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
                <img src="/icons/comicPage/icon-star.svg" alt="rating">
                <img src="/icons/comicPage/icon-star.svg" alt="rating">
                <img src="/icons/comicPage/icon-star.svg" alt="rating">
                <img src="/icons/comicPage/icon-star.svg" alt="rating">
                <img src="/icons/comicPage/icon-star.svg" alt="rating">
              </div>
              <div>
                <span class="text-white text-xl">{{ comic.reviewCount }} Đánh giá</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ComicPage__ComicControl-sc-1l8m850-16 bUAGYH">
      <div class="ComicPage__ButtonShare-sc-1l8m850-17 ilMCJd comic-share">
        <img
          src="/icons/comicPage/icon-share.svg"
          alt="Chia sẻ"
        >
      </div>
      <div class="ComicPage__ButtonFollow-sc-1l8m850-18 gjzfNW comic-follow">
        <img
          src="/icons/comicPage/icon-follow.svg"
          alt="Theo dõi"
        >
      </div>
      <a class="comic-read" href="/truyen-tranh-chapter/thinh-sung-cam-tu-chinh-do-chuong-1/5f164d0b3813bf13f46fcba7">Bắt
        đầu đọc</a>
    </div>
    <div class="ComicTabs__Root-lsu3at-0 kqexPd">
      <div class="ComicTabs__TabList-lsu3at-1 AAQSf">
        <div class="ComicTabs__TabItem-lsu3at-2 eKaTWX active">
          <span>Giới thiệu</span>
        </div>
        <div class="ComicTabs__TabItem-lsu3at-2 eKaTWX">
          <a
            href="/truyen-tranh/thinh-sung-cam-tu-chinh-do/5f153b8d4ee1c16765968775/chapters"
          >Chapters (155)</a>
        </div>
        <div class="ComicTabs__TabItem-lsu3at-2 eKaTWX">
          <a
            href="/truyen-tranh/thinh-sung-cam-tu-chinh-do/5f153b8d4ee1c16765968775/danh-gia"
          >Đánh giá</a>
        </div>
      </div>
    </div>
    <div class="ComicPage__ComicIntro-sc-1l8m850-19 relative bg-dark-gray">
      <!--      <div class="content flex items-center"> -->
      <!--        <div class="w-[24px] max-w-[100%]"> -->
      <!--          <div style="position: relative; padding-bottom: 100%;"> -->
      <!--            <img src="/icons/comicPage/icon-promote.png"> -->
      <!--          </div> -->
      <!--        </div> -->
      <!--        <span>Top 1 nữ cường bá đạo</span> -->
      <!--      </div> -->
      <div class="px-6 h-auto relative overflow-hidden pt-6">
        <div class="content mb-4">
          <p class="text-xl text-white whitespace-pre-line">
            {{ comic?.description }}
          </p>
        </div>
      </div>
      <div class="ComicTags__Root-s3c4yv-0 iDELMo mobile scrollbar-hide">
        <a v-for="tag in comic.tags" :key="tag._id" href="/tag/am-muu/5f5096f37bcb8a019813d710"># {{ tag.name }}</a>
      </div>
      <div class="px-5 overflow-auto whitespace-nowrap scrollbar-hide" style="display: -webkit-box">
        <div v-for="chapter in comic.chaptersRepresentData" :key="chapter._id">
          <img
            v-if="chapter.imageRepresent"
            class="h-[40px] w-[100px] inline-block object-cover border-[1px] border-white mr-4 rounded-xl"
            :src="`${config.public.imageCdn}/${chapter.imageRepresent}`"
          >
          <p class="text-white text-base mt-2">
            Chương {{ chapter.chapterNum }}
          </p>
        </div>
      </div>
      <div class="comicComments__Root-sc-1lmsq62-0 iXLSbq">
        <h3>Bình luận (38426)</h3>
        <div class="comicComments__HasComment-sc-1lmsq62-1 crztuk">
          <div class="CommentItem__Root-sc-1qlib8c-0 jObhDp">
            <a href="/@userP6eIWDXvrG">
              <div style="max-width: 100%; width: 36px;">
                <div style="position: relative; padding-bottom: 100%;"><img
                  alt="Búp Phạm Thị"
                  data-src="https://cdn.funtoon.vn/avatar/avatar_62c2946f9c0f282bf20c790e.jpg"
                  class="img-avatar"
                  style="visibility: visible; height: 100%; left: 0px; position: absolute; top: 0px; width: 100%;"
                  src="https://cdn.funtoon.vn/avatar/avatar_62c2946f9c0f282bf20c790e.jpg"
                >
                </div>
              </div>
            </a>
            <div class="CommentItem__Right-sc-1qlib8c-1 ieLuOe">
              <div class="CommentItem__Content-sc-1qlib8c-2 phDKU">
                <h4>
                  <a class="username" href="/@userP6eIWDXvrG">Búp
                    Phạm Thị</a> - <a
                    class="chapter"
                    href="/truyen-tranh-chapter/thinh-sung-cam-tu-chinh-do-chap-21/5f2bb89a876d637deeb788f6"
                  >Chương
                    21</a>
                </h4>
                <p><a href="/phan-hoi-chapter/62ce9da056d0bd058118acbd">Nét đẹp nhưng khó hiểu</a></p>
                <div class="CommentItem__LikeCount-sc-1qlib8c-3 fNnMeE">
                  <span>0</span>
                  <!--                  <img -->
                  <!--                    src="/icons/comicComments/icon-like.svg" alt="like" -->
                  <!--                  > -->
                </div>
              </div>
              <div class="CommentItem__Control-sc-1qlib8c-4 emmKaM">
                <span>1 tuần trước</span><a
                  href="/phan-hoi-chapter/62ce9da056d0bd058118acbd"
                >Trả lời</a>
                <div class="CommentItem__Like-sc-1qlib8c-6 hGZrpm">
                  Thích
                </div>
              </div>
              <div class="CommentItem__ViewAllReply-sc-1qlib8c-7 duUGaC">
                <a
                  href="/phan-hoi-chapter/62ce9da056d0bd058118acbd"
                >
                  <!--                  <img -->
                  <!--                  src="/icons/comicComments/icon-enter.svg" -->
                  <!--                  alt="view all reply" -->
                  <!--                > -->
                  <span>Xem tất cả 5 phản hồi</span></a>
              </div>
              <div class="CommentItem__CommentReply-sc-1qlib8c-8 iyjJoK" />
            </div>
          </div>
          <div class="CommentItem__Root-sc-1qlib8c-0 jObhDp">
            <a href="/@user8kt9VNEOwQ">
              <div style="max-width: 100%; width: 36px;">
                <div style="position: relative; padding-bottom: 100%;"><img
                  alt="|•Dy luxury√"
                  data-src="https://cdn.funtoon.vn/resources/1654388403036-funcomic-235c28bcfc503496da5e5bb55c5b74e4.jpg"
                  class="img-avatar"
                  style="visibility: visible; height: 100%; left: 0px; position: absolute; top: 0px; width: 100%;"
                  src="https://cdn.funtoon.vn/resources/1654388403036-funcomic-235c28bcfc503496da5e5bb55c5b74e4.jpg"
                >
                </div>
              </div>
            </a>
            <div class="CommentItem__Right-sc-1qlib8c-1 ieLuOe">
              <div class="CommentItem__Content-sc-1qlib8c-2 phDKU">
                <h4>
                  <a class="username" href="/@user8kt9VNEOwQ">|•Dy
                    luxury√</a> - <a
                    class="chapter"
                    href="/truyen-tranh-chapter/thinh-sung-cam-tu-chinh-do-chap-68/5f56fc5e57eba478c673f0b6"
                  >Chương
                    68</a>
                </h4>
                <p><a href="/phan-hoi-chapter/62d0c83aef8ebd056dd8ecf7">*** thì chết ))</a></p>
                <div class="CommentItem__LikeCount-sc-1qlib8c-3 fNnMeE">
                  <span>0</span>
                  <!--                  <img -->
                  <!--                    src="/icons/comicComments/icon-like.svg" alt="like" -->
                  <!--                  > -->
                </div>
              </div>
              <div class="CommentItem__Control-sc-1qlib8c-4 emmKaM">
                <span>1 tuần trước</span><a
                  href="/phan-hoi-chapter/62d0c83aef8ebd056dd8ecf7"
                >Trả lời</a>
                <div class="CommentItem__Like-sc-1qlib8c-6 hGZrpm">
                  Thích
                </div>
              </div>
              <div class="CommentItem__ViewAllReply-sc-1qlib8c-7 duUGaC">
                <a
                  href="/phan-hoi-chapter/62d0c83aef8ebd056dd8ecf7"
                >
                  <!--                  <img -->
                  <!--                  src="/icons/comicComments/icon-enter.svg" -->
                  <!--                  alt="view all reply" -->
                  <!--                > -->
                  <span>Xem tất cả 4 phản hồi</span></a>
              </div>
              <div class="CommentItem__CommentReply-sc-1qlib8c-8 iyjJoK" />
            </div>
          </div>
          <div class="CommentItem__Root-sc-1qlib8c-0 jObhDp">
            <a href="/@userYZ3zWZ6Mah">
              <div style="max-width: 100%; width: 36px;">
                <div style="position: relative; padding-bottom: 100%;"><img
                  alt="Thị Thuỳ Trang Đỗ"
                  data-src="https://cdn.funtoon.vn/avatar/avatar_62dec523ef8ebd056ddc0fd4.jpg"
                  class="img-avatar"
                  style="visibility: visible; height: 100%; left: 0px; position: absolute; top: 0px; width: 100%;"
                  src="https://cdn.funtoon.vn/avatar/avatar_62dec523ef8ebd056ddc0fd4.jpg"
                >
                </div>
              </div>
            </a>
            <div class="CommentItem__Right-sc-1qlib8c-1 ieLuOe">
              <div class="CommentItem__Content-sc-1qlib8c-2 phDKU">
                <h4>
                  <a class="username" href="/@userYZ3zWZ6Mah">Thị
                    Thuỳ Trang Đỗ</a> - <a
                    class="chapter"
                    href="/truyen-tranh-chapter/thinh-sung-cam-tu-chinh-do-chap-90/5f77ee617d2ba70d40e632ae"
                  >Chương
                    90</a>
                </h4>
                <p><a href="/phan-hoi-chapter/62deeb9d886cb50598fcafaf">Haizz đúng là khổ thằng bé</a></p>
                <div class="CommentItem__LikeCount-sc-1qlib8c-3 fNnMeE">
                  <span>0</span>
                  <!--                  <img -->
                  <!--                    src="/icons/comicComments/icon-like.svg" alt="like" -->
                  <!--                  > -->
                </div>
              </div>
              <div class="CommentItem__Control-sc-1qlib8c-4 emmKaM">
                <span>1 ngày trước</span><a
                  href="/phan-hoi-chapter/62deeb9d886cb50598fcafaf"
                >Trả lời</a>
                <div class="CommentItem__Like-sc-1qlib8c-6 hGZrpm">
                  Thích
                </div>
              </div>
              <div class="CommentItem__ViewAllReply-sc-1qlib8c-7 duUGaC">
                <a
                  href="/phan-hoi-chapter/62deeb9d886cb50598fcafaf"
                >
                  <!--                  <img -->
                  <!--                  src="/icons/comicComments/icon-enter.svg" -->
                  <!--                  alt="view all reply" -->
                  <!--                > -->
                  <span>Xem tất cả 3 phản hồi</span></a>
              </div>
              <div class="CommentItem__CommentReply-sc-1qlib8c-8 iyjJoK">
                <div class="ReplyItem__Root-sc-1csz0ru-0 flVXHU">
                  <a href="/@userYZ3zWZ6Mah">
                    <div style="max-width: 100%; width: 24px;">
                      <div style="position: relative; padding-bottom: 100%;"><img
                        alt="Thị Thuỳ Trang Đỗ"
                        data-src="https://cdn.funtoon.vn/avatar/avatar_62dec523ef8ebd056ddc0fd4.jpg"
                        class="img-avatar"
                        style="visibility: visible; height: 100%; left: 0px; position: absolute; top: 0px; width: 100%;"
                        src="https://cdn.funtoon.vn/avatar/avatar_62dec523ef8ebd056ddc0fd4.jpg"
                      >
                      </div>
                    </div>
                  </a>
                  <div class="ReplyItem__Right-sc-1csz0ru-1 cbjZaf">
                    <div class="ReplyItem__Content-sc-1csz0ru-2 cNbQgh">
                      <h4>
                        <a class="username" href="/@userYZ3zWZ6Mah">Thị
                          Thuỳ Trang Đỗ</a>
                      </h4>
                      <p><a href="/phan-hoi-chapter/62deebb2ef8ebd056ddc190a">Ajdjjdsd</a></p>
                      <div class="ReplyItem__LikeCount-sc-1csz0ru-3 imRA-dJ">
                        <span>0</span>
                        <!--                        <img -->
                        <!--                          src="/icons/comicComments/icon-like.svg" alt="like" -->
                        <!--                        > -->
                      </div>
                    </div>
                    <div class="ReplyItem__Control-sc-1csz0ru-4 chkTkF">
                      <span>1 ngày trước</span>
                      <div class="ReplyItem__Like-sc-1csz0ru-5 dPYpgY">
                        Thích
                      </div>
                    </div>
                  </div>
                </div>
                <div class="ReplyItem__Root-sc-1csz0ru-0 flVXHU">
                  <a href="/@userYZ3zWZ6Mah">
                    <div style="max-width: 100%; width: 24px;">
                      <div style="position: relative; padding-bottom: 100%;"><img
                        alt="Thị Thuỳ Trang Đỗ"
                        data-src="https://cdn.funtoon.vn/avatar/avatar_62dec523ef8ebd056ddc0fd4.jpg"
                        class="img-avatar"
                        style="visibility: visible; height: 100%; left: 0px; position: absolute; top: 0px; width: 100%;"
                        src="https://cdn.funtoon.vn/avatar/avatar_62dec523ef8ebd056ddc0fd4.jpg"
                      >
                      </div>
                    </div>
                  </a>
                  <div class="ReplyItem__Right-sc-1csz0ru-1 cbjZaf">
                    <div class="ReplyItem__Content-sc-1csz0ru-2 cNbQgh">
                      <h4>
                        <a class="username" href="/@userYZ3zWZ6Mah">Thị
                          Thuỳ Trang Đỗ</a>
                      </h4>
                      <p><a href="/phan-hoi-chapter/62deebae9f5af7057f447b4d">Ãdaidjbsb</a></p>
                      <div class="ReplyItem__LikeCount-sc-1csz0ru-3 imRA-dJ">
                        <span>0</span>
                        <!--                        <img -->
                        <!--                          src="/icons/comicComments/icon-like.svg" alt="like" -->
                        <!--                        > -->
                      </div>
                    </div>
                    <div class="ReplyItem__Control-sc-1csz0ru-4 chkTkF">
                      <span>1 ngày trước</span>
                      <div class="ReplyItem__Like-sc-1csz0ru-5 dPYpgY">
                        Thích
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a class="all-comment" href="/binh-luan-truyen/5f153b8d4ee1c16765968775"><span>Tất cả bình luận (38426)</span>
            <!--            <img -->
            <!--            src="/icons/comicComments/icon-skip.svg" alt="all comment" -->
            <!--          > -->
          </a>
        </div>
      </div>
      <div class="ComicRelated__Root-rxs36w-0 dEGLdF">
        <div class="ComicRelated__Title-rxs36w-1 ivOyJq">
          <h2>Đề xuất liên quan</h2>
        </div>
        <div class="ComicRelated__SwiperCSS-rxs36w-2 jDXLco">
          <div class="ComicItem__Root-qz9ayw-0 eMTnkV comicItem">
            <div class="ComicItem__Image-qz9ayw-1 fpWJnZ">
              <div class="stickerComicItem__Root-sc-103tcpt-0 hPsokp">
                <span
                  class="stickerComicItem__Full-sc-103tcpt-2 kDxWKq"
                >Full</span>
              </div>
              <a
                title="Yểu Điệu Quân Tử, Nữ Tướng Hảo Cầu"
                href="/truyen-tranh/yeu-dieu-quan-tu-nu-tuong-hao-cau/5fdc3498eba5a06cc3658683"
              >
                <div style="max-width: 100%; width: 105px;">
                  <div style="position: relative; padding-bottom: 133.333%;"><img
                    alt="Yểu Điệu Quân Tử, Nữ Tướng Hảo Cầu"
                    data-src="https://cdn.funtoon.vn/image/resources/5fdc3498eba5a06cc3658683_1611744681645.jpg"
                    class="img-domain"
                    style="visibility: visible; height: 100%; left: 0px; position: absolute; top: 0px; width: 100%;"
                    src="https://cdn.funtoon.vn/image/resources/5fdc3498eba5a06cc3658683_1611744681645.jpg"
                  ></div>
                </div>
              </a>
            </div>
            <h3>
              <a
                title="Yểu Điệu Quân Tử, Nữ Tướng Hảo Cầu"
                href="/truyen-tranh/yeu-dieu-quan-tu-nu-tuong-hao-cau/5fdc3498eba5a06cc3658683"
              >Yểu Điệu Quân Tử, Nữ
                Tướng Hảo Cầu</a>
            </h3>
          </div>
          <div class="ComicItem__Root-qz9ayw-0 eMTnkV comicItem">
            <div class="ComicItem__Image-qz9ayw-1 fpWJnZ">
              <div class="stickerComicItem__Root-sc-103tcpt-0 hPsokp">
                <span
                  class="stickerComicItem__Full-sc-103tcpt-2 kDxWKq"
                >Full</span>
              </div>
              <a title="Nhất Đại Quỷ Phi" href="/truyen-tranh/nhat-dai-quy-phi/60b8b06fdb49114285822df4">
                <div style="max-width: 100%; width: 105px;">
                  <div style="position: relative; padding-bottom: 133.333%;"><img
                    alt="Nhất Đại Quỷ Phi"
                    data-src="https://cdn.funtoon.vn/image/resources/YTbt3OuD2lnncxVgvKpyRczQ_1622716494197.jpg"
                    class="img-domain"
                    style="visibility: visible; height: 100%; left: 0px; position: absolute; top: 0px; width: 100%;"
                    src="https://cdn.funtoon.vn/image/resources/YTbt3OuD2lnncxVgvKpyRczQ_1622716494197.jpg"
                  >
                  </div>
                </div>
              </a>
            </div>
            <h3>
              <a title="Nhất Đại Quỷ Phi" href="/truyen-tranh/nhat-dai-quy-phi/60b8b06fdb49114285822df4">Nhất Đại Quỷ
                Phi</a>
            </h3>
          </div>
          <div class="ComicItem__Root-qz9ayw-0 eMTnkV comicItem">
            <div class="ComicItem__Image-qz9ayw-1 fpWJnZ">
              <div class="stickerComicItem__Root-sc-103tcpt-0 hPsokp">
                <span
                  class="stickerComicItem__Full-sc-103tcpt-2 kDxWKq"
                >Full</span>
              </div>
              <a title="Nhặt Về Một BOSS Xấu Xa" href="/truyen-tranh/nhat-ve-mot-boss-xau-xa/5fb4a9487b449f25817cb2fb">
                <div style="max-width: 100%; width: 105px;">
                  <div style="position: relative; padding-bottom: 133.333%;"><img
                    alt="Nhặt Về Một BOSS Xấu Xa"
                    data-src="https://cdn.funtoon.vn/image/resources/5fb4a9487b449f25817cb2fb_1611736284398.jpg"
                    class="img-domain"
                    style="visibility: visible; height: 100%; left: 0px; position: absolute; top: 0px; width: 100%;"
                    src="https://cdn.funtoon.vn/image/resources/5fb4a9487b449f25817cb2fb_1611736284398.jpg"
                  >
                  </div>
                </div>
              </a>
            </div>
            <h3>
              <a
                title="Nhặt Về Một BOSS Xấu Xa"
                href="/truyen-tranh/nhat-ve-mot-boss-xau-xa/5fb4a9487b449f25817cb2fb"
              >Nhặt Về Một BOSS Xấu Xa</a>
            </h3>
          </div>
          <div class="ComicItem__Root-qz9ayw-0 eMTnkV comicItem">
            <div class="ComicItem__Image-qz9ayw-1 fpWJnZ">
              <div class="stickerComicItem__Root-sc-103tcpt-0 hPsokp">
                <span
                  class="stickerComicItem__Full-sc-103tcpt-2 kDxWKq"
                >Full</span>
              </div>
              <a
                title="Nam Thần Kiêu Ngạo Cưng Chiều Vợ"
                href="/truyen-tranh/nam-than-kieu-ngao-cung-chieu-vo/6013849128122f3f30c18cbf"
              >
                <div style="max-width: 100%; width: 105px;">
                  <div style="position: relative; padding-bottom: 133.333%;"><img
                    alt="Nam Thần Kiêu Ngạo Cưng Chiều Vợ"
                    data-src="https://cdn.funtoon.vn/image/resources/Ym33mfBEk5FNQZfi0LU81jfA_1611891831582.jpg"
                    class="img-domain"
                    style="visibility: visible; height: 100%; left: 0px; position: absolute; top: 0px; width: 100%;"
                    src="https://cdn.funtoon.vn/image/resources/Ym33mfBEk5FNQZfi0LU81jfA_1611891831582.jpg"
                  >
                  </div>
                </div>
              </a>
            </div>
            <h3>
              <a
                title="Nam Thần Kiêu Ngạo Cưng Chiều Vợ"
                href="/truyen-tranh/nam-than-kieu-ngao-cung-chieu-vo/6013849128122f3f30c18cbf"
              >Nam Thần Kiêu Ngạo
                Cưng Chiều Vợ</a>
            </h3>
          </div>
          <div class="ComicItem__Root-qz9ayw-0 eMTnkV comicItem">
            <div class="ComicItem__Image-qz9ayw-1 fpWJnZ">
              <div class="stickerComicItem__Root-sc-103tcpt-0 hPsokp">
                <span
                  class="stickerComicItem__Full-sc-103tcpt-2 kDxWKq"
                >Full</span>
              </div>
              <a
                title="Hoàng Tử Phu Quân, Ta Nuôi Chàng"
                href="/truyen-tranh/hoang-tu-phu-quan-ta-nuoi-chang/60430cd7b5c08e0b8d1cb75d"
              >
                <div style="max-width: 100%; width: 105px;">
                  <div style="position: relative; padding-bottom: 133.333%;"><img
                    alt="Hoàng Tử Phu Quân, Ta Nuôi Chàng"
                    data-src="https://cdn.funtoon.vn/image/resources/tjszuxen778q3Xvm0HX6gBR6_1615006871393.jpg"
                    class="img-domain __lazy"
                    style="visibility: hidden; height: 100%; left: 0px; position: absolute; top: 0px; width: 100%;"
                  >
                  </div>
                </div>
              </a>
            </div>
            <h3>
              <a
                title="Hoàng Tử Phu Quân, Ta Nuôi Chàng"
                href="/truyen-tranh/hoang-tu-phu-quan-ta-nuoi-chang/60430cd7b5c08e0b8d1cb75d"
              >Hoàng Tử Phu Quân, Ta
                Nuôi Chàng</a>
            </h3>
          </div>
          <div class="ComicItem__Root-qz9ayw-0 eMTnkV comicItem">
            <div class="ComicItem__Image-qz9ayw-1 fpWJnZ">
              <div class="stickerComicItem__Root-sc-103tcpt-0 hPsokp">
                <span
                  class="stickerComicItem__Full-sc-103tcpt-2 kDxWKq"
                >Full</span>
              </div>
              <a title="Lục Cung Phong Hoa" href="/truyen-tranh/luc-cung-phong-hoa/5fcf4b3161228e64b12c8fde">
                <div style="max-width: 100%; width: 105px;">
                  <div style="position: relative; padding-bottom: 133.333%;"><img
                    alt="Lục Cung Phong Hoa"
                    data-src="https://cdn.funtoon.vn/image/resources/5fcf4b3161228e64b12c8fde_1611737128981.jpg"
                    class="img-domain __lazy"
                    style="visibility: hidden; height: 100%; left: 0px; position: absolute; top: 0px; width: 100%;"
                  >
                  </div>
                </div>
              </a>
            </div>
            <h3>
              <a title="Lục Cung Phong Hoa" href="/truyen-tranh/luc-cung-phong-hoa/5fcf4b3161228e64b12c8fde">Lục Cung
                Phong Hoa</a>
            </h3>
          </div>
          <div class="ComicItem__Root-qz9ayw-0 eMTnkV comicItem">
            <div class="ComicItem__Image-qz9ayw-1 fpWJnZ">
              <div class="stickerComicItem__Root-sc-103tcpt-0 hPsokp">
                <span
                  class="stickerComicItem__Full-sc-103tcpt-2 kDxWKq"
                >Full</span>
              </div>
              <a title="Công Chúa Hạ Phàm" href="/truyen-tranh/cong-chua-ha-pham/608a9ca2a9589a5d928e6e82">
                <div style="max-width: 100%; width: 105px;">
                  <div style="position: relative; padding-bottom: 133.333%;"><img
                    alt="Công Chúa Hạ Phàm"
                    data-src="https://cdn.funtoon.vn/image/resources/MnzkPV9fFNHcpczUKgw2SjLg_1619696785260.jpg"
                    class="img-domain __lazy"
                    style="visibility: hidden; height: 100%; left: 0px; position: absolute; top: 0px; width: 100%;"
                  >
                  </div>
                </div>
              </a>
            </div>
            <h3>
              <a title="Công Chúa Hạ Phàm" href="/truyen-tranh/cong-chua-ha-pham/608a9ca2a9589a5d928e6e82">Công Chúa
                Hạ Phàm</a>
            </h3>
          </div>
          <div class="ComicItem__Root-qz9ayw-0 eMTnkV comicItem">
            <div class="ComicItem__Image-qz9ayw-1 fpWJnZ">
              <div class="stickerComicItem__Root-sc-103tcpt-0 hPsokp">
                <span
                  class="stickerComicItem__Full-sc-103tcpt-2 kDxWKq"
                >Full</span>
              </div>
              <a title="Hoàng Nữ Công Lược" href="/truyen-tranh/hoang-nu-cong-luoc/608a99f7a9589a5d928e6e80">
                <div style="max-width: 100%; width: 105px;">
                  <div style="position: relative; padding-bottom: 133.333%;"><img
                    alt="Hoàng Nữ Công Lược"
                    data-src="https://cdn.funtoon.vn/image/resources/xnawxJwe2l8Z4KjwxO1RmIfd_1619696096635.jpg"
                    class="img-domain __lazy"
                    style="visibility: hidden; height: 100%; left: 0px; position: absolute; top: 0px; width: 100%;"
                  >
                  </div>
                </div>
              </a>
            </div>
            <h3>
              <a title="Hoàng Nữ Công Lược" href="/truyen-tranh/hoang-nu-cong-luoc/608a99f7a9589a5d928e6e80">Hoàng Nữ
                Công Lược</a>
            </h3>
          </div>
          <div class="ComicItem__Root-qz9ayw-0 eMTnkV comicItem">
            <div class="ComicItem__Image-qz9ayw-1 fpWJnZ">
              <div class="stickerComicItem__Root-sc-103tcpt-0 hPsokp">
                <span
                  class="stickerComicItem__Full-sc-103tcpt-2 kDxWKq"
                >Full</span>
              </div>
              <a
                title="Tổng Tài Thiên Vị Yêu Mình Ta"
                href="/truyen-tranh/tong-tai-thien-vi-yeu-minh-ta/5fb38f1de74adb709a09558c"
              >
                <div style="max-width: 100%; width: 105px;">
                  <div style="position: relative; padding-bottom: 133.333%;"><img
                    alt="Tổng Tài Thiên Vị Yêu Mình Ta"
                    data-src="https://cdn.funtoon.vn/image/resources/5fb38f1de74adb709a09558c_1611737666734.jpg"
                    class="img-domain __lazy"
                    style="visibility: hidden; height: 100%; left: 0px; position: absolute; top: 0px; width: 100%;"
                  >
                  </div>
                </div>
              </a>
            </div>
            <h3>
              <a
                title="Tổng Tài Thiên Vị Yêu Mình Ta"
                href="/truyen-tranh/tong-tai-thien-vi-yeu-minh-ta/5fb38f1de74adb709a09558c"
              >Tổng Tài Thiên Vị Yêu
                Mình Ta</a>
            </h3>
          </div>
          <div class="ComicItem__Root-qz9ayw-0 eMTnkV comicItem">
            <div class="ComicItem__Image-qz9ayw-1 fpWJnZ">
              <div class="stickerComicItem__Root-sc-103tcpt-0 hPsokp" />
              <a title="Yêu Nàng Suốt Kiếp" href="/truyen-tranh/yeu-nang-suot-kiep/60b754250a81e635c7cadc21">
                <div style="max-width: 100%; width: 105px;">
                  <div style="position: relative; padding-bottom: 133.333%;"><img
                    alt="Yêu Nàng Suốt Kiếp"
                    data-src="https://cdn.funtoon.vn/image/resources/60b754250a81e635c7cadc21_1622792731127.jpg"
                    class="img-domain __lazy"
                    style="visibility: hidden; height: 100%; left: 0px; position: absolute; top: 0px; width: 100%;"
                  >
                  </div>
                </div>
              </a>
            </div>
            <h3>
              <a title="Yêu Nàng Suốt Kiếp" href="/truyen-tranh/yeu-nang-suot-kiep/60b754250a81e635c7cadc21">Yêu Nàng
                Suốt Kiếp</a>
            </h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.ferexP {
  margin-top: 150px;
  position: relative;
}

.fUqEJv {
  padding: 60px 13px 0px;
  background: linear-gradient(rgba(17, 18, 23, 0) 0%, rgba(17, 18, 23, 0.5) 33.85%, rgba(17, 18, 23, 0.8) 68.75%, rgb(17, 18, 23) 100%);

}

.hdvgOz {
  min-height: 115px;
  padding: 15px;
  background-color: rgb(27, 28, 35);
  border-radius: 8px;
  background-image: url(/icons/comicPage/backgroundInfo.png);
  background-size: contain;
  background-position: right center;
  background-repeat: no-repeat;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
}

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
