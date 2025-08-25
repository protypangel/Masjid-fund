<script setup lang="ts">
import { ref, onMounted } from "vue"

const props = withDefaults(defineProps<{
  target: number,
  duration?: number,
  disable?: boolean
}>(), {
  duration: 1000,
  disable: false
});

const current = ref(props.disable ? props.target : 0);

onMounted(() => {
  if (props.disable) return;

  const startTime = performance.now()
  function animate(time: number) {
    const progress = Math.min((time - startTime) / props.duration, 1)
    current.value = Math.floor(progress * props.target)

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }
  requestAnimationFrame(animate)
})

</script>

<template>
  <div class="w-content">{{ current }}</div>
</template>
