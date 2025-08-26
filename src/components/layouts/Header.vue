<script setup lang="ts">
import Logo from '@/assets/Logo.svg'
import Mail from '@/assets/Mail.svg'
import Phone from '@/assets/Phone.svg'
import AnimationText from '@/components/animation/TextSwapColor.vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import type HeaderType from '@/interfaces/layouts/Header'

const props = defineProps<HeaderType>();

const route = useRoute()


const colorFromActive = ref(function (path: string): string {
  return route.path === path ? 'text-primary' : 'text-foreground'
})

const hrefList = computed<Array<{
  href: string,
  label: string,
  icon: any
}>>(() => {
  return [{
    href: `tel:${props.phone.split(' ').join('')}`,
    label: props.phone,
    icon: Phone
  },
  {
    href: `mailto:${props.email}`,
    label: props.email,
    icon: Mail
  }
]})

</script>
<template>
  <header class="flex w-screen inset-0 bg-header shadow-soft border-b border-border justify-center">
    <!-- mx-auto max-w-none laptop:max-w-7xl w-full px-8 py-4 flex justify-between -->
    <div class="flex w-full laptop:max-w-7xl max-w-7xl px-8 py-4 justify-between">
      <RouterLink
      to="/"
      class="flex gap-2 tablet:gap-4 items-center">
        <Logo class="w-5 tablet:w-8 h-auto"/>
        <AnimationText :duration="2" class="font-bold text-sm tablet:text-lg" :class="colorFromActive('/')">Nour Essalam</AnimationText>
      </RouterLink>
      <div class="flex gap-4 items-center">
        <div class="flex gap-4 items-center">
          <RouterLink 
            v-for="(item, index) in navItems"
            :key="index"
            :to="item.path"
            class="text-sm font-medium hover:text-primary"
            :class="colorFromActive(item.path)">
                {{ item.label }}
          </RouterLink>
        </div>
        <div class="h-8 w-px bg-border"></div>
        <div class="flex gap-2 text-xs text-accent">
          <a 
          v-for="(item, index) in hrefList"
          :key="index"
          :href="item.href"
          class="group inline-flex items-center gap-2 text-accent cursor-pointer hover:text-primary">
            <component :is="item.icon" :width="16" />
            <AnimationText :duration="2" class="font-semibold hidden tablet:block">{{ item.label }}</AnimationText>
          </a>
        </div>
      </div>
    </div>
  </header>
</template>