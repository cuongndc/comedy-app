<template>
  <div class="h-[270px]">
    <div class="animate-pulse h-full">
      <div class="animate-pulse bg-black/10 aspect-w-16 aspect-h-9" />
    </div>
  </div>
  <div class="py-2 flex justify-around">
    <div v-for="i of 4" :key="i" class="animate-pulse bg-black/10 h-[66px] w-[66px] rounded-full relative">
      <p class="h-[10px] absolute bottom-[-20px] animate-pulse bg-black/10 w-[65px] rounded-2xl" />
    </div>
  </div>
  <div class="px-4 mt-14">
    <div class="px-3 grid grid-cols-2 sm:grid-cols-3 gap-2.5 md:gap-5">
      <div v-for="i of 6" :key="i" class="mt-2 col-span-1 w-full h-[100px] flex items-center">
        <div class="w-[75px] h-full animate-pulse bg-black/10 rounded-2xl" />
        <div class="px-5 w-[120px]">
          <h3 class="w-[85] h-[9px] animate-pulse bg-black/10 rounded-2xl" />
          <h3 class="w-[75px] h-[9px] animate-pulse bg-black/10 rounded-2xl mt-3" />
          <h3 class="w-[65px] h-[9px] animate-pulse bg-black/10 rounded-2xl mt-3" />
        </div>
      </div>
    </div>
  </div>
  <div class="px-4 mt-10 pb-24">
    <div class="flex justify-between">
      <h3 class="w-[200px] h-[15px] animate-pulse bg-black/10 rounded-2xl" />
      <span class="w-[80px] h-[15px] animate-pulse bg-black/10 rounded-2xl" />
    </div>
    <div class="grid grid-cols-4 mt-3 gap-4">
      <div v-for="i of 8" :key="i" class="mt-2 col-span-1 w-full flex items-center">
        <div class="w-[105px] h-[139px] animate-pulse bg-black/10 rounded-2xl" />
      </div>
    </div>
  </div>
</template>
