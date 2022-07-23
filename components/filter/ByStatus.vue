<script setup>
import {ref} from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import {SelectorIcon} from '@heroicons/vue/solid'
import {STATUS_NT} from "~/types";
import {watch, useRoute, computed} from "#imports";

const route = useRoute();
const {query} = route;
const status = ref(query.status)

const statusDefault = computed(() => {
  if (status.value) {
    return STATUS_NT.find(statusI => statusI.value === status.value)
  }

  return {}
})

const selected = ref(statusDefault.value)
const emits = defineEmits(['selectStatus']);
watch([selected], (value) => {
  emits('selectStatus', value);
});

</script>

<template>
  <div class="flex py-1 mt-2 grid relative items-center w-[180px]">
    <a class="my-2 font-secondary text-xl lg:text-2xl text-left">(4) Trạng thái</a>
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
        <ListboxOption class="py-2 px-5 hover:bg-highlight" v-for="view in STATUS_NT" :key="view"
                       :value="view">
          {{ view.label }}
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
  </div>
</template>