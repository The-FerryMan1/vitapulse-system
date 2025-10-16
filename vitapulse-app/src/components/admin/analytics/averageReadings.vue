<script setup lang="ts">
import { onMounted, ref, defineAsyncComponent } from 'vue';
import { useAdminStore } from '@/stores/useAdmin';
import SkeletonLoader from '@/components/SkeletonLoader..vue';
import ErrorComp from '@/components/ErrorComp.vue';

const AsyncCounterAbnor = defineAsyncComponent({
    loader: () => import('./barChart.vue'),
    loadingComponent: SkeletonLoader,
    delay: 200,
    errorComponent: ErrorComp,
    timeout: 3000,
})

const data = ref();

onMounted(async()=>{
    data.value = await useAdminStore().countAbnor();
})
</script>

<template>
    <div class="p-3 h-1/2 flex">
        <AsyncCounterAbnor v-if="data" :readings="data"/>
    </div>
</template>