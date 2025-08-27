<script setup lang="ts">
import SectionHeader from '../view-component/presentation/sections/header/Header.vue'
import SectionArchitecture from '../view-component/presentation/sections/Architecture.vue'
import SectionMoreInfo from '../view-component/presentation/sections/MoreInfo.vue'

</script>

<template>
<div class="h-full w-full flex-col">
	<SectionHeader class="h-2screen [@media(--height-long-height)]:h-full"/>
	<SectionHeader class="h-2screen [@media(--height-long-height)]:h-full bg-primary"/>
</div>
</template>
<style scoped>
.h-2screen {
  height: 200%;
}
</style>