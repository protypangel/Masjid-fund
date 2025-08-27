<script setup lang="ts">
import Title from '@/view-component/component/Title.vue';
import QrCode from '@/view-component/component/QrCode.vue';
import ShouldScrollIndicator from '@/components/indicator/ShouldScrollIndicator.vue';
import ListStatCard from '@/view-component/component/ListStatCard.vue';
import { ref } from 'vue';

const refListStatCard = ref<HTMLElement | null>(null);

function scrollToListStatCard() {
  if (!refListStatCard.value) return;
  refListStatCard.value.scrollIntoView({ behavior: 'smooth' });
}

</script>
<template>
  <div
    class="
      w-full h-full
      flex flex-col items-center
    ">
    <div class="h-1/2 w-full flex flex-col gap-2 items-center justify-around py-2">
      <Title>
        <template #title>
          <div class="flex items-center gap-2">
            <span class="text-secondary">نور السلام</span>
            <span class="text-accent">–</span> 
            <span class="text-primary">Construisons notre mosquée</span>
          </div>
        </template>
        <template #subtitle>
          <div class="[@media(--hsm)]:hidden">
            Merci pour votre générosité et votre soutien à cette noble cause
          </div>
        </template>
      </Title>
      <QrCode/>
      <ShouldScrollIndicator 
        :shouldScroll="true"
        :scrollDirection="'down'"
        @click="scrollToListStatCard"
      />
    </div>
    <div 
    class="w-full h-1/2 phone:max-w-3/4 tablet:max-w-1/2" 
    ref="refListStatCard">
      <ListStatCard 
        class="w-full h-full items-center gap-x-4"
        class-stat-card-1="col-span-2 phone:col-span-1"
        class-stat-card-2="col-span-2 phone:col-span-1"
        class-stat-card-3="col-span-2 phone:col-span-1"
        class-stat-card-4="col-span-2 phone:col-span-1"
      >
        <!-- <div class="hidden phone:flex col-span-2 bg-primary self-stretch">
        </div> -->
      </ListStatCard>
    </div>
  </div>
</template>