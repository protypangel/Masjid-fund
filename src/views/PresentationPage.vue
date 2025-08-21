<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import QrcodeVue from 'qrcode.vue'

const quotes = [
	{ ar: 'وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا', fr: 'Et quiconque lui fait don de la vie, c\'est comme s\'il faisait don de la vie à tous les hommes', ref: 'Coran 5:32' },
	{ fr: 'L’aumône n’a jamais diminué une richesse.', ref: 'Muslim' },
	{ fr: 'Quiconque construit une mosquée pour Allah, Allah lui construit son équivalent au Paradis.', ref: 'Al-Bukhari & Muslim' },
	{ fr: 'Le meilleur des gens est le plus utile aux autres.', ref: 'Hadith' }
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
	<!-- HERO -->
	<section class="relative overflow-hidden">
		<div class="absolute inset-0 pattern-grid opacity-20 pointer-events-none"></div>
		<div class="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-tr from-emerald-200 to-sky-200 blur-3xl opacity-70"></div>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-10 lg:pt-14 lg:pb-12">
			<div class="text-center max-w-3xl mx-auto">
				<h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0b132b]">
					<span class="text-[#0d6b4d]">نور السلام</span> – Construisons notre mosquée
				</h1>
				<p class="mt-3 text-slate-600 text-lg">Merci pour votre générosité et votre soutien à cette noble cause</p>
			</div>

			<!-- Stat cards -->
			<div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				<div class="rounded-2xl bg-white border border-white/60 shadow-soft p-6">
					<div class="text-sm text-slate-600">Total collecté</div>
					<div class="mt-1 text-2xl font-bold text-[#0b132b]">847 500 €</div>
					<div class="text-xs text-emerald-600 mt-1">+2.5% cette semaine</div>
				</div>
				<div class="rounded-2xl bg-white border border-white/60 shadow-soft p-6">
					<div class="text-sm text-slate-600">Dernier Jumu'ah</div>
					<div class="mt-1 text-2xl font-bold text-[#0b132b]">12 300 €</div>
					<div class="text-xs text-slate-500 mt-1">Vendredi dernier</div>
				</div>
				<div class="rounded-2xl bg-white border border-white/60 shadow-soft p-6">
					<div class="text-sm text-slate-600">Prochain Palier</div>
					<div class="mt-1 text-2xl font-bold text-[#0b132b]">52 500 €</div>
					<div class="text-xs text-slate-500 mt-1">Restants à collecter</div>
				</div>
				<div class="rounded-2xl bg-white border border-white/60 shadow-soft p-6">
					<div class="text-sm text-slate-600">Objectif Global</div>
					<div class="mt-1 text-2xl font-bold text-[#0b132b]">1 200 000 €</div>
					<div class="text-xs text-slate-500 mt-1">Budget total projet</div>
				</div>
			</div>

			<!-- Grid: QR + Rappels -->
			<div class="mt-8 grid lg:grid-cols-2 gap-8 items-stretch">
				<div class="card shadow-2xl p-8 radial-spot">
					<h3 class="text-lg font-semibold text-[#0b132b] mb-4 flex items-center gap-2"><span class="text-[#0d6b4d]">▦</span> Participer à la collecte</h3>
					<div class="text-center">
						<div class="relative inline-grid place-items-center">
							<div class="absolute inset-0 -z-10 blur-xl opacity-40 bg-[radial-gradient(closest-side,theme(colors.emerald.300),transparent)]"></div>
							<div class="p-2 rounded-2xl bg-gradient-to-br from-amber-200/70 to-emerald-100 border border-amber-300/40">
								<div class="rounded-xl bg-white p-2 border border-amber-300/30">
									<QrcodeVue value="https://votre-cagnotte.example" :size="220" level="H" class="mx-auto float-slow"/>
								</div>
							</div>
						</div>
						<div class="mt-6">
							<a href="https://votre-cagnotte.example" target="_blank" class="btn-primary px-6 py-3 text-base">Scannez pour contribuer</a>
						</div>
						<p class="mt-3 text-xs text-slate-500">Donation sécurisée et instantanée</p>
					</div>
				</div>
				<div class="card p-8">
					<h3 class="text-lg font-semibold text-[#0b132b] mb-4">Rappels Spirituels</h3>
					<div class="relative h-44">
						<transition name="fade" mode="out-in">
							<div :key="currentQuoteIndex" class="absolute inset-0 grid place-items-center text-center px-4">
								<blockquote class="text-emerald-700 text-2xl font-semibold" dir="rtl" v-if="quotes[currentQuoteIndex].ar">{{ quotes[currentQuoteIndex].ar }}</blockquote>
								<blockquote class="text-emerald-700 text-2xl font-semibold" v-else>{{ quotes[currentQuoteIndex].fr }}</blockquote>
								<p class="mt-3 text-slate-600 max-w-md" v-if="quotes[currentQuoteIndex].fr">“{{ quotes[currentQuoteIndex].fr }}” — {{ quotes[currentQuoteIndex].ref }}</p>
								<p class="mt-1 text-slate-500 text-sm" v-else>{{ quotes[currentQuoteIndex].ref }}</p>
							</div>
						</transition>
						<div class="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 pb-1">
							<span v-for="(_,i) in quotes" :key="i" class="size-2 rounded-full" :class="i===currentQuoteIndex ? 'bg-emerald-600' : 'bg-slate-300'"></span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- PLANS -->
	<section id="plans" class="py-16 lg:py-24 bg-white/70">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<h2 class="text-3xl font-bold mb-8 text-[#0b132b]">Plans architecturaux et rendus 3D</h2>
			<div class="grid md:grid-cols-3 gap-6">
				<div class="card overflow-hidden">
					<img src="/plans/plan-1.jpg" alt="Plan - Salle de prière" class="w-full h-56 object-cover">
					<div class="p-4 text-sm text-slate-600">Salle de prière principale</div>
				</div>
				<div class="card overflow-hidden">
					<img src="/plans/plan-2.jpg" alt="Plan - Minaret" class="w-full h-56 object-cover">
					<div class="p-4 text-sm text-slate-600">Minaret</div>
				</div>
				<div class="card overflow-hidden">
					<img src="/plans/plan-3.jpg" alt="Plan - Salles annexes" class="w-full h-56 object-cover">
					<div class="p-4 text-sm text-slate-600">Salles annexes</div>
				</div>
			</div>
			<div class="mt-8 grid md:grid-cols-2 gap-6">
				<div class="card aspect-video overflow-hidden">
					<video class="w-full h-full" src="/rendus/3d-demo.mp4" controls></video>
				</div>
				<div class="card p-6 prose max-w-none">
					<ul>
						<li><strong>Salle de prière</strong> : vaste, lumineuse et ventilée.</li>
						<li><strong>Minaret</strong> : repère spirituel et architectural.</li>
						<li><strong>Salles annexes</strong> : éducation, sanitaires, ablutions.</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<!-- INFOS PRATIQUES -->
	<section id="infos" class="py-16 lg:py-24">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<h2 class="text-3xl font-bold mb-8 text-[#0b132b]">Infos pratiques</h2>
			<div class="grid lg:grid-cols-3 gap-6">
				<div class="card overflow-hidden lg:col-span-2">
					<iframe class="w-full h-96" style="border:0" loading="lazy"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9995148121286!2d2.2922926156741032!3d48.858373908779024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fdebdf0c1b1%3A0x8b5a3c49c0a!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1616589811111!5m2!1sen!2sfr"></iframe>
				</div>
				<div class="space-y-6">
					<div class="card p-6">
						<h3 class="font-semibold text-[#0b132b] mb-3">Étapes d’avancement</h3>
						<ul class="relative pl-6 space-y-3 text-sm text-slate-600">
							<li class="before:content-[''] before:absolute before:left-0 before:top-2 before:h-2.5 before:w-2.5 before:bg-emerald-500 before:rounded-full">Études préliminaires</li>
							<li class="before:content-[''] before:absolute before:left-0 before:top-2 before:h-2.5 before:w-2.5 before:bg-emerald-500 before:rounded-full">Acquisition du terrain</li>
							<li class="before:content-[''] before:absolute before:left-0 before:top-2 before:h-2.5 before:w-2.5 before:bg-amber-400 before:rounded-full">Permis de construire</li>
							<li class="before:content-[''] before:absolute before:left-0 before:top-2 before:h-2.5 before:w-2.5 before:bg-slate-300 before:rounded-full">Lancement des travaux</li>
						</ul>
					</div>
					<div class="card p-6">
						<h3 class="font-semibold text-[#0b132b] mb-2">Histoire & Vision</h3>
						<p class="text-sm text-slate-600">De l’ancienne mosquée, lieu de prière communautaire, à une nouvelle structure plus accueillante et durable, pensée pour les générations futures.</p>
					</div>
				</div>
			</div>

			<div class="mt-10 grid md:grid-cols-2 gap-6">
				<div class="card p-6">
					<h3 class="font-semibold text-[#0b132b] mb-4">Rappels islamiques</h3>
					<blockquote class="text-[#0d6b4d] text-lg font-semibold">« Quiconque construit une mosquée pour Allah, Allah lui construit son équivalent au Paradis. »</blockquote>
					<p class="text-sm text-slate-600 mt-2">— Al-Bukhari & Muslim</p>
				</div>
				<div class="card p-6">
					<blockquote class="text-[#0d6b4d] text-lg font-semibold">« L’aumône n’a jamais diminué une richesse. »</blockquote>
					<p class="text-sm text-slate-600 mt-2">— Muslim</p>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
.fade-enter-active,.fade-leave-active{ transition: opacity 500ms ease, transform 500ms ease; }
.fade-enter-from,.fade-leave-to{ opacity: 0; transform: translateY(6px); }
</style> 