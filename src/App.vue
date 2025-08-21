<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/header.vue'

const route = useRoute()
const isActive = (path: string) => route.path === path
const mobileOpen = ref(false)
const phone = '+33 1 43 91 06 92'
const email = 'vitry-sur-seine.nour-essalam@al-muminune.org'
const navItems = [
	{ label: 'Suivi', path: '/recap' }
]
</script>

<template>
	<div class="min-h-screen flex flex-col bg-gradient-to-b from-white to-[#f8faf9]/70">
		<!-- Top Nav -->
		<Header 
			:mobileOpen="mobileOpen" 
			:isActive="isActive" 
			:phone="phone" 
			:email="email" 
			:navItems="navItems" />
		<main class="flex-1">
			<router-view />
		</main>

		<footer class="border-t border-white/60 py-8 text-center text-sm text-slate-500">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div>« Quiconque construit une mosquée pour Allah, Allah lui construit son équivalent au Paradis. »</div>
				<div class="mt-2">— Sahîh al-Bukhari</div>
			</div>
		</footer>
	</div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

<style scoped>
.fade-enter-active,.fade-leave-active{ transition: opacity 200ms ease; }
.fade-enter-from,.fade-leave-to{ opacity: 0; }
</style>
