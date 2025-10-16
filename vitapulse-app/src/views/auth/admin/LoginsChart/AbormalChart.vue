<script setup lang="ts">
import { defineAsyncComponent, inject, onMounted, ref } from 'vue';
import { useAxios } from '@/axios/useAxios';
import SkeletonLoader from '@/components/SkeletonLoader..vue';
import ErrorComp from '@/components/ErrorComp.vue';

const AsyncChart = defineAsyncComponent({
    loader: () => import('@/components/admin/abnomalitiesLine.vue'),
    loadingComponent: SkeletonLoader,
    delay: 200,
    errorComponent: ErrorComp,
    timeout: 3000,
})

const ab:any = inject('data');

// onMounted(async () => {
//     try {
//         const { data: abnormalities } = await useAxios.get('/auth/admin/readings/abnormalities/count');
//         console.log(abnormalities)
//         ab.value = abnormalities
//     } catch (error) {
//         console.log(error)
//     }
// })

</script>


<template>
    <div class="w-full mx-auto bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md">
        <AsyncChart v-if="ab.abnormal" :data="ab.abnormal" />
        <h1 v-else class="text-4xl animate-pulse text-gray-500 dark:text-gray-300">....Loading</h1>
    </div>
</template>

