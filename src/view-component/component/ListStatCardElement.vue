<script setup lang="ts">
import StatCard from '@/components/card/StatCard.vue';
import NumberTicker from '@/components/animation/NumberTicker.vue';
import { StatCardAndClassProps } from '@/view-component/interfaces/ListStatCard';


const props = withDefaults(defineProps<StatCardAndClassProps>(), {
  class: '',
});

</script>
<template>
  <StatCard :class="class">
    <template #title>{{ title }}</template>
    <template #container>
      <div class="flex items-center gap-1">
        <NumberTicker :target="container" />
        <span>{{ unit }}</span>
      </div>
    </template>
    <template #container-hover v-if="containerHover">
      <div class="flex items-center gap-1">
        <NumberTicker :target="containerHover" :duration="250" />
        <span>{{ unitHover }}</span>
      </div>
    </template>
    <template #subtitle>{{ subtitle }}</template>
    <template #subtitle-hover v-if="subtitleHover">{{ subtitleHover }}</template>
  </StatCard>
</template>
