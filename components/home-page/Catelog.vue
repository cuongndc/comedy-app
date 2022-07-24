<script setup>
</script>

<template>
  <div class="px-4 mb-4 mt-4">
    <h2 class="flex h-[20px] text-3xl font-bold justify-start items-center text-black">
      # Phân loại
    </h2>
    <div class="grid grid-cols-2">
      <div class="col-span-1 odd_margin-left odd_margin-right mt-5">
        <NuxtLink to="/category/mao-hiem">
          <SharedImg loading="lazy" format="webp" quantity="100" class="rounded-xl w-full" src="/images/mao-hiem.png"
            fil="fill" />
        </NuxtLink>
      </div>

      <div class="col-span-1 odd_margin-left odd_margin-right mt-5">
        <NuxtLink to="/category/fantasy-105">
          <SharedImg loading="lazy" quantity="100" format="webp" class="rounded-xl" src="/images/huyen-huyen.png"
            fil="fill" />
        </NuxtLink>
      </div>

      <div class="col-span-1 odd_margin-left odd_margin-right mt-5">
        <NuxtLink to="/category/dam-my">
          <SharedImg loading="lazy" class="rounded-xl" quantity="100" format="webp" src="/images/dam-my.png"
            fil="fill" />
        </NuxtLink>
      </div>

      <div class="col-span-1 odd_margin-left odd_margin-right mt-5">
        <NuxtLink to="/category/comic">
          <SharedImg loading="lazy" quantity="100" format="webp" class="rounded-xl" src="/images/tong-tai.png"
            fil="fill" />
        </NuxtLink>
      </div>

      <div class="col-span-1 odd_margin-left odd_margin-right mt-5">
        <NuxtLink to="/category/co-dai-207">
          <SharedImg loading="lazy" quantity="100" format="webp" class="rounded-xl" src="/images/nu-cuong.png"
            fil="cover" />
        </NuxtLink>
      </div>

      <div class="col-span-1 odd_margin-left odd_margin-right mt-5">
        <NuxtLink to="/category/school-life">
          <SharedImg loading="lazy" quantity="100" class="rounded-xl" format="webp" src="/images/truong-hoc.png"
            fil="cover" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>