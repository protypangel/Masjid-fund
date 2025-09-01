<script setup lang="ts">
import type { CardProps } from '@/interfaces/layouts/Timeline/Card';
import LinkIcon from '@/assets/timeline/Link.svg';
import FieldWaitting from '@/components/animation/FieldWaitting.vue';
import { DateFormatter } from '@/interfaces/functions/Formatter';
import { computed, ref } from 'vue';

const props = defineProps<CardProps>();

const isLoading = computed(() => !props.step)

function randomArray() {
  return Array.from({ length: Math.floor(Math.random() * 1) + 2 }).fill(0)
}

</script>

<template>
  <div 
    class="
      py-4 px-4 flex flex-col gap-2
      border border-border rounded-md cursor-pointer
    ">
    <div class="flex flex-col gap-1">
      <div class="flex justify-between items-start gap-2">
        <FieldWaitting :loading="isLoading" class="text-base text-accent font-semibold flex-1" example-text="title">
          {{ props.step!.title }}
        </FieldWaitting>
        <FieldWaitting 
          :loading="isLoading"
          :class="[
            isLoading ? 'text-base' : 'text-sm',
            'text-accent font-semibold',
          ]"
          example-text="Dec-2025">
          {{ DateFormatter.MonthYear(props.step!.periode.end) }}
        </FieldWaitting>
      </div>
      <FieldWaitting :loading="isLoading" v-if="isLoading || !!props.step!.subtitle">
        <div class="text-xs text-muted-foreground font-semibold">
          {{  props.step!.subtitle }}
        </div>
      </FieldWaitting>
      <FieldWaitting v-if="isLoading || props.step?.status === 'doing'" :loading="isLoading" class="text-xs font-semibold text-muted-foreground" :example-text="`Progression : ${props.step?.progress}%`">
        Progression : {{ props.step?.progress }}%
      </FieldWaitting>
    </div>
    <FieldWaitting 
      :loading="isLoading" 
      class="text-sm text-muted-foreground" 
      example-text="description<br>description<br>description"
      v-if="isLoading || !!props.step?.description"
    >
      {{ props.step!.description }}
    </FieldWaitting>
    <div 
      class="flex gap-4 justify-between border-t items-baseline border-border pt-2" 
      v-if="isLoading || (!!props.step?.tags?.length || !!props.step?.links?.length)"
    >
      <div class="flex flex-1 gap-2 py-0.5 overflow-auto">
        <FieldWaitting 
          :loading="isLoading" 
          v-for="(tag, index) in isLoading ? randomArray() : props.step!.tags"
          :key="index"
          class="h-content"
          example-text="example"
        >
          <span
            class="text-xs text-accent-light font-semibold rounded-md px-2 py-1 bg-accent"
          > 
            {{ tag }}
          </span>          
        </FieldWaitting>
      </div>
      <FieldWaitting 
        :loading="isLoading" 
        class="flex items-center gap-2 text-sm text-accent font-semibold" 
        example-text="example" 
        v-if="isLoading || !!props.step!.links.length"
      >
        <span class="text-sm text-accent font-semibold"> {{ props.step!.links.length }} </span>
        <LinkIcon class="w-4 h-4 text-accent" />
      </FieldWaitting>
    </div>
  </div>
</template>