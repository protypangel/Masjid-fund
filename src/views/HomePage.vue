<script setup lang="ts">
import HeaderLowResolution from '@/view-component/presentation/sections/header/HeaderLowResolution.vue'
import HeaderHightResolution from '@/view-component/presentation/sections/header/HeaderHightResolution.vue'
import { ref } from 'vue';

const disable = ref(false);
const isHightResolution = ref(true);
</script>

<template>
<div class="h-full w-full flex-col">
	<section class="relative h-full overflow">
    <div class="absolute inset-0 pattern-grid opacity-60 pointer-events-none"/>
    <HeaderHightResolution v-if="disable && isHightResolution" class="bg-red-500"/>
    <HeaderLowResolution v-if="disable && !isHightResolution"/>
    <HeaderLowResolution class="relative hidden [@media(max-width:620px)_or_(max-height:900px)]:block"/>
    <HeaderHightResolution class="relative block [@media(max-width:620px)_or_(max-height:900px)]:hidden bg-red-500"/>
    
  </section>
</div>
</template>

<!-- High: 900 - 1000 -->
