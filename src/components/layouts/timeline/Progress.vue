<script setup lang="ts">
import { StepStatusToPurcent, Purcent, ProgressProps, ProgressEmits, statusUI } from '@/interfaces/layouts/Timeline'
import { ref, onMounted, nextTick, computed, ComputedRef } from 'vue'

const props = defineProps<ProgressProps>()

const emit = defineEmits<ProgressEmits>()


const showPurcents = ref(false)

let purcents = computed(() => (showPurcents.value ? purcentsCalculated.value : {
  doing: 0,
  done: 0,
}))

const purcentsCalculated: ComputedRef<Purcent> = computed(() => {
  const purcents = StepStatusToPurcent(props.steps)
  return {
    doing: purcents.doing + purcents.done,
    done: purcents.done,
  }
})



emit('update:modelTotal', purcentsCalculated.value.doing)


onMounted(() => {
  nextTick(() => {
    showPurcents.value = true
  })
})

</script>
<template>
  <div class="relative rounded-full flex w-full h-2 bg-muted-foreground/20 overflow-hidden">
    <div
      v-for="(purcent, index) in purcents" 
      :key="index"
      class="absolute left-0 top-0 rounded-full h-full transition-[width] duration-2000"
      :class="`bg-${statusUI[index].color}`"
      :style="{ width: purcent + '%' }"/>
  </div>
  <div class="flex items-center gap-2 text-xs text-muted-foreground px-2">
    <div 
      class="flex items-baseline gap-1"
      v-for="(status, index) in statusUI" 
      :key="index">
      <div class="h-2 w-2 rounded-full" :class="`bg-${statusUI[index].color}`"></div>
      <span>{{ status.title }}</span>
    </div>
  </div>
</template>