<template>
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