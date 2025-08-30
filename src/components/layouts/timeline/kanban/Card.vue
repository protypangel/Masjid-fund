<script setup lang="ts">
import { TimelineStep, DateToMonthYear } from '@/interfaces/layouts/Timeline';
import LinkIcon from '@/assets/timeline/Link.svg';

const props = defineProps<TimelineStep>();

</script>

<template>
  <div 
    class="
      py-2 px-4 flex flex-col gap-2
      border border-border rounded-md
    ">
    <div class="flex flex-col gap-0">
      <div class="flex justify-between items-end">
        <span class="text-base text-accent font-semibold">{{ title }}</span>
        <span class="text-sm text-accent font-semibold">{{ DateToMonthYear(periode.end) }}</span>
      </div>
      <p class="text-xs text-muted-foreground font-semibold" v-if="subtitle">
          {{ subtitle }}
          <span v-if="status === 'doing'">
            - {{ progress }}%
          </span>
      </p>
    </div>
    <p class="text-sm text-muted-foreground" v-if="description">{{ description }}</p>
    <div class="flex gap-4 justify-between border-t items-baseline border-border pt-2" v-if="!!tags.length || !!links.length">
      <div class="flex gap-2 overflow-auto">
        <span 
          v-for="(tag, index) in tags" 
          :key="index" 
          class="text-xs text-accent-light font-semibold rounded-md px-2 py-1 bg-accent"
        >
          {{ tag }}
        </span>
      </div>
      <div class="flex items-center gap-2" v-if="!!links.length">
        <span class="text-sm text-accent font-semibold"> {{ links.length }} </span>
        <LinkIcon class="w-4 h-4 text-accent" />
      </div>
    </div>
  </div>
</template>