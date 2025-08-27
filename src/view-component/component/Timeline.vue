<template>
  <aside class="rounded-2xl border bg-white shadow-sm p-4 lg:p-5">
    <!-- Header -->
    <div class="flex items-center justify-between gap-3">
      <div class="flex items-center gap-2 font-semibold text-emerald-700">
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" class="shrink-0"><path d="M4 4h16v16H4z" fill="currentColor" opacity=".08"/><path d="M7 7h10v2H7zm0 4h10v2H7zm0 4h6v2H7z" fill="currentColor"/></svg>
        Étapes du projet
      </div>
      <div class="hidden sm:flex items-center gap-2">
        <button type="button" class="text-xs rounded-lg border px-2 py-1 hover:border-gray-400" @click="expandAll">Tout ouvrir</button>
        <button type="button" class="text-xs rounded-lg border px-2 py-1 hover:border-gray-400" @click="collapseAll">Tout fermer</button>
      </div>
    </div>

    <!-- Overall progress -->
    <div class="mt-4">
      <div class="flex items-baseline justify-between">
        <div class="text-sm text-gray-600">Avancement global</div>
        <div class="text-sm font-semibold">{{ overallPercent }}%</div>
      </div>
      <div class="mt-2 h-2 rounded-full bg-gray-200 overflow-hidden">
        <div class="h-full bg-emerald-600 transition-[width] duration-500" :style="{ width: overallPercent + '%' }"></div>
      </div>
      <div class="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
        <span class="inline-flex items-center gap-1"><span class="h-2 w-2 rounded-full bg-gray-300"></span> À faire</span>
        <span class="inline-flex items-center gap-1"><span class="h-2 w-2 rounded-full bg-amber-500"></span> En cours</span>
        <span class="inline-flex items-center gap-1"><span class="h-2 w-2 rounded-full bg-emerald-600"></span> Terminé</span>
      </div>
    </div>

    <!-- Filters -->
    <div class="mt-5 grid grid-cols-3 gap-2 text-xs">
      <button type="button" @click="toggleFilter('todo')"
              class="rounded-xl border px-2 py-2"
              :class="filters.todo ? 'border-emerald-600 ring-1 ring-emerald-600/40' : 'hover:border-gray-400'">
        À faire
      </button>
      <button type="button" @click="toggleFilter('doing')"
              class="rounded-xl border px-2 py-2"
              :class="filters.doing ? 'border-emerald-600 ring-1 ring-emerald-600/40' : 'hover:border-gray-400'">
        En cours
      </button>
      <button type="button" @click="toggleFilter('done')"
              class="rounded-xl border px-2 py-2"
              :class="filters.done ? 'border-emerald-600 ring-1 ring-emerald-600/40' : 'hover:border-gray-400'">
        Terminé
      </button>
    </div>

    <!-- Steps -->
    <ul class="mt-5 space-y-3">
      <li v-for="s in filteredSteps" :key="s.id" class="rounded-2xl border p-3 sm:p-4">
        <button type="button" class="flex w-full items-start justify-between gap-3 text-left" @click="toggleOpen(s.id)"
                :aria-expanded="openIds.has(s.id)">
          <div class="flex min-w-0 items-start gap-3">
            <span :class="statusDotClass(s.status)" class="mt-1.5 inline-block h-2.5 w-2.5 rounded-full"></span>
            <div class="min-w-0">
              <div class="font-medium truncate">{{ s.title }}</div>
              <div class="mt-0.5 text-xs text-gray-500 truncate" v-if="s.subtitle">{{ s.subtitle }}</div>
            </div>
          </div>
          <div class="flex shrink-0 items-center gap-3">
            <span class="text-xs rounded-full px-2 py-1 border" :class="badgeClass(s.status)">{{ statusLabel(s.status) }}</span>
            <span v-if="typeof s.progress === 'number'" class="text-xs font-mono tabular-nums">{{ s.progress }}%</span>
            <svg class="h-4 w-4 text-gray-500 transition-transform duration-200" :class="openIds.has(s.id) ? 'rotate-180' : ''" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"/></svg>
          </div>
        </button>

        <transition name="fade-collapse">
          <div v-show="openIds.has(s.id)" class="mt-3 grid gap-3 sm:grid-cols-2">
            <div class="sm:col-span-2" v-if="s.description">
              <p class="text-sm text-gray-600">{{ s.description }}</p>
            </div>

            <div class="rounded-xl border bg-gray-50 p-3">
              <div class="text-xs text-gray-500">Période</div>
              <div class="mt-1 text-sm font-medium">{{ formatDate(s.start) }} → {{ formatDate(s.end) }}</div>
            </div>

            <div class="rounded-xl border bg-gray-50 p-3">
              <div class="text-xs text-gray-500">Budget</div>
              <div class="mt-1 text-sm font-medium">{{ euro(s.budgetPlanned) }}</div>
              <div class="mt-2 h-2 rounded-full bg-white overflow-hidden border">
                <div class="h-full bg-emerald-600" :style="{ width: budgetRate(s) + '%' }"></div>
              </div>
              <div class="mt-1 text-xs text-gray-500">Dépensé : <span class="font-medium text-gray-700">{{ euro(s.budgetSpent) }}</span></div>
            </div>

            <div class="sm:col-span-2 flex flex-wrap items-center gap-2" v-if="s.tags?.length">
              <span v-for="t in s.tags" :key="t" class="text-xs rounded-full bg-gray-100 px-2 py-1 border">#{{ t }}</span>
            </div>

            <div class="sm:col-span-2" v-if="s.links?.length">
              <div class="text-xs text-gray-500 mb-1">Liens / pièces</div>
              <ul class="list-disc list-inside text-sm text-emerald-700">
                <li v-for="l in s.links" :key="l.href"><a :href="l.href" target="_blank" rel="noreferrer" class="hover:underline">{{ l.label }}</a></li>
              </ul>
            </div>
          </div>
        </transition>
      </li>
    </ul>

    <!-- Footer slot (optionnel) -->
    <slot name="footer" />
  </aside>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

export type StepStatus = 'todo' | 'doing' | 'done'
export interface StepLink { label: string; href: string }
export interface ProjectStep {
  id: string | number
  title: string
  subtitle?: string
  description?: string
  status: StepStatus
  progress?: number // 0-100
  start?: string | Date
  end?: string | Date
  budgetPlanned?: number
  budgetSpent?: number
  weight?: number // pour le calcul global
  tags?: string[]
  links?: StepLink[]
}

const props = withDefaults(defineProps<{ steps?: ProjectStep[] }>(), {
  steps: () => ([
    {
      id: 1,
      title: 'Étude & plans',
      subtitle: 'Architecte + dépôt de dossier',
      description: 'Validation des plans, conformité, et dépôt en mairie.',
      status: 'done',
      progress: 100,
      start: '2024-09-10',
      end: '2024-12-05',
      budgetPlanned: 15000,
      budgetSpent: 14800,
      weight: 1,
      tags: ['plans', 'administratif'],
      links: [{ label: 'Dossier PDF', href: '#' }]
    },
    {
      id: 2,
      title: 'Fondations',
      subtitle: 'Terrassement & coulage',
      description: 'Préparation du terrain, coulage des fondations, ferraillage.',
      status: 'doing',
      progress: 60,
      start: '2025-01-10',
      end: '2025-03-15',
      budgetPlanned: 120000,
      budgetSpent: 72000,
      weight: 4,
      tags: ['gros-oeuvre']
    },
    {
      id: 3,
      title: 'Élévation des murs',
      subtitle: 'Structure RDC + étage',
      description: 'Montage des murs porteurs et cloisons principales.',
      status: 'todo',
      progress: 0,
      start: '2025-03-20',
      end: '2025-06-20',
      budgetPlanned: 280000,
      budgetSpent: 0,
      weight: 6
    },
    {
      id: 4,
      title: 'Étanchéité & toiture',
      status: 'todo',
      progress: 0,
      start: '2025-06-25',
      end: '2025-07-30',
      budgetPlanned: 90000,
      weight: 3
    },
    {
      id: 5,
      title: 'Second œuvre & finitions',
      subtitle: 'Élec, plomberie, peinture',
      status: 'todo',
      progress: 0,
      start: '2025-08-01',
      end: '2025-11-15',
      budgetPlanned: 210000,
      weight: 5
    },
  ])
})

// Ouvertures (accordéon)
const openIds = ref<Set<ProjectStep['id']>>(new Set())
function toggleOpen(id: ProjectStep['id']) {
  if (openIds.value.has(id)) openIds.value.delete(id)
  else openIds.value.add(id)
  // recréer l'instance Set pour réactivité Vue
  openIds.value = new Set(openIds.value)
}
function expandAll(){ openIds.value = new Set(props.steps.map(s => s.id)) }
function collapseAll(){ openIds.value = new Set() }

// Filtres
const filters = reactive({ todo: true, doing: true, done: true })
function toggleFilter(k: keyof typeof filters){ filters[k] = !filters[k] }

const filteredSteps = computed(() => props.steps.filter(s => filters[s.status]))

// Progress global pondéré (par poids > budget > 1)
const overallPercent = computed(() => {
  const steps = props.steps
  if (!steps.length) return 0
  let totalWeight = 0
  let acc = 0
  for (const s of steps){
    const w = (typeof s.weight === 'number' && s.weight > 0)
      ? s.weight
      : (typeof s.budgetPlanned === 'number' && s.budgetPlanned > 0 ? s.budgetPlanned : 1)
    const p = typeof s.progress === 'number' ? Math.max(0, Math.min(100, s.progress)) : (s.status === 'done' ? 100 : 0)
    acc += p * w
    totalWeight += w
  }
  return Math.round(acc / totalWeight)
})

// Helpers UI
function statusLabel(st: StepStatus){
  if (st === 'todo') return 'À faire'
  if (st === 'doing') return 'En cours'
  return 'Terminé'
}
function statusDotClass(st: StepStatus){
  if (st === 'todo') return 'bg-gray-300'
  if (st === 'doing') return 'bg-amber-500'
  return 'bg-emerald-600'
}
function badgeClass(st: StepStatus){
  if (st === 'todo') return 'border-gray-300 text-gray-600'
  if (st === 'doing') return 'border-amber-500 text-amber-700'
  return 'border-emerald-600 text-emerald-700'
}
function euro(n?: number){
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n || 0)
}
function formatDate(v?: string | Date){
  if (!v) return '—'
  const d = (typeof v === 'string') ? new Date(v) : v
  return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short' }).format(d)
}
function budgetRate(s: ProjectStep){
  const spent = s.budgetSpent || 0
  const planned = s.budgetPlanned || 0
  if (!planned) return 0
  return Math.max(0, Math.min(100, Math.round((spent / planned) * 100)))
}
</script>

<style scoped>
.fade-collapse-enter-active, .fade-collapse-leave-active { transition: opacity .15s ease, max-height .2s ease; }
.fade-collapse-enter-from, .fade-collapse-leave-to { opacity: 0; max-height: 0; }
.fade-collapse-enter-to, .fade-collapse-leave-from { opacity: 1; max-height: 1000px; }
</style>
