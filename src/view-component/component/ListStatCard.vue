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
    subtitle: '+2.5% cette semaine',
    containerHover: 71,
    subtitleHover: 'collecté',
    unit: '€',
    unitHover: '%',
  },
  "last Jumu'ah": {
    title: "Dernier Jumu'ah",
    container: 12300,
    subtitle: 'Vendredi dernier',
    containerHover: 12300,
    subtitleHover: 'collecté',
    unit: '€',
    unitHover: '€',
  },
  "prochain Palier": {
    title: 'Prochain Palier',
    subtitle: 'Restants à collecter',
    subtitleHover: 'Pour la salle de prière',
    container: 52500,
    containerHover: 4,
    unit: '€',
    unitHover: '%',
  },
  global: {
    title: 'Objectif Global',
    subtitle: 'Budget total projet',
    subtitleHover: 'Pour terminer les travaux',
    container: 1200000,
    containerHover: 29,
    unit: '€',
    unitHover: '%',
  }
}

</script>
<template>
  <div class="grid grid-cols-4">
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