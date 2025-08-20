<script setup lang="ts">
import QrcodeVue from 'qrcode.vue'
</script>

<template>
	<!-- HERO -->
	<section class="relative overflow-hidden">
		<div class="absolute inset-0 pattern-grid opacity-20 pointer-events-none"></div>
		<div class="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-tr from-emerald-200 to-sky-200 blur-3xl opacity-70"></div>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-12 lg:pb-20">
			<div class="grid lg:grid-cols-2 gap-12 items-center">
				<div class="space-y-6">
					<span class="badge border-[#0d6b4d]/30 text-[#0d6b4d] bg-emerald-50">Projet communautaire</span>
					<h1 class="text-4xl sm:text-5xl font-bold leading-tight text-[#0b132b]">
						Aidez à construire notre nouvelle mosquée
						<span class="text-transparent bg-clip-text bg-gradient-to-r from-[#0d6b4d] to-emerald-600">&nbsp;chaque don compte</span>.
					</h1>
					<p class="text-slate-600 text-lg max-w-xl">
						Votre contribution élève un lieu de culte, d’éducation et de fraternité. Qu’Allah accepte vos dons.
					</p>
					<div class="flex flex-wrap gap-3">
						<a href="#plans" class="btn-ghost">Voir les plans</a>
						<a href="#infos" class="btn-primary">Infos pratiques</a>
					</div>
					<div class="grid grid-cols-3 gap-6 pt-4">
						<div class="text-center">
							<div class="text-3xl font-bold text-[#0b132b]">1 200m²</div>
							<div class="text-xs text-slate-500">Surface</div>
						</div>
						<div class="text-center">
							<div class="text-3xl font-bold text-[#0b132b]">500+</div>
							<div class="text-xs text-slate-500">Fidèles</div>
						</div>
						<div class="text-center">
							<div class="text-3xl font-bold text-[#0b132b]">2026</div>
							<div class="text-xs text-slate-500">Livraison estimée</div>
						</div>
					</div>
				</div>
				<div class="card shadow-2xl p-8 radial-spot">
					<div class="text-center">
						<QrcodeVue value="https://votre-cagnotte.example" :size="220" level="H" class="mx-auto float-slow"/>
						<div class="mt-6">
							<a href="https://votre-cagnotte.example" target="_blank" class="btn-primary px-6 py-3 text-base">Scanner / Ouvrir la cagnotte</a>
						</div>
						<p class="mt-3 text-xs text-slate-500">Sécurisé – Don défiscalisable</p>
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