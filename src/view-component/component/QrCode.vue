<script setup lang="ts">
import HighlightCard from '@/components/animation/HighlightCard.vue';
import QrCodeIcon from '@/assets/QrCodeIcon.svg';
</script>

<template>
  <div class="flex">
    <a
    href="https://www.paypal.com/donate/?hosted_button_id=XYAD7VVFWRTLQ" 
    target="_blank">
      <HighlightCard class=" text-primary h-full">
        <div 
        class="
          h-full
          flex flex-col items-center justify-around
          px-4 py-2
        ">
          <div class="flex items-center justify-center h-fit-content gap-2">
            <QrCodeIcon class="w-5 [@media(min-height:650px)]:w-7" />
            <span class="text-lg font-bold">Participer à la cagnotte</span>
          </div>
          <img src="@/assets/QRCodeLowDetail.png" class="test" :width="160"/>
          <div class="flex items-center justify-center h-fit-content flex-col">
            <span class="hidden [@media(min-height:650px)]:flex text-lg font-bold">
              <span class="tablet:hidden">Cliquez ici pour contribuer</span>
              <span class="hidden tablet:block">Cliquez ou scannez pour contribuer</span>
            </span>
            <span class="hidden [@media(min-height:650px)]:block text-sm tablet:text-base text-muted-foreground font-bold">Donation sécurisée et instantanée</span>
          </div>
        </div>
      </HighlightCard>
    </a>
  </div>
</template>

<style scoped>
</style>