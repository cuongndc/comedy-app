<template>
  <form @click="open" class="flex">
    <div class="h-full w-fit rounded-2xl p-4 hover:cursor-pointer hover:opacity-60 text-background flex items-center">
      <NuxtLink to="/filter">
        <SvgSearch class="mr-4"/>
      </NuxtLink>
      <SvgNotify class=""/>
    </div>
  </form>
</template>