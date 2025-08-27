<!-- components/indicators/ScrollIndicator.vue -->
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import Arrow from '@/assets/Arrow.svg'
import type { ShouldScrollIndicatorProps } from '@/interfaces/indicator/ShouldScrollIndicator'
import { defaultShouldScrollIndicatorProps } from '@/interfaces/indicator/ShouldScrollIndicator'
const props = withDefaults(defineProps<ShouldScrollIndicatorProps>(), defaultShouldScrollIndicatorProps)

defineEmits<{
  click: []
}>()

const visible = ref<boolean>(props.initiallyVisible)
let hasHiddenOnce = false

const isDown = computed(() => props.direction === 'down')

function onScroll() {
  if (props.direction === 'down') {
    // si l’utilisateur a scrollé vers le bas de plus de threshold → cacher
    const scrolled = window.scrollY
    if (scrolled > props.threshold) {
      visible.value = false
      if (props.hidePermanently) {
        hasHiddenOnce = true
        removeListeners()
      }
    } else if (!hasHiddenOnce) {
      visible.value = true
    }
  } else {
    // direction 'up' : n’afficher l’indicateur que si on n’est PAS proche du haut
    const fromBottom =
      document.documentElement.scrollHeight -
      window.innerHeight -
      window.scrollY
    if (fromBottom > props.threshold) {
      // on n’est pas tout en bas → montrer (incite à remonter)
      visible.value = true
    } else {
      visible.value = false
      if (props.hidePermanently) {
        hasHiddenOnce = true
        removeListeners()
      }
    }
  }
}

function addListeners() {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
}

function removeListeners() {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
}

onMounted(() => {
  // état initial cohérent selon la position courante
  onScroll()
  addListeners()
})

onBeforeUnmount(() => {
  removeListeners()
})
</script>

<template>
  <div
    class="
      pointer-events-none 
      inset-x-0
      flex justify-center
    "
    aria-hidden="true"
    @click="$emit('click')"
  >
    <transition name="fade-scale">
      <div
        v-show="visible"
        class="
          pointer-events-auto inline-flex items-center 
          rounded-full border border-border/60 bg-background/70 px-4 py-2 shadow-sm backdrop-blur
        "
        :class="message ? 'gap-2' : 'gap-0'"
      >
        <Arrow           
         class="h-5 w-5"
          :class="[
            isDown ? 'rotate-0' : 'rotate-180',
            animated ? (isDown ? 'animate-bounce-down' : 'animate-bounce-up') : ''
          ]"/>

        <slot>
          <span class="text-sm font-medium text-foreground/90">
            {{ message }}
          </span>
        </slot>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Transition d’apparition/disparition */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 220ms ease, transform 220ms ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: translateY(4px) scale(0.98);
}

/* Animations de la flèche (subtiles) */
@keyframes bounceDown {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(4px); }
}
@keyframes bounceUp {
  0%, 100% { transform: translateY(0) rotate(180deg); }
  50% { transform: translateY(-4px) rotate(180deg); }
}
.animate-bounce-down { animation: bounceDown 1.2s ease-in-out infinite; }
.animate-bounce-up { animation: bounceUp 1.2s ease-in-out infinite; }
</style>
