<script setup lang="ts">
import { StepStatus, statusUI, TimelineStep, KanbanProps } from '@/interfaces/layouts/Timeline/Kanban';
import Card from './Card.vue';  
import { computed } from 'vue';
import { StringFormatter } from '@/interfaces/functions/Formatter';

const props = defineProps<KanbanProps>();

const stepStatus = computed<Record<StepStatus, TimelineStep[]>>(() => {
  return props.steps.reduce((acc, step) => {
    if (!props.currentFilter.has(step.status)) return acc;
    acc[step.status] = [...(acc[step.status] || []), step] as TimelineStep[]
    return acc
  }, {} as Record<StepStatus, TimelineStep[]>)
})

const gridCols = computed(() => {
  return `grid-cols-${props.currentFilter.size}`
})

</script>

<template>
  <div class="grid gap-4" :style="{ 'grid-template-columns': `repeat(${props.currentFilter.size}, minmax(0, 1fr))` }">
    <div
      v-for="(steps, index) in stepStatus" :key="index" class="flex flex-col gap-4 grid-col-span-1">
        <p 
          class="text-base font-semibold px-4 py-2 rounded-md flex items-center justify-between gap-2"
          :class="[
            statusUI[index].background,
            statusUI[index].color,
          ]"
          >
          <span>{{ StringFormatter.firstLetterToUppercase(statusUI[index].title) }}</span>
          <span class="text-sm font-semibold"> {{ steps.length }} </span>
        </p>
        <Card v-for="step in steps" v-bind="step" />
    </div>
  </div>
</template>