<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/header.vue'
import Footer from './components/footer.vue'
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
	<div class="min-h-screen w-full grid grid-rows-[auto_1fr_auto] flex-col">
		<Header 
			:mobileOpen="mobileOpen" 
			:isActive="isActive" 
			:phone="phone" 
			:email="email" 
			:navItems="navItems"/>
		<main class="flex-1 flex flex-col overflow-auto">
			<router-view />
		</main>
		<Footer/>
	</div>
</template>
