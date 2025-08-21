<script setup lang="ts">
import StatCardTemplate from '../../components/stat-card.vue';
</script>
<template>
  <div class="flex">
    <StatCardTemplate class="w-[300px] text-primary">
      <template #title>Total collécté</template>
      <template #container>847 500 €</template>
      <template #container-hover>71%</template>
      <template #subtitle>+2.5% cette semaine</template>
      <template #subtitle-hover>collecté</template>
    </StatCardTemplate>
    <StatCardTemplate class="w-[300px] text-secondary">
      <template #title>Dernier Jumu'ah</template>
      <template #container>12 300 €</template>
      <template #subtitle>Vendredi dernier</template>
    </StatCardTemplate>
    <StatCardTemplate class="w-[300px] text-accent">
      <template #title>Prochain Palier</template>
      <template #container>52 500 €</template>
      <template #container-hover>Encore 4%</template>
      <template #subtitle>Restants à collecter</template>
      <template #subtitle-hover>Pour la salle de prière</template>
    </StatCardTemplate>
    <StatCardTemplate class="w-[300px] text-accent">
      <template #title>Objectif Global</template>
      <template #container>1 200 000 €</template>
      <template #container-hover>29%</template>
      <template #subtitle>Budget total projet</template>
      <template #subtitle-hover>Pour terminer les travaux</template>
    </StatCardTemplate>
  </div>
</template>