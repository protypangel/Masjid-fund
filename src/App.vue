<script setup lang="ts">
import { ref } from 'vue'
import StartPage from '@/components/animation/StartPage.vue'
import SpecialRouterView from '@/components/animation/SpecialRouterView.vue'
import Logo from '@/assets/logo.svg'

import Header from '@/components/layouts/Header.vue'
import Footer from '@/components/layouts/Footer.vue'
import { Phrase } from '@/interfaces/layouts/Footer'

import type HeaderType from '@/interfaces/layouts/Header'

const header: HeaderType = {
	phone: '+33 1 43 91 06 92',
	email: 'vitry-sur-seine.nour-essalam@al-muminune.org',
	navItems: [
		{ label: 'Suivi', path: '/recap' }
	]
}

const phrases: Phrase[] = [
  { text: 'Quiconque construit une mosquée pour Allah, Allah lui construit son équivalent au Paradis', author: 'Sahîh al-Bukhari', type: 'Hadith' },
  { text: "Et quiconque lui fait don de la vie, c'est comme s'il faisait don de la vie à tous les hommes", author: 'La table servie, verset 32', type: 'Sourate' },
  { text: "La sadaqa éteint les péchés comme l'eau éteint le feu", author: 'Tirmidhi', type: 'Hadith' },
  { text: "Et tout ce que vous dépensez de bien, c'est pour vous-mêmes", author: 'Al-Baqara, verset 272', type: 'Sourate' },
  { text: "Jamais l'aumône n'a diminué une fortune", author: 'Sahîh Muslim', type: 'Hadith' }
]

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
    <Footer :phrases="phrases"/>
  </div>
</template>
