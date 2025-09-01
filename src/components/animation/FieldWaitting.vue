<script setup lang="ts">
import { computed } from "vue"

const props = withDefaults(defineProps<{
  exampleText?: string,
  loading?: boolean
}>(), {
  exampleText: 'letter',
  loading: true
})

const lines = computed(() => props.exampleText.split('<br>'))

</script>
<template>
  <div>
    <div v-if="loading" class="max-w-full flex flex-col gap-1 animate-pulse rounded-md bg-muted-foreground-light/40 text-transparent overflow-hidden">
      <div v-for="line in lines" :key="line"> {{ line }} </div>
    </div>
    <slot v-else />
  </div>
</template>
