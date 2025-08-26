<script setup lang="ts">
import SectionHeader from '../view-component/presentation/sections/Header.vue'
import SectionArchitecture from '../view-component/presentation/sections/Architecture.vue'
import SectionMoreInfo from '../view-component/presentation/sections/MoreInfo.vue'

</script>

<template>
<div class="h-full w-full flex-col">
	<SectionHeader class="h-2screen tablet:h-full"/>
	<SectionHeader class="h-2screen tablet:h-full bg-primary"/>
</div>
</template>
<style scoped>
.h-2screen {
  height: fit-content;
}
</style>