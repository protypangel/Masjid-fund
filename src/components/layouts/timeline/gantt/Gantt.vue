<script setup lang="ts">
import { StepStatus, TimelineStep } from '@/interfaces/layouts/Timeline/Timeline';

const props = defineProps<{
  steps: TimelineStep[],
  currentFilter: Set<StepStatus>,
}>();
</script>

<template>
  <div></div>
</template>