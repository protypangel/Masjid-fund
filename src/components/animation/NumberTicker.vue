<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"

const props = defineProps({
  target: { type: Number, required: true },
  duration: { type: Number, default: 2000 },
  disable: { type: Boolean, default: false }
})

const current = ref(0)
const el = ref<HTMLElement | null>(null)

let observer: IntersectionObserver | null = null

function startAnimation() {
  if (props.disable) return

  const startTime = performance.now()
  function animate(time: number) {
    const progress = Math.min((time - startTime) / props.duration, 1)
    current.value = Math.floor(progress * props.target)
    if (progress < 1) requestAnimationFrame(animate)
  }
  requestAnimationFrame(animate)
}

onMounted(() => {
  if (!el.value) return

  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        startAnimation()
        observer?.disconnect() // stop observer une fois lancé
      }
    }
  }, { threshold: 0.3 }) // seuil: 30% visible

  observer.observe(el.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <div ref="el">
    {{ current }}
  </div>
</template>
