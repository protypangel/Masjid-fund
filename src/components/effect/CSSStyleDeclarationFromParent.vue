<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{ class?: string }>(), 
  { class: '' }
)
const root = ref<HTMLElement|null>(null)

const style = ref<CSSStyleDeclaration|undefined>(undefined);

function tick() {
  const host = root.value!
  style.value = getComputedStyle(host);
}

watch(() => props.class, () => {
  nextTick().then(tick)
})

onMounted(() => {
  nextTick().then(tick)
})
</script>
<!--
Permettre au parent de récupérer le style du composant grand-parent via un scoped slot.

-----------------------------------
scoped slots:
- style : le style de l'élément grand-parent

-----------------------------------
props:
- class : la classe de l'élément grand-parent

-----------------------------------
Exemple d'utilisation avec :

Grand-parent:

<div>
  <Parent class="text-primary" />
  <div class="text-primary">
    <Parent />
  </div>
</div>

Parent:

<CSSStyleDeclarationFromParent v-slot="{ style }">
  <div :style="{ '--tw-gradient-to': style.color }">
    <slot />
  </div>
</CSSStyleDeclarationFromParent>

-->


<template>
  <div :class="class" ref="root">
    <slot :style="style" />
  </div>
</template>
