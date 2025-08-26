<script setup lang="ts">
import { computed } from 'vue'
import ColorEffect from '@/components/effect/CSSStyleDeclarationFromParent.vue'

const props = withDefaults(
  defineProps<{ duration?: number}>(), 
  { duration: 1}
)
const duration = computed(() => `${props.duration}s`)

function getColor(style: CSSStyleDeclaration | undefined) {
  return style?.color ?? 'transparent'
}

</script>

<template>
  <ColorEffect v-slot="{ style }">
    <div
    ref="root"
    class="bg-clip-text hover:text-transparent group-hover:text-transparent bg-gradient-to-r from-primary via-secondary animate-gradient-x"
    :style="{ '--duration': duration, '--tw-gradient-to': getColor(style) }">
      <slot />
    </div>
  </ColorEffect>
</template>

<style>
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
