<template>
  <!-- Container -->
<div class="max-w-3xl mx-auto p-4 md:p-6 font-sans">

<!-- Carte Étape -->
<div class="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-5 md:p-6">
  <!-- Header de l'étape -->
  <div class="flex items-start justify-between gap-4">
    <div>
      <h2 class="text-lg md:text-xl font-semibold tracking-tight">Étude & plans</h2>
      <p class="text-sm text-slate-500">Architecte • dépôt de dossier</p>
    </div>

    <!-- Statut + pourcentage -->
    <div class="flex items-center gap-2">
      <span class="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium text-emerald-700 border-emerald-200 bg-emerald-50">
        <span class="size-2 rounded-full bg-emerald-500"></span> Terminé
      </span>
      <span class="text-sm font-medium text-slate-600">80%</span>
    </div>
  </div>

  <!-- Filtres/Tags -->
  <div class="mt-3 flex flex-wrap gap-2">
    <span class="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700">#plans</span>
    <span class="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700">#administratif</span>
  </div>

  <!-- Divider soft -->
  <div class="my-5 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

  <!-- ====== SECTION BUDGET ====== -->
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h3 class="text-sm font-semibold text-slate-700">Budget</h3>
      <!-- Badge d’état budgétaire -->
      <span class="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium
                   border-amber-200 text-amber-700 bg-amber-50">
        <svg viewBox="0 0 20 20" fill="currentColor" class="size-3.5"><path d="M8.257 3.099c.366-.756 1.42-.756 1.786 0l6.518 13.45c.33.681-.17 1.451-.893 1.451H2.632c-.723 0-1.223-.77-.893-1.451L8.257 3.1zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-.25-6.75a.75.75 0 10-1.5 0v4.5a.75.75 0 001.5 0v-4.5z"/></svg>
        Surveiller
      </span>
    </div>

    <!-- Chiffres clés -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div class="rounded-xl border border-slate-200 p-3">
        <div class="text-xs text-slate-500">Nécessaire</div>
        <div class="mt-1 text-lg font-semibold tracking-tight">15 000 €</div>
      </div>
      <div class="rounded-xl border border-slate-200 p-3">
        <div class="text-xs text-slate-500">Dépensé</div>
        <div class="mt-1 text-lg font-semibold tracking-tight">14 800 €</div>
      </div>
      <div class="rounded-xl border border-slate-200 p-3">
        <div class="text-xs text-slate-500">Reste</div>
        <div class="mt-1 text-lg font-semibold tracking-tight">200 €</div>
      </div>
    </div>

    <!-- Barre principale : Dépenses vs Budget -->
    <div>
      <div class="flex justify-between text-xs text-slate-500 mb-1">
        <span>Dépensé</span>
        <span>98.7%</span>
      </div>
      <div class="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
        <!-- largeur = (dépensé / nécessaire)*100 -->
        <div class="h-full w-[98.7%] bg-gradient-to-r from-emerald-500 to-emerald-600"></div>
      </div>
    </div>

    <!-- Barre secondaire : Avancement (optionnelle) -->
    <div>
      <div class="flex justify-between text-xs text-slate-500 mb-1">
        <span>Avancement des travaux</span>
        <span>80%</span>
      </div>
      <div class="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
        <div class="h-full w-[80%] bg-gradient-to-r from-sky-500 to-sky-600"></div>
      </div>
    </div>

    <!-- Lien / action -->
    <div class="pt-2">
      <a href="#" class="inline-flex items-center gap-2 text-sm font-medium text-sky-700 hover:text-sky-900">
        Voir le détail des dépenses
        <svg viewBox="0 0 20 20" fill="currentColor" class="size-4">
          <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a.999.999 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
      </a>
    </div>
  </div>
</div>

<!-- Petite variante "carte Kanban" compacte -->
<div class="mt-4 bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-4">
  <div class="flex items-center justify-between">
    <div class="text-sm font-medium">Étude & plans</div>
    <div class="text-xs text-slate-500">Déc-2024</div>
  </div>

  <p class="mt-2 text-sm text-slate-600">
    Validation des plans, conformité, et dépôt en mairie.
  </p>

  <div class="mt-3 space-y-2">
    <!-- Progress mini -->
    <div>
      <div class="flex justify-between text-[11px] text-slate-500 mb-1">
        <span>Budget</span><span>14 800 € / 15 000 €</span>
      </div>
      <div class="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
        <div class="h-full w-[98.7%] bg-emerald-600"></div>
      </div>
    </div>
    <div>
      <div class="flex justify-between text-[11px] text-slate-500 mb-1">
        <span>Avancement</span><span>80%</span>
      </div>
      <div class="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
        <div class="h-full w-[80%] bg-sky-600"></div>
      </div>
    </div>
  </div>
</div>

</div>

</template>