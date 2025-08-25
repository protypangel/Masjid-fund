<script setup lang="ts">
import CSSStyleDeclarationFromParent from '@/components/effect/CSSStyleDeclarationFromParent.vue'
import { computed, ref } from 'vue';

const props = withDefaults(defineProps<{
  disabled?: boolean,
  class?: string,
  color?: string
}>(), {
  disabled: false,
  class: ''
});

function getColor(style: CSSStyleDeclaration) {
  if (props.disabled) return 'transparent';
  return props.color || style?.color;
}

const hover = ref(false);


const paddingHover = computed(() => {
  return props.disabled ? '' : 'hover:p-0';
});
const defaultBorderWidth = 'border-2';
const borderWidthHover = 'group-hover:border-4'

</script>
<template>
  <CSSStyleDeclarationFromParent v-slot="{ style }" :class="$props.class">
    <div
    :class="[
      'group',
      'transition-[padding,border-width,border-color] duration-300 ease-in-out h-full w-full'
    ]"
    @mouseenter="hover = true"
    @mouseleave="hover = false">
      <div 
      class="h-full w-full p-2"
      :class="paddingHover">
        <div :class="[
          'rounded-xl bg-background border-border shadow-soft h-full w-full',
          defaultBorderWidth,
          borderWidthHover,
          `group-hover:border-[var(--border-color-hover)]`
        ]"
        :style="{ '--border-color-hover': getColor(style) }">
          <slot :style="style" :hover="hover" />
        </div>
      </div>
    </div>
  </CSSStyleDeclarationFromParent>
</template>
<style scoped>
</style>