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

const paddingDefault = props.disabled ? '' : 'p-2';
const paddingHover = props.disabled ? '' : 'p-0';

const defaultBorderWidth = 'border-1';
const borderWidthHover = 'border-4'

</script>
<template>
  <!-- todo: the size is not fixed, need to fix it : maybe the border width is the issue -->
  <CSSStyleDeclarationFromParent v-slot="{ style }" :class="$props.class">
    <div
    class="group h-full"
    :class="[
      // 'transition-all duration-300 ease-in-out',
      paddingDefault,
      `hover:${paddingHover}`
    ]"
    @mouseenter="hover = true"
    @mouseleave="hover = false">
    <div :class="[
          'rounded-xl bg-background border-border shadow-soft h-full w-full',
          defaultBorderWidth,
          `group-hover:${borderWidthHover}`,
          `group-hover:border-[var(--border-color-hover)]`,
          paddingHover,
          `group-hover:${paddingDefault}`
        ]"
        :style="{ '--border-color-hover': getColor(style) }">
          <slot :style="style" :hover="hover" />
        </div>
    </div>
  </CSSStyleDeclarationFromParent>
</template>
<style scoped>
</style>