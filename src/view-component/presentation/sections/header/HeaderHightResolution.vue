<script setup lang="ts">
import Title from '@/view-component/component/Title.vue';
import QrCode from '@/view-component/component/QrCode.vue';
import ShouldScrollIndicator from '@/components/indicator/ShouldScrollIndicator.vue';
import ListStatCard from '@/view-component/component/ListStatCard.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import Video from '@/view-component/component/Video.vue';

const refVideo = ref<HTMLElement | null>(null);

function scrollToListStatCard() {
  if (!refVideo.value) return;
  console.log(refVideo.value);
  refVideo.value.scrollIntoView({ behavior: 'smooth' });
}
const videoIndex = ref(0);

/* 
  Know if the video is higher than the father div :
  - If yes, we show the indicator and the video is in another section
  - If not, we show the video in the same section
*/

const multipleSection = ref(false);
const divTestOverflowing = ref<HTMLElement | null>(null);
function checkDivTestOverflowing() {
  if (!divTestOverflowing.value) return;
  multipleSection.value = false;
  const el: HTMLElement = divTestOverflowing.value;
  multipleSection.value = el.parentElement!.clientHeight < el.clientHeight;
}
onMounted(() => {
  checkDivTestOverflowing();
  window.addEventListener('resize', checkDivTestOverflowing);
})
onUnmounted(() => {
  window.removeEventListener('resize', checkDivTestOverflowing);
})


</script>
<template>
  <div
    class=" 
      w-full height-size
      flex flex-col items-center
      px-4
    "
    :class="divTestOverflowing ? 'height-size-2section' : 'height-size-1section'"
    ref="divTestOverflowing">
    <div
    class=" w-full flex flex-col gap-4 items-center justify-around py-2">
      <Title>
        <template #title>
          <div class="flex items-center gap-2">
            <span class="text-secondary">نور السلام</span>
            <span class="text-accent">–</span> 
            <span class="text-primary">Construisons notre mosquée</span>
          </div>
        </template>
      </Title>
      <ListStatCard
        class="w-full items-center gap-x-4 gap-y-4"
        class-stat-card-1="col-span-2 [@media(min-width:900px)]:col-span-1"
        class-stat-card-2="col-span-2 [@media(min-width:900px)]:col-span-1"
        class-stat-card-3="col-span-2 [@media(min-width:900px)]:col-span-1"
        class-stat-card-4="col-span-2 [@media(min-width:900px)]:col-span-1">
      </ListStatCard>

      <div class="grow w-full flex items-center">
        <div 
        class="
          flex flex-row gap-4 
          justify-center 
          h-full max-h-[350px] w-full
        ">
          <QrCode />
          <QrCode />
        </div>
      </div>
      <Video
        v-if="!multipleSection"
        :youtubeIds="['QLT7Je6up_w', 'QvCpunO1mhc']"
        class="grow w-full"
        :startIndex="videoIndex"
        @changeIndexVideo="(index) => videoIndex = index"
      />
      <ShouldScrollIndicator
        v-if="multipleSection"
        class="block"
        :shouldScroll="true"
        :scrollDirection="'down'"
        @click="scrollToListStatCard"
        :message="'Défilez pour voir les vidéos'"
      />
    </div>
    <div
    v-if="multipleSection"
    ref="refVideo" 
    class="flex justify-center items-center w-full">
      <Video
        :youtubeIds="['QLT7Je6up_w', 'QvCpunO1mhc']"
        class="w-full p-8 h-full block"
        :startIndex="videoIndex"
        @changeIndexVideo="(index) => videoIndex = index"
      />
    </div>
  </div>
</template>
<style scoped>

.height-size-2section {
  height: 200%;
}
.height-size-2section > div {
  height: calc(50%);
}
.height-size-1section {
  height: 100%;
}
.height-size-1section > div {
  height: calc(100%);
}
</style>