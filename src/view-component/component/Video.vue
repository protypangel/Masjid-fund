<script setup lang="ts">
import { computed, ref, nextTick, onMounted, onBeforeUnmount, watch } from 'vue'
import PlayIcon from '@/assets/video/play.svg'
import ChangeVideoIcon from '@/assets/video/ChangeVideo.svg'

const props = withDefaults(defineProps<{
  youtubeIds?: string[]
  startIndex?: number
  muted?: boolean
  autoplayNext?: boolean
}>(), {
  youtubeIds: () => [],
  startIndex: 0,
  muted: false,
  autoplayNext: true,
})

const frame = ref<HTMLIFrameElement | null>(null)
const playing = ref(false)
const ready = ref(false)

const currentIndex = ref(props.startIndex)
const currentYoutubeId = computed(() => props.youtubeIds[currentIndex.value])

const emit = defineEmits<{
  changeIndexVideo: [index: number],
}>()

const iconVideo = computed(() => `https://i.ytimg.com/vi/${currentYoutubeId.value}/hqdefault.jpg`)
const embedUrl = computed(() => {
  const base = `https://www.youtube.com/embed/${currentYoutubeId.value}`
  const params = new URLSearchParams({
    enablejsapi: '1',
    autoplay: '1',                 // on lancera de toute façon playVideo
    mute: props.muted ? '1' : '0',
    playsinline: '1',
    rel: '0',
    modestbranding: '1',
    iv_load_policy: '3',
    origin: window.location.origin,
  })
  return `${base}?${params.toString()}`
})

function send(cmd: string, args: any[] = []) {
  frame.value?.contentWindow?.postMessage(
    JSON.stringify({ event: 'command', func: cmd, args }),
    'https://www.youtube.com'
  )
}
async function play() {
  playing.value = true
  await nextTick()
  const onLoad = () => {
    ready.value = false
    // s’abonner aux events côté player
    send('addEventListener', ['onReady'])
    send('addEventListener', ['onStateChange'])
    if (props.muted) send('mute')
    send('playVideo')
  }
  frame.value?.addEventListener('load', onLoad, { once: true })
  // fallback si load déjà passé
  setTimeout(() => { if (props.muted) send('mute'); send('playVideo') }, 600)
}
function onMessage(e: MessageEvent) {
  if (e.origin !== 'https://www.youtube.com') return
  let data: any
  try { data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data } catch { return }
  if (data?.event === 'onReady') ready.value = true
  // 0 = ended
  if (data?.event === 'onStateChange' && data?.info === 0 && props.autoplayNext) {
    goNext()
  }
}

onMounted(() => window.addEventListener('message', onMessage))
onBeforeUnmount(() => window.removeEventListener('message', onMessage))

// Charger une autre vidéo SANS recréer l’iframe
function loadById(id: string) {
  if (props.youtubeIds.length === 0 || !ready.value) return

  send('loadVideoById', [{ videoId: id, startSeconds: 0 }])
  if (props.muted) send('mute')
  send('playVideo')
}

function goNext() {
  if (props.youtubeIds.length === 0) return
  currentIndex.value = (currentIndex.value + 1) % props.youtubeIds.length
  loadById(currentYoutubeId.value)
  emit('changeIndexVideo', currentIndex.value)
}
function goPrev() {
  if (props.youtubeIds.length === 0) return
  if (currentIndex.value === 0) currentIndex.value = props.youtubeIds.length - 1
  else currentIndex.value = currentIndex.value - 1
  loadById(currentYoutubeId.value)
  emit('changeIndexVideo', currentIndex.value)
}
function iframeClick() {
  console.log('iframeClick')
}
</script>

<template>
  <div class="grow relative">
    <!-- Poster (avant lecture) -->
    <div v-if="!playing" class="relative overflow-hidden rounded-xl border h-full min-h-60">
      <div
        class="w-full h-full bg-gray-200"
        :style="{
          backgroundImage: `url(${iconVideo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }"
      />
      <button
        type="button"
        class="absolute inset-0 grid place-items-center group"
        @click="play"
        aria-label="Lire la vidéo"
      >
        <PlayIcon
          class="
            w-24 h-24
            text-primary/60
            [--color-background:theme(--color-muted-foreground/60%)]
            hover:[--color-background:theme(--color-muted-foreground)]
          "
        />
      </button>
    </div>

    <!-- Player -->
    <div v-else class="relative overflow-hidden rounded-xl border h-full min-h-60 bg-black">
      <iframe
        @click="iframeClick"
        ref="frame"
        class="w-full h-full"
        :src="embedUrl"
        title="YouTube video player"
        frameborder="0"
        allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
        allowfullscreen
        loading="lazy"
      />

      <!-- Overlays navigation (comme YouTube) -->
      <template v-if="props.youtubeIds.length > 1">
        <!-- Gradient droite + bouton Next -->
        <div class="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-black/30 to-transparent">
          <ChangeVideoIcon
            class="
              pointer-events-auto absolute right-2 top-1/2 -translate-y-1/2
              w-10 h-10
              text-primary/70
              [--color-background:theme(--color-muted-foreground/60%)]
              hover:[--color-background:theme(--color-muted-foreground)]
            "
            @click="goNext"
          />
          <!-- <button
            type="button"
            class="pointer-events-auto absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center rounded-full bg-white/95 p-2 shadow hover:bg-white"
            @click="goNext"
            aria-label="Vidéo suivante"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M9 6l6 6-6 6"/></svg>
          </button> -->
        </div>

        <!-- Gradient gauche + bouton Prev -->
        <div class="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black/20 to-transparent">
          <ChangeVideoIcon
            class="
              pointer-events-auto absolute left-2 top-1/2 -translate-y-1/2
              w-10 h-10
              text-primary/70
              [--color-background:theme(--color-muted-foreground/60%)]
              hover:[--color-background:theme(--color-muted-foreground)]
              -scale-x-100
            "
            @click="goPrev"
          />
        </div>
      </template>
    </div>
  </div>
</template>
