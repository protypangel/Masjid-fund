<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Logo from '@/assets/logo.svg'

withDefaults(defineProps<{
  disabled?: boolean
}>(), {
  disabled: false
})

const showLogo = ref(false)
const showContent = ref(false)


onMounted(() => {
	showLogo.value = true
})
function onAfterEnter() {
	showLogo.value = false
	showContent.value = true
}
</script>
<!--
Un template qui permet d'afficher un slot start puis un slot end.
-----------------------------------
slots:
- start : le contenu à afficher au début
- end : le contenu à afficher à la fin
-----------------------------------
props:
- disabled : si true, le contenu est affiché sans animation
-----------------------------------
Exemple d'utilisation avec :

<StartWithAnimation>
  <template #start>
    <Logo width="300" height="300"/>
  </template>
  <template #end>
    <router-view/>
  </template>
</StartWithAnimation>
-->
<template>
  <main class="flex flex-col overflow-hidden relative">
    <div v-if="disabled" class="absolute inset-0 w-full h-full">
      <slot name="end"/>
    </div>
    <div v-else>
      <transition name="start" @after-enter="onAfterEnter">
        <div class="absolute inset-0 flex items-center justify-center" v-if="showLogo">
          <slot name="start"/>
        </div>
      </transition>
      <transition name="end">
        <div class="absolute inset-0 w-full h-full" v-if="showContent">
          <slot name="end"/>
        </div>
      </transition>
    </div>
  </main>
</template>

<style scoped>
.start-enter-active,
.start-leave-active {
  transition: all 2s ease-in;
}
.start-enter-from {
	opacity: 0;
}
.start-enter-to {
	opacity: 1;
}
.start-leave-to {
	transform: translateY(-100%);
}

.end-enter-active,
.end-leave-active {
  transition: all 2s ease-in;
}
.end-enter-from {
	transform: translateY(100%);
}
.end-enter-to {
	transform: translateY(0);
}
</style>