<script setup>
import {computed, ref} from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import {useRoute} from '#imports'
import {SelectorIcon} from '@heroicons/vue/solid'
import {watch} from "vue-demi";
import {MANGA_NT} from '~/types';

const route = useRoute();
const {query} = route;
const comics = ref(query.comics)

const comicDefault = computed(() => {
  if (comics.value) {
    return MANGA_NT.find(manga => manga.value === comics.value)
  }

  return {}

  // return MANGA_NT[1];
})

const selected = ref(comicDefault.value)
const emits = defineEmits(['selectComic']);
watch([selected], (value) => {
  emits('selectComic', value);
});

</script>

<template>
  <div class="flex py-1 mt-2 grid relative items-center w-[180px]">
    <a class="my-2 font-secondary text-xl lg:text-2xl text-left">(2) Truyện tranh</a>
    <Listbox v-model="selected">
      <ListboxButton
          class="h-[34px] btn bg-deep-black flex items-center border-white text-white flex justify-between w-[180px] rounded-xl-[0px]"
          style="border-radius: 0">
        {{ selected?.label }}
        <SelectorIcon class="h-5 w-5" aria-hidden="true"/>
      </ListboxButton>
      <ListboxOptions
          class="w-full absolute z-10 bg-deep-black text-white cursor-pointer lg:h-[300px] overflow-scroll"
          style="top: 75px; height: 300px; overflow: scroll">
        <ListboxOption class="py-2 px-5 hover:bg-highlight" v-for="view in MANGA_NT" :key="view"
                       :value="view">
          {{ view.label }}
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
  </div>
</template>