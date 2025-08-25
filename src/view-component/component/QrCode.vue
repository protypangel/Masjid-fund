<script setup lang="ts">
import HighlightCard from '@/components/animations/HighlightCard.vue';
import QrCodeIcon from '@/assets/QrCodeIcon.svg';
</script>

<template>
  <div class="flex">
    <a 
    href="https://www.paypal.com/donate/?hosted_button_id=XYAD7VVFWRTLQ" 
    target="_blank">
      <HighlightCard class=" text-primary">
        <div class="flex items-center justify-center h-fit-content gap-10 flex-col px-15 py-10">
          <div class="flex items-center justify-center h-fit-content gap-2">
            <QrCodeIcon />
            <span class="text-lg font-bold">Participer à la cagnotte</span>
          </div>
          <img src="@/assets/QRCodeLowDetail.png" class="test" :width="160"/>
          <div class="flex items-center justify-center h-fit-content gap-2 flex-col">
            <span class="text-lg font-bold">Scanner pour contribuer</span>
            <span class="text-base text-muted-foreground font-bold">Donation sécurisée et instantanée</span>
          </div>
        </div>
      </HighlightCard>
    </a>
  </div>
</template>

<style scoped>
</style>