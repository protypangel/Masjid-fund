<script setup lang="ts">
import { TimelineStep } from '@/interfaces/layouts/Timeline/Timeline';
import LinkIcon from '@/assets/timeline/Link.svg';
import { ref } from 'vue';
import FieldWaitting from '@/components/animation/FieldWaitting.vue';
import { DateFormatter } from '@/interfaces/functions/Formatter';

defineProps<TimelineStep>();

const isLoading = ref(true)

</script>

<template>
  <div 
    class="
      py-2 px-4 flex flex-col gap-2
      border border-border rounded-md cursor-pointer
    ">
    <div class="flex flex-col gap-1">
      <div class="flex justify-between items-end">
        <FieldWaitting :loading="isLoading" class="text-base text-accent font-semibold" :example-text="title">
          {{ title }}
        </FieldWaitting>
        <FieldWaitting :loading="isLoading" class="text-sm text-accent font-semibold" example-text="Dec-2025">
          {{ DateFormatter.MonthYear(periode.end) }}
        </FieldWaitting>
      </div>
      <p class="text-xs text-muted-foreground font-semibold" v-if="subtitle">
        {{ subtitle }}
      </p>
      <FieldWaitting v-if="status === 'doing'" :loading="isLoading" class="text-xs font-semibold text-muted-foreground" :example-text="`Progression : ${progress}%`">
        Progression : {{ progress }}%
      </FieldWaitting>
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