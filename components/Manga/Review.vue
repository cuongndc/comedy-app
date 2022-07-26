<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

defineProps({
  review: String,
})
</script>

<template>
  <div class="flex-col-reverse flex">
    <Disclosure v-slot="{ open }">
      <DisclosureButton>
        <button class="flex w-full flex-col items-center bg-cyan-300/0 text-white">
          Tóm tắt
          <svg :class="open ? 'rotate-180 transform' : ''" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="h-8 w-8"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </button>
      </DisclosureButton>
      <DisclosurePanel class="transform scale-100 opacity-100">
        <p class="text-white">
          {{ review }}
        </p>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>
