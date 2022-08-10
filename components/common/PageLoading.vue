<script setup>
defineProps({
  className: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="flex w-full bg-black/40 h-full fixed z-50">
    <img src="/loading/pikachu.gif" alt="loading" class="h-[50px] fixed top-[50%] left-[calc(50%_-_30px)]">
  </div>
</template>
