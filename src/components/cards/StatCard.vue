<script setup lang="ts">
import { ref, useSlots, computed } from 'vue'

const props = withDefaults(defineProps<{
  upSizeOnHover?: boolean,
  borderColor?: string,
  borderWidth?: number,
}>(), {
  upSizeOnHover: false,
  borderColor: 'currentColor',
  borderWidth: 2
})

const hover = ref(false)
const slots = useSlots()

const hasContainerHover = computed(() => !!slots['container-hover'])
const hasSubtitleHover  = computed(() => !!slots['subtitle-hover'])

const paddingAnimation = computed(() => props.upSizeOnHover ? 'hover:p-0' : '')
const borderAnimation = computed(() => `hover:border-[${props.borderColor}] hover:border-[${props.borderWidth}px]`)
</script>

<!--
Une carte qui permet d'afficher des statistiques.

-----------------------------------
slots: 
- title : le titre de la carte
- container : la valeur de la statistique
- subtitle : le sous-titre de la carte

En option lorsque la carte est survolée:
- container-hover : la valeur de la statistique lorsque la carte est survolée
- subtitle-hover : le sous-titre de la carte lorsque la carte est survolée
-----------------------------------
props:
- upSizeOnHover : si true la carte s'agrandit lors du survol
- borderColor : la couleur de la bordure (par défaut currentColor)
- borderWidth : la largeur de la bordure (par défaut 2)

-----------------------------------
Exemple d'utilisation avec :

<StatCard class="w-[300px] text-primary">
  <template #title>Total collécté</template>
  <template #container>847 500 €</template>
  <template #container-hover>71%</template>
  <template #subtitle>+2.5% cette semaine</template>
  <template #subtitle-hover>collecté</template>
</StatCard>

<StatCard class="w-[300px] text-primary">
  <template #title>Total collécté</template>
  <template #container>847 500 €</template>
  <template #subtitle>+2.5% cette semaine</template>
</StatCard>
-->
<template>
  <div
    :class="[
      'h-[150px] p-2 hover:p-0',
      'transition-[padding,border-width,border-color] duration-300 ease-in-out',
      paddingAnimation
    ]"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
  {{ props.borderColor }}
    <div :class="[
      'relative h-full rounded-xl bg-background border border-border shadow-soft px-9 flex flex-col gap-3 justify-center',
      borderAnimation
    ]">
      <div class="text-xs text-accent font-bold">
        <slot name="title" />
      </div>

      <div class="flex flex-col gap-1">
        <div class="text-xl font-bold">
          <Transition name="slide" mode="out-in">
            <div class="block w-full">
              <slot name="container-hover" v-if="hover && hasContainerHover" />
              <slot name="container" v-else />
            </div>
          </Transition>
        </div>

        <div class="text-xs text-accent font-bold">
          <Transition name="slide" mode="out-in">
            <div class="block w-full">
              <slot name="subtitle-hover" v-if="hover && hasSubtitleHover" />
              <slot name="subtitle" v-else />
            </div>  
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity .3s ease, transform .3s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(-100px); /* arrive de gauche */
}
.slide-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.slide-leave-to {
  transform: translateX(100px);  /* part à droite */
}
</style>
