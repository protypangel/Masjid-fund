<script setup lang="ts">
import { FilterPageLabel, TimelineProps, StepStatus } from '@/interfaces/layouts/Timeline'
import { computed, reactive, ref } from 'vue'
import { getCurrentInstance } from 'vue'
import ListIcon from '@/assets/List.svg'
import Type from './Filter.vue'

const props = withDefaults(defineProps<TimelineProps>(), {
  title: 'Timeline',
  steps: () => [],
})

const filters = reactive<Record<StepStatus, boolean>>({ todo: true, doing: true, done: true })
function toggleFilter(status: StepStatus) {
  filters[status] = !filters[status]
}
const filteredSteps = computed(() => props.steps.filter(s => filters[s.status]))

function getPurcentCumulatorOnStatus(status: StepStatus) {
  return props.steps.filter(s => s.status === status).reduce((acc, s) => acc + s.progress, 0)
}

const purcents = computed<Record<Exclude<StepStatus | 'total', 'todo'>, number>>(() => {
  const doing = getPurcentCumulatorOnStatus('doing')
  const done = getPurcentCumulatorOnStatus('done')
  return {
    doing: doing / props.steps.length,
    done: done / props.steps.length,
    total: (doing + done) / props.steps.length,
  }
})

const statusUI: { title: string, color: string, status: StepStatus }[] = [
  {
    title: 'A faire',
    color: 'bg-secondary',
    status: 'todo'
  },
  {
    title: 'En cours',
    color: 'bg-primary',
    status: 'doing'
  },
  {
    title: 'Terminé',
    color: 'bg-muted-foreground/20',
    status: 'done'
  }
]

const currentPage = ref<FilterPageLabel>('Kanban')
const currentFilter = ref<Set<StepStatus>>(new Set())

</script>
<template>
  <div class="flex flex-col gap-4">
    <!-- Header -->
    <div class="flex gap-2 font-semibold text-primary text-base items-center">
      <ListIcon class="w-8 h-8 [--background-color:theme(--color-primary-light)]"/>
      <h2 class="font-bold">{{ title }}</h2>
    </div>
    <!-- Overall progress -->
    <div class="flex flex-col gap-2">
      <div class="flex items-baseline justify-between">
        <div class="text-sm text-muted-foreground">Avancement des travaux</div>
        <div class="text-sm font-semibold  text-accent">{{ purcents.total }}%</div>
      </div>
      <div class="relative rounded-full flex w-full h-2 bg-muted-foreground/20 overflow-hidden">
        <div class="absolute left-0 top-0 rounded-full h-full bg-secondary transition-[width] duration-500" :style="{ width: purcents.total + '%' }"></div>
        <div class="absolute left-0 top-0 rounded-full h-full bg-primary transition-[width] duration-500" :style="{ width: purcents.done + '%' }"></div>
      </div>
      <div class="flex items-center gap-2 text-xs text-muted-foreground">
        <div 
          class="flex items-baseline gap-1"
          v-for="(status, index) in statusUI" 
          :key="index">
          <div class="h-2 w-2 rounded-full" :class="status.color"></div>
          <span>{{ status.title }}</span>
        </div>
      </div>
    </div>
    <!-- Filters -->
    <Type
      v-model:modelPage="currentPage"
      v-model:modelFilter="currentFilter"
      :onlyOnFilter="false"
    />
    {{ currentPage }}
    {{ currentFilter }}
     <!-- Steps -->
      <div 
        class="flex"
        v-for="(step, index) in filteredSteps"
        :key="index"
      >  
        <!-- Header -->
         
      </div>
  </div>
</template>