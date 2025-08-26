<script setup lang="ts">

import CSSStyleDeclarationFromParent from '@/components/effect/CSSStyleDeclarationFromParent.vue'
import HighlightCard from '@/components/animation/HighlightCard.vue'

withDefaults(defineProps<{
  class?: string
}>(), {
  class: ''
})

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
  <CSSStyleDeclarationFromParent :class="$props.class">
    <HighlightCard class="cursor-default select-none">
      <template #default="{ hover }">
        <div class="relative pl-9 py-6 flex flex-col gap-3 justify-center">
          <div class="text-xs text-accent font-extrabold">
            <slot name="title" />
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-xl font-bold">
              <slot name="container-hover" v-if="hover && $slots['container-hover']" />
              <slot name="container" v-else />
            </div>
            <div class="text-xs text-accent font-extrabold">
              <slot name="subtitle-hover" v-if="hover && $slots['subtitle-hover']" />
              <slot name="subtitle" v-else />
            </div>  
          </div>
        </div>
      </template>
    </HighlightCard>
  </CSSStyleDeclarationFromParent>
</template>