<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const prevIndex = ref(route.meta.index as number ?? 0)
const direction = ref<'slide-left' | 'slide-right' | 'none'>('none')

const load = ref(function (newIndex: unknown) {
	load.value = function (newIndex: unknown) {
		if (typeof newIndex === 'number') {
			direction.value = newIndex > prevIndex.value ? 'slide-right' : 'slide-left'
			prevIndex.value = newIndex
		}
	}
})
watch(() => route.meta.index, (newIndex) => {
  load.value(newIndex);
})

</script>
<template>
  <RouterView v-slot="{ Component, route }">
    <Transition :name="direction" mode="out-in">
      <component :is="Component" class="direction-wrapper h-full overflow-auto" :key="route.fullPath" />
    </Transition>
  </RouterView>
</template> 
<style scoped>
.slide-right-leave-to.direction-wrapper,
.slide-left-leave-to.direction-wrapper {
  overflow: hidden !important;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s ease-in-out;
}
.slide-right-enter-from {
  transform: translateX(100%);
}
.slide-right-enter-to {
  transform: translateX(0);
}
.slide-right-leave-to {
  transform: translateX(-100%);
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.5s ease-in-out;
}
.slide-left-enter-from {
  transform: translateX(-100%);
}
.slide-left-enter-to {
  transform: translateX(0);
}
.slide-left-leave-to {
  transform: translateX(100%);
}
</style>