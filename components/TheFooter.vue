<template>
  <div class="max-w-[450px] md:max-w-[768px] flex fixed bottom-0 z-50 bg-white w-full items-center justify-between shadow h-[60px]">
    <div class="w-[20%]">
      <a class="h-[50px] flex flex-col items-center" title="Bảng tin" href="/bang-tin">
        <div class="w-[30px] max-w-[100%]">
          <div class="relative pb-[100%]"><img
            alt="Bảng tin"
            data-src="/icons/tabbar/icon-newsfeed.svg"
            class="visible h-full left-0 absolute top-0 w-full"
            src="/icons/tabbar/icon-newsfeed.svg"
          ></div>
        </div>
        <span class="text-xl text-primary-gray">Bảng tin</span></a>
    </div>
    <div class="w-[20%]">
      <NuxtLink to="/" class="h-[50px] flex flex-col items-center" title="Truyện tranh">
        <div class="w-[30px] max-w-[100%]">
          <div class="relative pb-[100%]">
            <img
              v-if="$route.name === 'index'"
              alt="Truyện tranh"
              data-src="/icons/tabbar/icon-toon-active.svg"
              class="visible h-full left-0 absolute top-0 w-full"
              src="/icons/tabbar/icon-toon-active.svg"
            >
            <img
              v-else
              alt="Truyện tranh"
              data-src="/icons/tabbar/icon-toon-active.svg"
              class="visible h-full left-0 absolute top-0 w-full"
              src="/icons/tabbar/icon-toon.svg"
            >
          </div>
        </div>
        <span class="text-primary-gray text-xl" :class="{ 'text-[#059e5d]': $route.name === 'index' }">Truyện tranh</span>
      </NuxtLink>
    </div>
    <div class="w-[20%]">
      <NuxtLink to="/novel" class="h-[50px] flex flex-col items-center" title="Truyện chữ">
        <div class="w-[30px] max-w-[100%]">
          <div class="relative pb-[100%]">
            <img
              v-if="$route.name === 'novel'"
              alt="Tiểu thuyết"
              data-src="/icons/tabbar/icon-novel.svg"
              class="visible h-full left-0 absolute top-0 w-full"
              src="/icons/tabbar/icon-novel-active.svg"
            >
            <img
              v-else
              alt="Tiểu thuyết"
              data-src="/icons/tabbar/icon-novel.svg"
              class="visible h-full left-0 absolute top-0 w-full"
              src="/icons/tabbar/icon-novel.svg"
            >
          </div>
        </div>
        <span class="text-primary-gray text-xl" :class="{ 'text-[#059e5d]': $route.name === 'novel' }">Truyện chữ</span>
      </NuxtLink>
    </div>
    <div class="w-[20%]">
      <a class="h-[50px] flex flex-col items-center" title="Giá sách" href="/gia-sach">
        <div class="w-[30px] max-w-[100%]">
          <div class="relative pb-[100%]"><img
            alt="Giá sách"
            data-src="/icons/tabbar/icon-tutruyen.svg"
            class="visible h-full left-0 absolute top-0 w-full"
            src="/icons/tabbar/icon-tutruyen.svg"
          ></div>
        </div>
        <span class="text-primary-gray text-xl">Giá sách</span></a>
    </div>
    <div class="w-[20%]">
      <a class="h-[50px] flex flex-col items-center" title="Cá nhân" href="/menu">
        <div class="w-[30px] max-w-[100%]">
          <div class="relative pb-[100%]">
            <img
              alt="Cá nhân" data-src="/icons/tabbar/icon-canhan.svg"
              class="visible h-full left-0 absolute top-0 w-full"
              src="/icons/tabbar/icon-canhan.svg"
            ></div>
        </div>
        <span class="text-primary-gray text-xl">Cá nhân</span></a>
    </div>
  </div>
</template>
