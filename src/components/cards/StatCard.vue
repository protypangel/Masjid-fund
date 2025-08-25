<script setup lang="ts">
import { ref, computed } from 'vue'
import CSSStyleDeclarationFromParent from '@/components/effect/CSSStyleDeclarationFromParent.vue'

const hover = ref(false)

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
  <CSSStyleDeclarationFromParent v-slot="{ style }">
    <div
    :class="[
      'group h-[150px] p-2 cursor-default select-none',
      'transition-[padding,border-width,border-color] duration-300 ease-in-out',
      'hover:p-0'
    ]"
    @mouseenter="hover = true"
    @mouseleave="hover = false">
      <div 
      :class="[
        'relative h-full rounded-xl bg-background border-solid border-border border-1 shadow-soft px-9 flex flex-col gap-3 justify-center',
        'group-hover:border-[3px]',
        `group-hover:border-[var(--border-color-hover)]`
      ]"
      :style="{ '--border-color-hover': style?.color }">
        <div class="w-full text-xs text-accent font-bold">
          <slot name="title" />
        </div>
        <div class="flex flex-col gap-1">
          <div class="w-full text-xl font-bold">
            <slot name="container-hover" v-if="hover && $slots['container-hover']" />
            <slot name="container" v-else />
          </div>
          <div class="w-full text-xs text-accent font-bold">
            <slot name="subtitle-hover" v-if="hover && $slots['subtitle-hover']" />
            <slot name="subtitle" v-else />
          </div>  
          </div>
        </div>
    </div>
  </CSSStyleDeclarationFromParent>
</template>