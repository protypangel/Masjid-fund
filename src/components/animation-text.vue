<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<{ duration?: number }>()
const duration = `${props.duration ?? 3}s`

const parent = ref<HTMLElement | null>(null)
const parentBg = ref('')

onMounted(() => {
  if (parent.value) {
    const cs = getComputedStyle(parent.value) as any
    parentBg.value = cs.color || 'yellow'
  }
})
</script>

<template>
  <div ref="parent"  data-component="animation-text">
    <div :style="{'--parent-color': parentBg}">
      <div
        class="text-gradient animate-gradient-x"
        :style="{'--duration': duration}"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
<style lang="css">
@import "../main.css";

.animate-gradient-x:hover {
  animation: gradient-x var(--duration,3s) ease infinite;
  background-size: 2000% 100%;
}
@keyframes gradient-x {
  0%   { background-position: left; }
  50%  { background-position: right; }
  100% { background-position: left; }
}
.text-gradient {
  @apply bg-clip-text hover:text-transparent;
  @apply bg-gradient-to-r from-primary via-secondary to-[var(--parent-color)]; 
}
</style>
