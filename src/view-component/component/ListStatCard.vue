<script setup lang="ts">
import ListStatCardElement from '@/view-component/component/ListStatCardElement.vue';
import type { StatCardType, StatCardProps } from '@/view-component/interfaces/ListStatCard';

const props = withDefaults(defineProps<{
  classStatCard1?: string
  classStatCard2?: string
  classStatCard3?: string
  classStatCard4?: string
}>(), {
  classStatCard1: '',
  classStatCard2: '',
  classStatCard3: '',
  classStatCard4: '',
})

const statCards: Record<StatCardType, StatCardProps> = {
  total: {
    title: 'Total collécté',
    container: 847500,
    decimals: 0,
    unit: '€',
    subtitle: '+2.5% cette semaine',

    containerHover: 71,
    decimalsHover: 2,
    subtitleHover: 'collecté',
    unitHover: '%',
  },
  "last Jumu'ah": {
    title: "Dernier Jumu'ah",
    container: 12300,
    decimals: 0,
    subtitle: 'Vendredi dernier',
    unit: '€',

    beforeContainer: '+',
    containerHover: 2.5,
    decimalsHover: 2,
    subtitleHover: 'Depuis le dernier Jumu\'ah',
    unitHover: '%',
  },
  "prochain Palier": {
    title: 'Prochain Palier',
    subtitle: 'Restants à collecter',
    container: 52500,
    decimals: 0,
    unit: '€',

    subtitleHover: 'Pour la salle de prière',
    containerHover: 4,
    decimalsHover: 2,
    unitHover: '%',
  },
  global: {
    title: 'Objectif Global',
    subtitle: 'Budget total projet',
    container: 1200000,
    decimals: 0,
    unit: '€',

    subtitleHover: 'Pour terminer les travaux',
    containerHover: 29,
    decimalsHover: 2,
    unitHover: '%',
  }
}

</script>
<template>
  <div class="grid grid-cols-2">
    <ListStatCardElement
      :class="`text-primary ${props.classStatCard1}`"
      v-bind="statCards.total"
    />
    <ListStatCardElement
      :class="`text-secondary ${props.classStatCard2}`"
      v-bind="statCards['last Jumu\'ah']"
    />
    <ListStatCardElement  
      :class="`text-accent ${props.classStatCard3}`"
      v-bind="statCards['prochain Palier']"
    />
    <ListStatCardElement
      :class="`text-accent ${props.classStatCard4}`"
      v-bind="statCards.global"
    />
  </div>
</template>