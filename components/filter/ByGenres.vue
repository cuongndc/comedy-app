<script setup>
import {ref} from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import {SelectorIcon} from '@heroicons/vue/solid'
import {computed, useRoute} from '#imports';
import {GENRES_NT} from '~/types';
import {watch} from "vue-demi";

const route = useRoute();
const {query} = route;
const genres = ref(query.genres)

const genreDefault = computed(() => {
  if (genres.value) {
    return GENRES_NT.find(genre => genre.value === genres.value)
  }

  return {}
})

const selected = ref(genreDefault.value)
const emits = defineEmits(['selectGenres']);
watch([selected], (value) => {
  emits('selectGenres', value);
});
</script>

<template>
  <div class="flex py-1 mt-2 grid relative items-center w-[180px]">
    <a class="my-2 font-secondary text-xl lg:text-2xl text-left">(1) Thể loại</a>
    <Listbox v-model="selected">
      <ListboxButton
          class="h-[34px] btn bg-deep-black flex items-center border-white text-white flex justify-between w-[180px]"
          style="border-radius: 0">
        {{ selected?.label }}
        <SelectorIcon class="h-5 w-5" aria-hidden="true"/>
      </ListboxButton>
      <ListboxOptions
          class="w-full absolute z-10 bg-deep-black text-white cursor-pointer lg:h-[300px] overflow-scroll"
          style="top: 75px; height: 300px; overflow: scroll">
        <ListboxOption class="py-2 px-5 hover:bg-highlight" v-for="view in GENRES_NT" :key="view"
                       :value="view">
          {{ view.label }}
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
  </div>
</template>