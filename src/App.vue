<script setup lang="ts">
import { useRoute } from 'vue-router'
import { PhoneIcon, EnvelopeIcon, BuildingLibraryIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const isActive = (path: string) => route.path === path
</script>

<template>
	<div class="min-h-screen flex flex-col bg-gradient-to-b from-white to-[#f8faf9]/70">
		<!-- Top Nav -->
		<header class="sticky top-0 z-30 backdrop-blur bg-white/80 border-b border-white/60">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="flex h-16 items-center justify-between gap-6">
					<!-- Logo + Name -->
					<RouterLink to="/" class="flex items-center gap-2">
						<span class="inline-grid place-items-center h-8 w-8 rounded-lg bg-[#0d6b4d] text-white">
							<BuildingLibraryIcon class="h-5 w-5" />
						</span>
						<span class="font-semibold tracking-tight text-slate-800">Nour Essalam</span>
					</RouterLink>

					<!-- Nav -->
					<nav class="hidden md:flex items-center gap-6 text-sm">
						<RouterLink to="/" :class="isActive('/') ? 'text-[#0d6b4d] underline underline-offset-8 decoration-2' : 'text-slate-600 hover:text-[#0d6b4d]'">Accueil</RouterLink>
						<RouterLink to="/" :class="isActive('/') ? 'text-[#0d6b4d] underline underline-offset-8 decoration-2' : 'text-slate-600 hover:text-[#0d6b4d]'">Présentation</RouterLink>
						<RouterLink to="/recap" :class="isActive('/recap') ? 'text-[#0d6b4d] underline underline-offset-8 decoration-2' : 'text-slate-600 hover:text-[#0d6b4d]'">Suivi</RouterLink>
					</nav>

					<!-- Contact -->
					<div class="hidden lg:flex items-center gap-6 text-sm text-slate-600">
						<a href="tel:+33143910692" class="inline-flex items-center gap-2 hover:text-[#0d6b4d]">
							<PhoneIcon class="h-4 w-4" />
							<span>+33 1 43 91 06 92</span>
						</a>
						<a href="mailto:vitry-sur-seine.nour-essalam@al-muminune.org" class="inline-flex items-center gap-2 hover:text-[#0d6b4d]">
							<EnvelopeIcon class="h-4 w-4" />
							<span>vitry-sur-seine.nour-essalam@al-muminune.org</span>
						</a>
					</div>
				</div>
			</div>
		</header>

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
