<script setup lang="ts">
interface Represent {
  _id: string
  imageRepresent: string
  chapterNum: string
}

defineProps({
  representData: Array as () => Represent[],
})
</script>

<template>
  <div class="px-5 overflow-auto whitespace-nowrap scrollbar-hide" style="display: -webkit-box">
    <div v-for="chapter in representData" :key="chapter._id">
      <SharedMeeToonImg
        class="h-[40px] w-[100px] inline-block object-cover border-[1px] border-white mr-4 rounded-xl"
        :lazy="true"
        :src="chapter.imageRepresent"
      />
      <p class="text-white text-base mt-2">
        Chương {{ chapter.chapterNum }}
      </p>
    </div>
  </div>
</template>
