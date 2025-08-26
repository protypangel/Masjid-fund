<script setup lang="ts">
import ListStatCardElement from '@/view-component/component/ListStatCardElement.vue';
import type { StatCardType, StatCardProps } from '@/view-component/interfaces/ListStatCard';

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
  <!-- todo: remove the h-[170px] when the card is fixed -->
  <div class="laptop:flex">
    <div class="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] laptop:flex laptop:flex-1">
      <ListStatCardElement
        class="text-primary"
        v-bind="statCards.total"
      />
      <ListStatCardElement
        class="text-secondary"
        v-bind="statCards['last Jumu\'ah']"
      />
    </div>
    <div class="grid grid-cols-1 tablet:grid-cols-2 laptop:flex laptop:flex-1">
      <ListStatCardElement
        class="text-accent"
        v-bind="statCards['prochain Palier']"
      />
      <ListStatCardElement
        class="text-accent"
        v-bind="statCards.global"
      />
    </div>
  </div>
</template>