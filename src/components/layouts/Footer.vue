<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

type Phrase = { text: string; author: string; type: 'Sourate' | 'Hadith' }

const phrases: Phrase[] = [
  { text: 'Quiconque construit une mosquée pour Allah, Allah lui construit son équivalent au Paradis', author: 'Sahîh al-Bukhari', type: 'Hadith' },
  { text: "Et quiconque lui fait don de la vie, c'est comme s'il faisait don de la vie à tous les hommes", author: 'La table servie, verset 32', type: 'Sourate' },
  { text: "La sadaqa éteint les péchés comme l'eau éteint le feu", author: 'Tirmidhi', type: 'Hadith' },
  { text: "Et tout ce que vous dépensez de bien, c'est pour vous-mêmes", author: 'Al-Baqara, verset 272', type: 'Sourate' },
  { text: "Jamais l'aumône n'a diminué une fortune", author: 'Sahîh Muslim', type: 'Hadith' }
]

const currentIndex = ref(0)
let timer: number | undefined

const current = computed(() => phrases[currentIndex.value])

onMounted(() => {
  timer = window.setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % phrases.length
  }, 6_000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <footer class="border-t border-border py-8 bg-background">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative h-16">
      <transition name="fade" mode="out-in">
        <div
          :key="currentIndex"
          class="absolute inset-0 flex flex-col items-center justify-center"
        >
          <div class="text-base text-foreground font-bold">« {{ current.text }} »</div>
          <div class="mt-2 font-semibold text-secondary">{{ current.type }} — {{ current.author }}</div>
        </div>
      </transition>
    </div>
  </footer>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
