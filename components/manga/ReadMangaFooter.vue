<script setup lang="ts">
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/solid'

const emit = defineEmits(['nextProcess'])
const prev = () => {
  emit('nextProcess', 'prev')
}

const next = () => {
  emit('nextProcess', 'next')
}
</script>

<template>
  <div class="h-[200px] w-full overflow-hidden py-4 bg-accent-1">
    <div class="mx-auto flex h-full w-full flex-col space-y-4 md:w-1/2">
      <div class="flex h-full w-full gap-4">
        <button
          data-id="prev" class="absolute-center z-[700] h-full w-[20%] border-2 border-dashed border-white/40 px-2 text-white/40 transition-all hover:border-white hover:text-white md:gap-2"
          @click="prev"
        >
          <ArrowLeftIcon class-name="inline h-8 w-8" />
          Chapter trước
        </button>
        <button
          data-id="next" class="absolute-center h-full w-[80%] gap-2 border-2 border-dashed border-white/40 text-white/40 transition-all hover:border-white hover:text-white"
          @click="next"
        >
          Chapter kế tiếp
          <ArrowRightIcon class-name="inline-block h-8 w-8" />
        </button>
      </div>
      <h1 class="py-4 px-2 text-center text-white/75">
        Mẹo: Bạn có thể double tap/click vào 2 cạnh của màn hình để chuyển chap ở bất cứ vị trí nào ở chế độ dọc!
      </h1>
    </div>
  </div>
</template>
