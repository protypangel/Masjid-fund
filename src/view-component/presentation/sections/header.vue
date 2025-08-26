<script setup lang="ts">
import QrCode from '@/view-component/component/QrCode.vue'
import Title from '@/view-component/component/Title.vue'
import ListStatCard from '@/view-component/component/ListStatCard.vue'
import ShouldScrollIndicator from '@/components/indicator/ShouldScrollIndicator.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'


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
  <section class="relative overflow-hidden">
    <div class="absolute inset-0 -z-99 pattern-grid opacity-60 pointer-events-none"/>
    <!-- todo: it's not 200% height -->
    <div
      class="
        relative h-full flex flex-col justify-between
        px-4 gap-2
      ">
      <div class="bg-blue-500 h-1/2 w-full flex flex-col gap-2 items-center">
        <!-- when it's phone the user see Title and QrCode in one line -->
        <Title class="pt-4">
          <template #title>
            <span class="text-secondary">نور السلام</span> <span class="text-accent">–</span> Construisons notre mosquée
          </template>
          <template #subtitle>
            <div class="hidden tablet:block">
              Merci pour votre générosité et votre soutien à cette noble cause
            </div>
          </template>
        </Title>
        <div class="grow tablet:hidden flex flex-col items-center justify-center">
          <QrCode class="h-[300px]"/>
          <ShouldScrollIndicator 
            :shouldScroll="true"
            :scrollDirection="'down'"
            />
        </div>
      </div>
      <ListStatCard />
    </div>
        <!--      
      </div>

      <ListStatCard />
      
      <div class="grid grid-cols-2 gap-2">
        <QrCode class="hidden tablet:flex" />
        <QrCode />
      </div> -->
      
      <!-- <div class="mt-8 grid lg:grid-cols-2 gap-8 items-stretch">
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
    -->
  </section>
</template>
