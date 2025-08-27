<script setup lang="ts">
import { computed, ref, nextTick } from 'vue'

const props = defineProps<{ youtubeId: string }>()
const frame = ref<HTMLIFrameElement | null>(null)
const playing = ref(false)

const iconVideo = computed(() => `https://i.ytimg.com/vi/${props.youtubeId}/hqdefault.jpg`)

const embedUrl = computed(() => {
  const base = `https://www.youtube.com/embed/${props.youtubeId}`
  const params = new URLSearchParams({
    enablejsapi: '1',      // API Iframe
    autoplay: '1',         // on veut lancer
    mute: '1',             // autoplay policy (tu peux unmute après)
    playsinline: '1',      // iOS
    rel: '0',
    modestbranding: '1',
    iv_load_policy: '3',
    origin: window.location.origin
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
  // 1) on monte l'iframe
  playing.value = true
  await nextTick()

  // 2) quand l'iframe est chargée, on appelle playVideo
  const onLoad = () => {
    // (optionnel) tu peux unmute juste après si c’était un clic utilisateur
    // send('unMute')
    send('playVideo')
  }

  if (frame.value) {
    frame.value.addEventListener('load', onLoad, { once: true })
    // fallback si l'event 'load' est déjà passé
    setTimeout(() => send('playVideo'), 600)
  }
}
</script>

<template>
  <div class="grow">
    <div v-if="!playing" class="relative overflow-hidden rounded-xl border h-full">
      <div
        class="w-full bg-gray-200 h-full"
        :style="{
          backgroundImage: `url(${iconVideo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }"
      ></div>
      <button
        type="button"
        class="absolute inset-0 grid place-items-center group"
        @click="play"
        aria-label="Lire la vidéo"
      >
        <span class="rounded-full bg-white/90 p-4 shadow group-hover:bg-white transition">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </button>
    </div>

    <div v-else class="overflow-hidden rounded-xl border h-full">
      <iframe
        ref="frame"
        class="w-full h-full"
        :src="embedUrl"
        title="YouTube video player"
        frameborder="0"
        allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
        allowfullscreen
        loading="lazy"
      />
    </div>
  </div>
</template>
