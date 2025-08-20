<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import QrcodeVue from 'qrcode.vue'

const goal = 200000
const totalCollected = ref(73540)
const lastJumuah = ref(3250)
const milestones = [50000, 100000, 150000, 200000]

const nextMilestone = computed(() => milestones.find(m => m > totalCollected.value) ?? goal)
const remainingToNext = computed(() => Math.max(0, nextMilestone.value - totalCollected.value))
const progress = computed(() => Math.min(100, Math.round((totalCollected.value / goal) * 100)))

const quotes = [
	{ text: 'Quiconque construit une mosquée pour Allah, Allah lui construit son équivalent au Paradis.', source: 'Al-Bukhari & Muslim' },
	{ text: 'L’aumône n’a jamais diminué une richesse.', source: 'Muslim' },
	{ text: 'Le meilleur des gens est le plus utile aux autres.', source: 'Hadith' },
	{ text: 'Ce que vous donnez en aumône vous sera rendu au centuple.', source: 'Coran 6:160' }
]
const currentQuoteIndex = ref(0)
let intervalId: number | undefined

onMounted(() => {
	intervalId = window.setInterval(() => {
		currentQuoteIndex.value = (currentQuoteIndex.value + 1) % quotes.length
	}, 6000)
})

onBeforeUnmount(() => { if (intervalId) window.clearInterval(intervalId) })
</script>

<template>
	<section class="min-h-[calc(100vh-64px-96px)] grid place-items-center py-10">
		<div class="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
			<div class="grid lg:grid-cols-2 gap-10 items-center">
				<div class="card p-8">
					<h1 class="text-3xl font-bold text-[#0b132b]">État de la cagnotte</h1>
					<div class="mt-6 grid sm:grid-cols-2 gap-6">
						<div class="rounded-2xl bg-gradient-to-br from-[#0d6b4d] to-emerald-600 text-white p-6">
							<div class="text-sm/5 opacity-90">Total cumulé</div>
							<div class="text-3xl font-bold">{{ totalCollected.toLocaleString('fr-FR') }} €</div>
						</div>
						<div class="rounded-2xl bg-slate-900 text-white p-6">
							<div class="text-sm/5 opacity-90">Dernier Jumu’ah</div>
							<div class="text-3xl font-bold">+{{ lastJumuah.toLocaleString('fr-FR') }} €</div>
						</div>
						<div class="rounded-2xl bg-white border p-6">
							<div class="text-sm text-slate-600">Reste avant palier ({{ nextMilestone.toLocaleString('fr-FR') }} €)</div>
							<div class="text-2xl font-semibold text-[#0b132b]">{{ remainingToNext.toLocaleString('fr-FR') }} €</div>
						</div>
						<div class="rounded-2xl bg-white border p-6">
							<div class="text-sm text-slate-600">Objectif global</div>
							<div class="text-2xl font-semibold text-[#0b132b]">{{ goal.toLocaleString('fr-FR') }} €</div>
						</div>
					</div>

					<div class="mt-8 flex items-center gap-6">
						<div class="relative size-40 sm:size-48 rounded-full grid place-items-center bg-white border">
							<div class="absolute inset-0 rounded-full p-2">
								<div class="progress-ring h-full w-full rounded-full" :style="{ '--p': progress }"></div>
							</div>
							<div class="relative text-center">
								<div class="text-3xl font-bold text-[#0b132b]">{{ progress }}%</div>
								<div class="text-xs text-slate-500">Progression</div>
							</div>
						</div>
						<div class="text-sm text-slate-600">
							<p>Prochain palier : <span class="font-semibold text-[#0b132b]">{{ nextMilestone.toLocaleString('fr-FR') }} €</span></p>
							<p>Reste : <span class="font-semibold text-[#0b132b]">{{ remainingToNext.toLocaleString('fr-FR') }} €</span></p>
						</div>
					</div>
				</div>

				<div class="card p-8 flex flex-col items-center justify-center text-center">
					<QrcodeVue value="https://votre-cagnotte.example" :size="220" level="H" />
					<div class="mt-4 text-sm text-slate-600">Scannez pour participer</div>

					<div class="relative w-full mt-10 h-40">
						<transition name="fade" mode="out-in">
							<div :key="currentQuoteIndex" class="absolute inset-0 grid place-items-center px-4">
								<blockquote class="text-xl sm:text-2xl font-semibold text-[#0b132b]">
									“{{ quotes[currentQuoteIndex].text }}”
								</blockquote>
								<div class="mt-2 text-sm text-slate-600">— {{ quotes[currentQuoteIndex].source }}</div>
							</div>
						</transition>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
.fade-enter-active,.fade-leave-active{ transition: opacity 600ms ease, transform 600ms ease; }
.fade-enter-from,.fade-leave-to{ opacity: 0; transform: translateY(6px); }
</style> 