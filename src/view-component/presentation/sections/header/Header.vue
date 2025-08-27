<script setup lang="ts">
import HeaderSmallHeight from './HeaderSmallHeight.vue';
</script>

<template>
  <section class="relative overflow-hidden">
    <div class="absolute inset-0 -z-99 pattern-grid opacity-60 pointer-events-none"/>
    <!-- todo: it's not 200% height -->
    <div
      class="
        relative h-full flex flex-col justify-between
        px-4 gap-2
      ">
      <HeaderSmallHeight class="[@media(--hbase)]:hidden "/>
    </div>
  </section>
</template>