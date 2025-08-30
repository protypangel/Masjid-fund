<script setup lang="ts">
import { firstLetterToUppercase, StepStatus, statusUI, TimelineStep } from '@/interfaces/layouts/Timeline';
import Card from './Card.vue';

const props = defineProps<{
  steps: TimelineStep[],
  currentFilter: Set<StepStatus>,
}>();
</script>

<template>
  <div class="grid gap-4" :class="`grid-cols-${currentFilter.size}`">
    <div
      v-for="filter in currentFilter" :key="filter" class="overflow-auto">
      <div class="flex flex-col gap-4 grid-col-span-1">
        <p 
          class="text-base font-semibold px-4 py-2 rounded-md"
          :class="[
            `bg-${statusUI[filter].color}`,
            `text-${statusUI[filter].color}-foreground`,
          ]"
          > {{ firstLetterToUppercase(statusUI[filter].title) }} </p>
        <Card v-for="step in steps.filter(step => step.status === filter)" v-bind="step" />
      </div>
    </div>
  </div>
</template>