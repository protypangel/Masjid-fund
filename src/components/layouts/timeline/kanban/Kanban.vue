<script setup lang="ts">
import type { StepStatusType, KanbanProps } from '@/interfaces/layouts/Timeline/Kanban';
import Card from './Card.vue';  
import { computed, ref } from 'vue';
import { StringFormatter } from '@/interfaces/functions/Formatter';
import Badge from '@/assets/timeline/BadgeCheck.svg';
import type { CardProps } from '@/interfaces/layouts/Timeline/Card';
import { StepStatus, statusUI, formatKanbanPropsToRecordStepStatus_CardPropsArray } from '@/interfaces/layouts/Timeline/Kanban';

const props = defineProps<KanbanProps>();

const isLoading = ref(true)

const stepNull = ref<CardProps[]>([
  { step: undefined },
  { step: undefined },
  { step: undefined },
])

const stepStatus = computed<Record<StepStatusType, CardProps[]>>(() => {
  if (!isLoading.value) return formatKanbanPropsToRecordStepStatus_CardPropsArray(props)

  return StepStatus.reduce<Record<StepStatusType, CardProps[]>>((acc, status, index) => {
    acc[status] = new Array(1).fill({step: undefined})
    return acc
  }, {} as Record<StepStatusType, CardProps[]>)
})

const gridCols = computed(() => {
  return `grid-cols-${props.currentFilter.size}`
})

</script>

<template>
  <div class="grid gap-4" :style="{ 'grid-template-columns': `repeat(${props.currentFilter.size}, minmax(0, 1fr))` }">
    <div
    v-for="(steps, index) in stepStatus" 
    :key="index" 
    class="flex flex-col gap-4 grid-col-span-1">
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
        ]">
          <div class="flex items-center gap-2">
            <div 
            class="bg-primary-dark py-[8.5px] px-[8.5px]"
            v-if="index === 'done'">
              <Badge
                class="w-6 h-6"
                :style="'--background-color: var(--color-primary)'"
              />
            </div>
            <p>{{ StringFormatter.firstLetterToUppercase(statusUI[index].title) }}</p>
          </div>
          <p class="text-sm font-semibold" v-if="!isLoading"> {{ steps.length }} </p>
        </div>
        <Card v-for="step in steps" :step="step.step" />
    </div>
  </div>
</template>