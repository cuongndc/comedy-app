<template>
  <div class="max-w-[450px] md:max-w-[750px] flex fixed bottom-0 z-50 bg-white w-full items-center justify-between shadow">
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
      <a class="h-[50px] flex flex-col items-center" title="Truyện tranh" href="/">
        <div class="w-[30px] max-w-[100%]">
          <div class="relative pb-[100%]"><img
            alt="Truyện tranh"
            data-src="/icons/tabbar/icon-toon-active.svg"
            class="visible h-full left-0 absolute top-0 w-full"
            src="/icons/tabbar/icon-toon-active.svg"
          ></div>
        </div>
        <span class="text-primary-gray text-xl">Truyện tranh</span></a>
    </div>
    <div class="w-[20%]">
      <a class="h-[50px] flex flex-col items-center" title="Tiểu thuyết" href="/novel">
        <div class="w-[30px] max-w-[100%]">
          <div class="relative pb-[100%]"><img
            alt="Tiểu thuyết"
            data-src="/icons/tabbar/icon-novel.svg"
            class="visible h-full left-0 absolute top-0 w-full"
            src="/icons/tabbar/icon-novel.svg"
          ></div>
        </div>
        <span class="text-primary-gray text-xl">Tiểu thuyết</span></a>
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
