<script setup lang="ts">
import { StepStatus, statusUI, TimelineStep, KanbanProps } from '@/interfaces/layouts/Timeline/Kanban';
import Card from './Card.vue';  
import { computed } from 'vue';
import { StringFormatter } from '@/interfaces/functions/Formatter';
import Badge from '@/assets/timeline/BadgeCheck.svg';

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
        <div
          class="
            text-base font-semibold 
            pr-4
            rounded-md 
            flex items-center justify-between gap-2 overflow-hidden
          "
          :class="[
            statusUI[index].background,
            statusUI[index].color,
            index !== 'done' ? 'py-2 pl-4' : ''
          ]"
          
          >
          <div class="flex items-center gap-2">
            <div class=""
              :class="index === 'done' ? [
                'bg-primary-dark',
                'py-[11.5px] px-[11.5px]'
              ] : [
              ]"
              >
              <Badge
                v-if="index === 'done'"
                class="w-5 h-5"
                :style="'--background-color: var(--color-primary)'"
              />
              <div v-else />
            </div>
            <p>{{ StringFormatter.firstLetterToUppercase(statusUI[index].title) }}</p>
          </div>
          <p class="text-sm font-semibold"> {{ steps.length }} </p>
        </div>
        <Card v-for="step in steps" v-bind="step" />
    </div>
  </div>
</template>