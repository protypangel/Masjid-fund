<script setup lang="ts">
import { StepStatus, TimelineStep } from '@/interfaces/layouts/Timeline'
import { ref, onMounted, nextTick } from 'vue'

const props = defineProps<{
  steps: TimelineStep[]
  modelTotal: number
}>()

const emit = defineEmits<{
  'update:modelTotal': [total: number]
}>()

const statusUI: Record<StepStatus, { title: string, color: string}> = {
  done: {
    title: 'Terminé',
    color: 'bg-primary',
  },
  doing: {
    title: 'En cours',
    color: 'bg-secondary',
  },
  todo: {
    title: 'A faire',
    color: 'bg-muted-foreground/20',
  },
}

type Purcent = Record<'doing' | 'done', number>

const purcents = ref<Purcent>({
  doing: 0,
  done: 0,
})

const purcentsCalculated: Purcent = {
  doing: 80,
  done: 20,
}

emit('update:modelTotal', purcentsCalculated.doing)


function getPurcentCumulatorOnStatus(status: StepStatus) {
  return props.steps.filter(s => s.status === status).reduce((acc, s) => acc + s.progress, 0)
}

onMounted(() => {
  nextTick(() => {
    purcents.value = {
      doing: purcentsCalculated.doing,
      done: purcentsCalculated.done,
    }
  })
})

</script>
<template>
  <div class="relative rounded-full flex w-full h-2 bg-muted-foreground/20 overflow-hidden">
    <div
      v-for="(purcent, index) in purcents" 
      :key="index"
      class="absolute left-0 top-0 rounded-full h-full transition-[width] duration-2000"
      :class="statusUI[index].color"
      :style="{ width: purcent + '%' }"/>
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
</template>