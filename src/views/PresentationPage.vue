<script setup lang="ts">
import HeaderSmallHeight from '../view-component/presentation/sections/header/HeaderSmallHeight.vue'

</script>

<template>
<div class="h-full w-full flex-col">
	<section class="relative h-full overflow">
    <div class="absolute inset-0 pattern-grid opacity-60 pointer-events-none"/>
    <HeaderSmallHeight class="relative [@media(--hbase)]:hidden"/>
  </section>
</div>
</template>
