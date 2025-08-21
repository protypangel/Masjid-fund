<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import Header from './components/header.vue'
import Footer from './components/footer.vue'
import Logo from './assets/logo.svg'
import type { Header as HeaderType } from './components/interfaces/Header'

const route = useRoute()

const header: HeaderType = {
	isActive: (path: string) => route.path === path,
	phone: '+33 1 43 91 06 92',
	email: 'vitry-sur-seine.nour-essalam@al-muminune.org',
	navItems: [
		{ label: 'Suivi', path: '/recap' }
	]
}

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
	<div class="min-h-screen w-full grid grid-rows-[auto_1fr_auto] flex-col">
		<Header v-bind="header"/>

		<main class="flex flex-col overflow-hidden relative">
			<transition name="logo" @after-enter="onAfterEnter">
					<div class="absolute inset-0 flex items-center justify-center" v-if="showLogo">
						<Logo width="300" height="300"/>
					</div>
			</transition>
      <transition name="content">
				<router-view class="absolute inset-0 w-full h-full" v-if="showContent"/>
					<!-- <div class="absolute inset-0 bg-green-500 w-full h-full" v-if="showContent"></div> -->
			</transition>
		</main>
		<Footer/>
	</div>
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