<template>
  <div class="rounded-2xl border bg-background shadow-sm p-4 lg:p-5">
    <!-- En-tête -->
    <div class="flex items-center gap-2 text-primary font-semibold">
      <svg width="20" height="20" viewBox="0 0 24 24" class="shrink-0"><path d="M3 3h18v18H3z" fill="currentColor" opacity=".1"/><path d="M7 7h10v10H7z" fill="currentColor"/></svg>
      Participer à la cagnotte
    </div>

    <!-- Progress -->
    <div class="mt-4">
      <div class="flex items-baseline justify-between">
        <div class="text-sm text-muted-foreground">Avancement</div>
        <div class="text-sm font-semibold">{{ percent }}%</div>
      </div>
      <div class="mt-2 h-2 rounded-full bg-muted overflow-hidden">
        <div class="h-full bg-primary" :style="{ width: percent + '%' }"></div>
      </div>
      <div class="mt-2 text-xs text-muted-foreground">
        <span class="font-medium">{{ formatMoney(raised) }}</span> collectés sur
        <span class="font-medium">{{ formatMoney(goal) }}</span>
      </div>
    </div>

    <!-- Montants rapides -->
    <div class="mt-5">
      <div class="text-sm text-muted-foreground mb-2">Montant</div>
      <div class="grid grid-cols-4 gap-2">
        <button
          v-for="v in presets"
          :key="v"
          type="button"
          class="rounded-xl border px-2 py-2 text-sm"
          :class="v === amount ? 'border-primary ring-1 ring-primary font-semibold' : 'hover:border-gray-400'"
          @click="amount = v"
        >{{ formatMoney(v) }}</button>
      </div>

      <!-- Montant libre -->
      <div class="mt-3 flex items-center gap-2">
        <label for="custom-amount" class="sr-only">Montant libre</label>
        <div class="relative flex-1">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
          <input
            id="custom-amount"
            type="number"
            min="1"
            step="1"
            class="w-full rounded-xl border px-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            v-model.number="amount"
            @focus="$event.target.select()"
          />
        </div>

        <!-- Don mensuel -->
        <label class="inline-flex items-center gap-2 text-sm select-none">
          <input
            type="checkbox" 
            v-model="monthly" 
            class="h-4 w-4 rounded border-border text-primary focus:ring-primary">
          Mensuel
        </label>
      </div>
    </div>

    <!-- CTA -->
    <div class="mt-4">
      <button
        type="button"
        class="w-full rounded-xl bg-emerald-600 text-white font-semibold py-2.5 hover:bg-emerald-700 disabled:opacity-50"
        :disabled="!amount || amount < 1"
        @click="donate"
      >
        Donner {{ formatMoney(amount) }} <span v-if="monthly">/ mois</span>
      </button>
      <p class="mt-2 text-xs text-gray-500 text-center">Paiement sécurisé — CB, wallet, virement</p>
    </div>

    <!-- IBAN / Virement -->
    <div class="mt-5 rounded-xl border bg-gray-50 p-3">
      <div class="flex items-center justify-between">
        <div class="text-sm font-medium">Virement bancaire</div>
        <button class="text-xs text-emerald-700 hover:underline" @click="ibanOpen = !ibanOpen">
          {{ ibanOpen ? 'Masquer' : 'Afficher' }}
        </button>
      </div>
      <div v-if="ibanOpen" class="mt-2 text-sm">
        <div class="font-mono break-all bg-white rounded-lg border px-3 py-2">
          {{ iban }}
        </div>
        <div class="mt-2 flex items-center gap-2">
          <button type="button" class="rounded-lg border px-3 py-1.5 text-sm hover:border-gray-400" @click="copyIban">
            Copier l’IBAN
          </button>
          <span v-if="copied" class="text-xs text-emerald-700">Copié ✓</span>
        </div>
      </div>
    </div>

    <!-- Points de confiance -->
    <ul class="mt-5 space-y-2 text-sm text-gray-600">
      <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 rounded-full bg-emerald-600"></span> Reçu par e-mail après don</li>
      <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 rounded-full bg-emerald-600"></span> Détails du projet et transparence des dépenses</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(defineProps<{
  raised?: number
  goal?: number
  defaultAmount?: number
  iban?: string
}>(), {
  raised: 847500,
  goal: 1200000,
  defaultAmount: 50,
  iban: 'FR76 3000 4000 5000 6000 7000 890'
})

const raised = computed(() => props.raised)
const goal = computed(() => props.goal)
const percent = computed(() => Math.min(100, Math.round((raised.value / goal.value) * 100)))

const presets = [20, 50, 100, 250]
const monthly = ref(false)
const amount = ref<number>(props.defaultAmount)

const ibanOpen = ref(false)
const copied = ref(false)
const iban = computed(() => props.iban)

function formatMoney(n: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n || 0)
}

function donate() {
  // branche ici ton flow (Stripe/PayPal/etc.)
  console.log('donate', { amount: amount.value, monthly: monthly.value })
}

async function copyIban() {
  try {
    await navigator.clipboard.writeText(iban.value.replace(/\s/g, ''))
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch (e) {
    copied.value = false
  }
}
</script>
