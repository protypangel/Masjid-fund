<script setup lang="ts">
import { ref, useSlots, computed } from 'vue'
const hover = ref(false)
const slots = useSlots()

const hasContainerHover = computed(() => !!slots['container-hover'])
const hasSubtitleHover  = computed(() => !!slots['subtitle-hover'])
</script>

<template>
  <div
    class="h-[150px] p-2 hover:p-0 transition-[padding,border-width,border-color] duration-300 ease-in-out"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <div class="relative h-full rounded-xl bg-background border border-border hover:border-[currentColor] hover:border-2 shadow-soft px-9 flex flex-col gap-3 justify-center">
      <div class="text-xs text-accent font-bold">
        <slot name="title" />
      </div>

      <div class="flex flex-col gap-1">
        <div class="text-xl font-bold">
          <Transition name="slide" mode="out-in">
            <div class="block w-full">
              <slot name="container-hover" v-if="hover && hasContainerHover" />
              <slot name="container" v-else />
            </div>
          </Transition>
        </div>

        <div class="text-xs text-accent font-bold">
          <Transition name="slide" mode="out-in">
            <div class="block w-full">
              <slot name="subtitle-hover" v-if="hover && hasSubtitleHover" />
              <slot name="subtitle" v-else />
            </div>  
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity .3s ease, transform .3s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(-100px); /* arrive de gauche */
}
.slide-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.slide-leave-to {
  transform: translateX(100px);  /* part à droite */
}
</style>
