<script setup lang="ts">
import Title from '@/view-component/component/Title.vue';
import QrCode from '@/view-component/component/QrCode.vue';
import ShouldScrollIndicator from '@/components/indicator/ShouldScrollIndicator.vue';
import ListStatCard from '@/view-component/component/ListStatCard.vue';
import { ref } from 'vue';
import Timeline from '@/view-component/component/Timeline.vue';
import Video from '@/view-component/component/Video.vue';

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
    <div class="min-h-1/2 w-full flex flex-col gap-6 items-center justify-around py-2">
      <Title>
        <template #title>
          <div class="flex items-center gap-2">
            <span class="text-secondary">نور السلام</span>
            <span class="text-accent">–</span> 
            <span class="text-primary">Construisons notre mosquée</span>
          </div>
        </template>
      </Title>
      <div class="grow flex flex-row gap-4 w-full ">
        <QrCode />
        <Video
          youtubeId="QLT7Je6up_w"
        >
      </Video>
        <!-- <iframe 
          src="https://www.youtube.com/embed/QLT7Je6up_w" 
          title="Le Récap : La mosquée de Vitry, c&#39;est signé !" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen/> -->
      </div>
      <ShouldScrollIndicator 
        :shouldScroll="true"
        :scrollDirection="'down'"
        @click="scrollToListStatCard"
      />
    </div>
    <div 
      class="w-full grow phone:max-w-3/4" 
      ref="refListStatCard">
      <ListStatCard 
        class="w-full h-full items-center gap-x-16"
        class-stat-card-1="col-span-2 tablet:col-span-1"
        class-stat-card-2="col-span-2 phone:col-span-1"
        class-stat-card-3="col-span-2"
        class-stat-card-4="col-span-2">
      </ListStatCard>
    </div>
  </div>
</template>