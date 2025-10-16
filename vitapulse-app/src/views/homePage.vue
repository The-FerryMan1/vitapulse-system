<script setup lang="ts">
import defaultLayout from '@/layouts/defaultLayout.vue'
import hero from '@/components/home/hero.vue';
import features from '@/components/home/features.vue';
import CTA from '@/components/home/CTA.vue';
import footerTheFooter from '@/components/home/footerTheFooter.vue';
import AboutUs from '@/components/home/aboutUs.vue';
</script>

<template>
    <defaultLayout>
        <hero />
        <features />
        <AboutUs />
        <CTA />
        <footerTheFooter/>
     </defaultLayout>
</template>