<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{ duration?: number, class?: string }>(), 
  { duration: 1, class: '' }
)
const duration = computed(() => `${props.duration}s`)
const root = ref<HTMLElement|null>(null)

function tick() {
  const host = root.value!
  const target = host.parentElement ?? host
  const rgb = getComputedStyle(target).color as string
  host.style.setProperty('--c', rgb)
  console.log(rgb)
}

watch(() => props.class, () => {
  nextTick().then(tick)
})

onMounted(() => {
  nextTick().then(tick)
})
</script>

<template>
  <div :class="class">
    <div
      ref="root"
      class="bg-clip-text hover:text-transparent group-hover:text-transparent
            bg-gradient-to-r from-primary via-secondary to-[var(--c)]
            animate-gradient-x"
      :style="{ '--duration': duration }"
    >
      <slot />
    </div>
  </div>
</template>

<style>
@import "@/main.css";

/* garde l'anim telle quelle */
.animate-gradient-x {
  animation: gradient-x var(--duration) ease infinite;
  background-size: 500% 100%;
}
@keyframes gradient-x {
  0% { background-position: left; }
  50% { background-position: right; }
  100% { background-position: left; }
}
</style>
