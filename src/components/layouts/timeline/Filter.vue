<script setup lang="ts">
import FilterIcon from '@/assets/project/Filter.svg'
import CheckIcon from '@/assets/project/check.svg'

import { reactive, ref } from 'vue'
import { FilterEmits, FilterProps, FilterPageLabel, StepStatus, typesPage } from '@/interfaces/layouts/Timeline'

const props = defineProps<FilterProps>()
const emit = defineEmits<FilterEmits>()

if (props.onlyOnFilter) {
  const filterArray = Array.from(props.modelFilter);
  switch (filterArray.length) {
    case 0:
      props.modelFilter.add('todo')
      emit('update:modelFilter', props.modelFilter)
      break;
    case 1:
      break;
    default:
      props.modelFilter.clear()
      props.modelFilter.add(filterArray[0])
      emit('update:modelFilter', props.modelFilter)
      break;
  }
}

const types = typesPage
const actualPage = ref(0)
const filterOpen = ref(false)

const filter = reactive<Record<StepStatus, string>>({
  todo: 'A faire',
  doing: 'En cours',
  done: 'Terminé',
})

function changePage(label: FilterPageLabel, index: number) {
  actualPage.value = index
  emit('update:modelPage', label);
}

function toggleFilter() {
  filterOpen.value = !filterOpen.value
}

function toggleFilterOnlyOne(item: StepStatus) {
  if (props.modelFilter.has(item)) return;
  props.modelFilter.clear()
  props.modelFilter.add(item)
  emit('update:modelFilter', props.modelFilter)
}

function toggleFilterElement(item: StepStatus) {
  if (props.onlyOnFilter) return toggleFilterOnlyOne(item);
  if (props.modelFilter.has(item)) {
    props.modelFilter.delete(item)
  } else {
    props.modelFilter.add(item)
  }
  emit('update:modelFilter', props.modelFilter)
}

</script>
<template>
  <div class="flex justify-between select-none">
    <div class="flex container">
      <div
        class="flex bg-header border-y border-r border-border p-2 gap-2 items-center cursor-pointer"
        v-for="(type, index) in types"
        :key="index"
        :class="{ 'bg-primary-light': actualPage === index }"
        @click="changePage(type.title, index)"
      >
        <component :is="type.icon" class="w-6 text-primary [--background-color:theme(--color-primary)]"/>
        <span class="hidden phone:block text-sm font-semibold">{{ type.title }}</span>
      </div>
    </div>
    <div class="flex relative">
      <div
        class="flex  bg-header border border-border rounded-[10px] px-2 py-3 gap-2 items-center cursor-pointer"
        :class="{ 'bg-primary-light': filterOpen }"
        @click="toggleFilter"
      >
        <FilterIcon class="w-6 text-primary [--background-color:theme(--color-primary)]"/>
        <span class="hidden phone:block text-sm font-semibold">Filtrer</span>
      </div>
      <transition name="fade">
        <div
          v-if="filterOpen"
          class="
            bg-header shadow-md
            border border-border rounded-[10px]
            absolute top-full mt-2 right-0
            flex flex-col gap-2 p-2
            w-max
          ">
            <p class="text-sm font-semibold">Afficher</p>
            <div class="flex flex-col">
              <div
                v-for="(item, index) in filter"
                :key="index"
                class="
                  cursor-pointer
                  flex justify-between items-center gap-4
                  w-full p-2 rounded-[10px] hover:bg-primary-light
                "
                @click="toggleFilterElement(index)"
              >
                <p class="text-sm font-semibold">{{ item }}</p>
                <CheckIcon 
                  :class="[props.modelFilter.has(index as StepStatus) ? 'opacity-100' : 'opacity-0']"
                  class="
                    transition-all duration-300
                    w-4
                    text-primary [--background-color:theme(--color-primary)]
                  "/>
              </div>
            </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<style scoped>
.container > div:first-child {
  border-left: 1px solid var(--color-border) !important;
  border-radius: 10px 0px 0px 10px;
}
.container > div:last-child {
  border-radius: 0 10px 10px 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>