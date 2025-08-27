<script setup lang="ts">
import Title from '@/view-component/component/Title.vue';
import QrCode from '@/view-component/component/QrCode.vue';
import ShouldScrollIndicator from '@/components/indicator/ShouldScrollIndicator.vue';
import ListStatCard from '@/view-component/component/ListStatCard.vue';

</script>
<template>
  <div
    class="
      w-full h-full
      flex flex-col gap-2 items-center
    ">
    <div class="h-1/2 w-full flex flex-col gap-2 items-center justify-around py-4">
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
      <div class="flex flex-row items-center justify-around w-full grow">              
        <QrCode/>
        <QrCode class="tablet:flex"/>
      </div>
      <ShouldScrollIndicator 
        :shouldScroll="true"
        :scrollDirection="'down'"
        @click="() => console.log('click')"
      />
    </div>
    <div class="w-full h-1/2 flex">
      <ListStatCard 
        class-stat-card-1="col-span-4"
        class-stat-card-2="col-span-4"
        class-stat-card-3="col-span-4"
        class-stat-card-4="col-span-4"
        class="w-full h-full bg-accent justify-around items-center"
      />
    </div>
  </div>
</template>