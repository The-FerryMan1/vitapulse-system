<script setup lang="ts">
import { defineAsyncComponent, inject, onMounted, ref } from 'vue';

import { useAxios } from '@/axios/useAxios';
import SkeletonLoader from '@/components/SkeletonLoader..vue';
import ErrorComp from '@/components/ErrorComp.vue';
const AsyncChart = defineAsyncComponent({
    loader: () => import('@/components/admin/ageDistriDonut.vue'),
    loadingComponent: SkeletonLoader,
    delay: 200,
    errorComponent: ErrorComp,
    timeout: 3000,
})



const ageDisti:any = inject('data');
// onMounted(async () => {
//     try {
//         const { data } = await useAxios.get('/auth/admin/users/age-distri');
//         ageDisti.value = data
//     } catch (error) {
//         ageDisti.value = null
//         console.log(error)
//     }
// })

</script>


<template>
    <div class="w-full max-w-md mx-auto bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md">
        <AsyncChart v-if="ageDisti.counts" :data="ageDisti.counts" />
        <h1 v-else class="text-4xl animate-pulse text-gray-500 dark:text-gray-300">....Loading</h1>
    </div>
</template>
>