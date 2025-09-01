<script setup lang="ts">
import { FilterPageLabel, TimelineProps, StepStatus, NumberOfFilter } from '@/interfaces/layouts/Timeline/Timeline'
import { computed, reactive, ref, onMounted, onUnmounted } from 'vue'
import ListIcon from '@/assets/List.svg'
import Type from './Filter.vue'
import Progress from './Progress.vue'
import Kanban from './kanban/Kanban.vue'
import Gantt from './gantt/Gantt.vue'

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
  numberOfFilter.value = 
    window?.innerWidth <= 600 ? 1 :
    window?.innerWidth < 900 ? 2 : 3
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
  
  <div class="flex flex-col gap-4 overflow-hidden">
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
    <transition name="fade" mode="out-in">
      <Kanban 
        v-if="currentPage === 'Kanban'" 
        :steps="filteredSteps"
        :currentFilter="currentFilter"
      />
      <Gantt 
        v-else-if="currentPage === 'Gantt'" 
        :steps="filteredSteps"
        :currentFilter="currentFilter"
      />
    </transition>
  </div>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>