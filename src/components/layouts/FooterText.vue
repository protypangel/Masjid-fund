<script setup lang="ts">
import { FooterTextProps } from '@/interfaces/layouts/FooterText';
import { ref } from 'vue'

const el = ref<HTMLDivElement | null>(null)

// expose la ref DOM ou des méthodes au parent
defineExpose({
  el,
  focus: () => el.value?.focus()
})

defineProps<FooterTextProps>();

</script>
<template>
  <div
    ref="el"
    class="
      absolute inset-0 h-fit text-center
      flex flex-col items-center justify-center
      px-4 tablet:px-8 laptop:px-12
      py-4 [@media(--hbase)]:py-8
    ">
    <div class="text-base text-foreground font-bold">
      « {{ text }} »
    </div>
    <div class="mt-2 font-semibold text-secondary">
      {{ type }} — {{ author }}
    </div>
  </div>
</template>