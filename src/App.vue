<script setup lang="ts">
import { useRoute } from 'vue-router'
import StartWithAnimation from './components/animations/BeforeStartScreen.vue'


import Header from '@/components/layouts/Header.vue'
import Footer from '@/components/layouts/Footer.vue'

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


</script>

<template>
	<div class="min-h-screen w-full grid grid-rows-[auto_1fr_auto] flex-col">
		<Header v-bind="header"/>
		<StartWithAnimation>
			<router-view/>
		</StartWithAnimation>
		<Footer/>
	</div>
</template>
