<script setup lang="ts">
import HeaderSmallHeight from './HeaderLowResolution.vue';
</script>

<template>
  <section class="relative h-full overflow">
    <div class="absolute inset-0 pattern-grid opacity-60 pointer-events-none"/>
    <HeaderSmallHeight class="relative [@media(--hbase)]:hidden"/>
  </section>
</template>