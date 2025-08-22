<script setup lang="ts">
import Logo from '@/assets/Logo.svg'
import Mail from '@/assets/Mail.svg'
import Phone from '@/assets/Phone.svg'
import AnimationText from '@/components/animations/TextSwapColor.vue'
import { computed } from 'vue'
import type HeaderType from '@/interfaces/layouts/Header'

const props = defineProps<HeaderType>();

function colorFromActive(path: string): string {
  return props.isActive(path) ? 'text-primary' : 'text-foreground'
}

const hrefList = computed(() => {
  return [
    ['tel', props.phone, Phone], 
    ['mailto', props.email, Mail]
  ]
})

</script>
<template>
  <header class="w-full inset-0 bg-header shadow-soft border-b border-border">
    <div class="mx-auto max-w-7xl w-full px-8 py-4 flex justify-between">
      <RouterLink 
      to="/"
      class="flex gap-4 items-center">
        <Logo class="w-8 h-auto"/>
        <div :class="colorFromActive('/')">
            <AnimationText :duration="2" class="text-base font-bold">Nour Essalam</AnimationText>
        </div>
      </RouterLink>
      <div class="flex gap-4 items-center">
        <div class="flex gap-4 items-center">
          <RouterLink 
            v-for="(item, index) in navItems"
            :key="index"
            :to="item.path"
            class="text-sm font-medium hover:text-primary"
            :class="colorFromActive(item.path)">
              <span class="text-sm">
                {{ item.label }}
              </span>
          </RouterLink>
        </div>
        <div class="h-8 w-px bg-border"></div>
        <div class="flex gap-2 text-xs text-accent">
          <a 
          v-for="(item, index) in hrefList"
          :key="index"
          ref="`${item[0]}:${item[1]}`"
          class="inline-flex items-center gap-2 text-accent hover:text-primary cursor-pointer"
          >
          <component :is="item[2]" :width="16" class="" />
            <AnimationText :duration="2">
              <div class="flex gap-2 items-center">
                <p class="font-semibold">{{ item[1] }}</p>
              </div>
            </AnimationText>
          </a>
        </div>
      </div>
    </div>
  </header>
</template>