<template>
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
</template>