<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Logo from '@/assets/logo.svg'

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
<template>
  <main class="flex flex-col overflow-hidden relative">
    <transition name="logo" @after-enter="onAfterEnter">
        <div class="absolute inset-0 flex items-center justify-center" v-if="showLogo">
          <Logo width="300" height="300"/>
        </div>
    </transition>
    <transition name="content">
      <div class="absolute inset-0 w-full h-full" v-if="showContent">
        <slot/>
      </div>
    </transition>
  </main>
</template>

<style scoped>
.logo-enter-active,
.logo-leave-active {
  transition: all 2s ease-in;
}
.logo-enter-from {
	opacity: 0;
}
.logo-enter-to {
	opacity: 1;
}
.logo-leave-to {
	transform: translateY(-100%);
}

.content-enter-active,
.content-leave-active {
  transition: all 2s ease-in;
}
.content-enter-from {
	transform: translateY(100%);
}
.content-enter-to {
	transform: translateY(0);
}
</style>