<script setup lang="ts">
import { ref } from 'vue'
import StartPage from '@/components/animation/StartPage.vue'
import SpecialRouterView from '@/components/animation/SpecialRouterView.vue'
import Logo from '@/assets/logo.svg'

import Header from '@/components/layouts/Header.vue'
import Footer from '@/components/layouts/Footer.vue'

import type HeaderType from '@/interfaces/layouts/Header'

const path = ref<string>('')

const header: HeaderType = {
	phone: '+33 1 43 91 06 92',
	email: 'vitry-sur-seine.nour-essalam@al-muminune.org',
	navItems: [
		{ label: 'Suivi', path: '/recap' }
	]
}

</script>

<template>
  <div class="min-h-screen w-full grid grid-rows-[auto_1fr_auto]">
    <Header v-bind="header"/>
    <StartPage disabled>
      <template #start>
        <Logo width="300" height="300"/>
      </template>

      <template #end>
        <div class="relative h-full min-h-0">
					<SpecialRouterView />
        </div>
      </template>
    </StartPage>   
    <Footer/>
  </div>
</template>
