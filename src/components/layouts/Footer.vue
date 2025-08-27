<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

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

// refs pour le conteneur visible et le sizer caché
const containerEl = ref<HTMLElement | null>(null)
const sizerEl = ref<HTMLElement | null>(null)
const measureEls = ref<HTMLElement[]>([])
const containerH = ref<number>(0)

function measureHeight(): void {
  nextTick(() => {
    // caler la largeur du sizer sur celle du conteneur (pour le même wrapping du texte)
    const w = containerEl.value?.clientWidth ?? window.innerWidth
    if (sizerEl.value) sizerEl.value.style.width = `${w}px`

    let maxH = 0
    for (const el of measureEls.value) {
      if (el) maxH = Math.max(maxH, el.offsetHeight)
    }
    containerH.value = maxH
  })
}

onMounted(() => {
  // mesure initiale
  measureHeight()

  // re-mesurer si la police se charge plus tard
  if ('fonts' in document) {
    (document as any).fonts.ready.then(() => measureHeight())
  }

  // re-mesurer au resize
  const onResize = () => measureHeight()
  window.addEventListener('resize', onResize)

  // auto-rotation
  timer = window.setInterval(() => {
    // currentIndex.value = (currentIndex.value + 1) % phrases.length
  }, 7_000)

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
  })
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>
<!-- todo: when the user two tape in phone the Footer should be fixed and not zoomed -->

<template>
  <footer 
    class="
      w-screen h-fit
      border-t border-border bg-background 
    ">
    <div
      ref="containerEl"
      class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center overflow-hidden"
      :style="{ height: containerH + 'px' }"
    >
      <transition name="fade" mode="out-in">
        <div
          :key="currentIndex"
          class="absolute inset-0 px-4 tablet:px-8 laptop:px-12 flex flex-col items-center justify-center"
        >
          <div class="text-base text-foreground font-bold">
            « {{ phrases[currentIndex].text }} »
          </div>
          <div class="mt-2 font-semibold text-secondary">
            {{ phrases[currentIndex].type }} — {{ phrases[currentIndex].author }}
          </div>
        </div>
      </transition>

      <div
        ref="sizerEl"
        class="invisible pointer-events-none absolute left-0 top-0"
        aria-hidden="true"
      >
        <div
          v-for="(p, i) in phrases"
          :key="'measure-'+i"
          :ref="el => (measureEls[i] = el as HTMLElement)"
          class="px-4 tablet:px-8 laptop:px-12 py-6 tablet:py-8 laptop:py-12"
        >
          <div class="text-base font-bold">« {{ p.text }} »</div>
          <div class="mt-2 font-semibold">{{ p.type }} — {{ p.author }}</div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
