<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import FooterText from '@/components/layouts/FooterText.vue'
import { FotterTextRef } from '@/interfaces/layouts/FooterText'
import { FooterProps } from '@/interfaces/layouts/Footer'

const props = defineProps<FooterProps>()

const phrases = props.phrases

const currentIndex = ref(0)
let timer: number | undefined

// refs pour le conteneur visible et le sizer caché
const containerEl = ref<HTMLElement | null>(null)
const sizerEl = ref<HTMLElement | null>(null)
const measureEls = ref<FotterTextRef[]>([])
const containerH = ref<number>(0)

function measureHeight(): void {
  nextTick(() => {
    // caler la largeur du sizer sur celle du conteneur (pour le même wrapping du texte)
    const w = containerEl.value?.clientWidth ?? window.innerWidth
    if (sizerEl.value) sizerEl.value.style.width = `${w}px`

    let maxH = 0
    for (const el of measureEls.value) {
      if (el) {
        maxH = Math.max(maxH, el.el.offsetHeight ?? 0)
      }
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
  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
  })
  
  
  // auto-rotation
  timer = window.setInterval(() => {
    // currentIndex.value = (currentIndex.value + 1) % phrases.length
  }, 7_000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <footer class="border-t border-border bg-background w-screen h-fit">
    <div
      ref="containerEl"
      class="relative"
      :style="{ height: containerH + 'px' }"
    >
      <transition name="fade" mode="out-in">
        <FooterText
          :key="currentIndex"
          :text="phrases[currentIndex].text"
          :type="phrases[currentIndex].type"
          :author="phrases[currentIndex].author"/>
    </transition>
      <div
        ref="sizerEl"
        class="invisible pointer-events-none absolute left-0 top-0"
        aria-hidden="true"
      >
        <FooterText
            v-for="(p, i) in phrases"
            :key="'measure-'+i"
            :ref="el => (measureEls[i] = el as HTMLElement)"
            :text="p.text"
            :type="p.type"
            :author="p.author"/>
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
