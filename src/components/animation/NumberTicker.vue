<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from "vue"
import { NumberTickerProps } from "@/interfaces/animation/NumberTicker"
import { defaultNumberTickerProps } from "@/interfaces/animation/NumberTicker"

const props = withDefaults(defineProps<NumberTickerProps>(), defaultNumberTickerProps)
// props: { target: number, duration: number, disable?: boolean, decimals?: number }

const current = ref(0) // valeur numérique
const el = ref<HTMLElement | null>(null)

let observer: IntersectionObserver | null = null

function startAnimation() {
  if (props.disable) return
  const startTime = performance.now()
  const decimals = props.decimals ?? 0

  function animate(time: number) {
    const progress = Math.min((time - startTime) / props.duration, 1)
    const value = progress * props.target
    // conserve les décimales voulues tout en restant un number
    current.value = Number(value.toFixed(decimals))
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
        observer?.disconnect()
      }
    }
  }, { threshold: 0.3 })
  observer.observe(el.value)
})

onBeforeUnmount(() => observer?.disconnect())

// (facultatif) formatage FR 1 234,56
const formatted = computed(() =>
  new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: props.decimals ?? 0,
    maximumFractionDigits: props.decimals ?? 0
  }).format(current.value)
)
</script>

<template>
  <div ref="el">
    {{ formatted }}
    <!-- ou {{ current }} si tu ne veux pas de formatage -->
  </div>
</template>
