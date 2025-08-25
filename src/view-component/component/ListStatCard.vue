<script setup lang="ts">
import StatCard from '@/components/cards/StatCard.vue';
import NumberTicker from '@/components/animations/NumberTicker.vue';
</script>
<template>
  <!-- todo: remove the h-[170px] when the card is fixed -->
  <div class="flex h-[170px]">
    <StatCard class="flex-1 text-primary">
      <template #title>Total collécté</template>
      <template #container>
        <div class="flex items-center gap-1">
          <NumberTicker :target="847500" />
          <span>€</span>
        </div>
      </template>
      <template #container-hover>
        <div class="flex items-center gap-1">
          <NumberTicker :target="71" :duration="250" />
          <span>%</span>
        </div>
      </template>
      <template #subtitle>+2.5% cette semaine</template>
      <template #subtitle-hover>collecté</template>
    </StatCard>
    <StatCard class="flex-1 text-secondary">
      <template #title>Dernier Jumu'ah</template>
      <template #container>
        <div class="flex items-center gap-1">
          <NumberTicker :target="12300" />
          <span>€</span>
        </div>
      </template>
      <template #container-hover>
        <div class="flex items-center gap-1">
          <NumberTicker :target="12300" :duration="250" />
          <span>€</span>
        </div>
      </template>
      <template #subtitle>Vendredi dernier</template>
    </StatCard>
    <StatCard class="flex-1 text-accent">
      <template #title>Prochain Palier</template>
      <template #container>
        <div class="flex items-center gap-1">
          <NumberTicker :target="52500" />
          <span>€</span>
        </div>
      </template>
      <template #container-hover>
        <div class="flex items-center gap-1">
          <NumberTicker :target="4" :duration="250" />
          <span>%</span>
        </div>
      </template>
      <template #subtitle>Restants à collecter</template>
      <template #subtitle-hover>Pour la salle de prière</template>
    </StatCard>
    <StatCard class="flex-1 text-accent">
      <template #title>Objectif Global</template>
      <template #container>1 200 000 €</template>
      <template #container-hover>
        <div class="flex items-center gap-1">
          <NumberTicker :target="29" :duration="250" />
          <span>%</span>
        </div>
      </template>
      <template #subtitle>Budget total projet</template>
      <template #subtitle-hover>Pour terminer les travaux</template>
    </StatCard>
  </div>
</template>