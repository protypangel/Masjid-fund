<script setup lang="ts">
import { FilterPageLabel, TimelineProps, StepStatus, NumberOfFilter } from '@/interfaces/layouts/Timeline'
import { computed, reactive, ref, onMounted, onUnmounted } from 'vue'
import ListIcon from '@/assets/List.svg'
import Type from './Filter.vue'
import Progress from './Progress.vue'

const props = withDefaults(defineProps<TimelineProps>(), {
  title: 'Timeline',
  steps: () => [],
})

const filters = reactive<Record<StepStatus, boolean>>({ todo: true, doing: true, done: true })

const filteredSteps = computed(() => props.steps.filter(s => filters[s.status]))


const currentPage = ref<FilterPageLabel>('Kanban')
const currentFilter = ref<Set<StepStatus>>(new Set(['done', 'doing', 'done']))

const totalPurcent = ref(0)

const numberOfFilter = ref<NumberOfFilter>(3)

function checkOnlyOnFilter() {
  numberOfFilter.value = 2 //window?.innerWidth > 425 ? 1 : 2
}

onMounted(() => {
  checkOnlyOnFilter()
  window.addEventListener('resize', checkOnlyOnFilter)
})
onUnmounted(() => {
  window.removeEventListener('resize', checkOnlyOnFilter)
})
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
        <div class="text-sm font-semibold  text-accent">{{ totalPurcent }}%</div>
      </div>
      <Progress
        v-model:modelTotal="totalPurcent"
        :steps="filteredSteps"
      />
    </div>
    <!-- Filters -->
    <Type
      v-model:modelPage="currentPage"
      v-model:modelFilter="currentFilter"
      :numberOfFilter="numberOfFilter"
    />
    {{ numberOfFilter }}
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