<script setup lang="ts">
import { PhoneIcon, EnvelopeIcon, BuildingLibraryIcon } from '@heroicons/vue/24/outline'

// import { ref } from 'vue'

const props = defineProps<{
  mobileOpen: boolean
  isActive: (path: string) => boolean,
  phone: string,
  email: string,
  navItems: {
    label: string,
    path: string
  }[]
}>();

function colorFromActive(path: string): string {
  return props.isActive(path) ? 'text-primary' : 'text-foreground'
}

</script>
<template>
  <header class="sticky top-0 z-40 w-screen inset-0 bg-header shadow-soft border-b border-border">
    <div class="mx-auto max-w-7xl px-8 py-4 flex justify-between">
       <RouterLink 
        to="/"
        class="flex gap-4 items-center">
          <span class="inline-grid place-items-center h-10 w-10 rounded-lg bg-[#0d6b4d] text-white shadow">
            <BuildingLibraryIcon class="h-5 w-5" />
          </span>
          <div :class="colorFromActive('/')">
            <span class="h-fit font-bold text-base">Nour Essalam</span>
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
        <div class="h-6 w-px bg-border"></div>
        <div class="flex gap-4 items-center">
          <a :href="'tel:' + phone" class="inline-flex items-center gap-2 hover:text-primary hover:font-bold text-xs">
            <PhoneIcon class="h-4 w-4" />
            <span>{{ phone }}</span>
          </a>
          <a :href="'mailto:' + email" class="inline-flex items-center gap-2 hover:text-primary hover:font-bold text-xs">
            <EnvelopeIcon class="h-4 w-4" />
            <span>{{ email }}</span>
          </a>
        </div>
       </div>
    </div>
  </header>
</template>