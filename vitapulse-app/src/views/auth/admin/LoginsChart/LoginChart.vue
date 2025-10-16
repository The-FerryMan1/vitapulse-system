<script setup lang="ts">
import { defineAsyncComponent, inject, onMounted, ref } from 'vue';
// import type { Counts, Logins } from '@/types/types';
// import { useAxios } from '@/axios/useAxios';
import SkeletonLoader from '@/components/SkeletonLoader..vue';
import ErrorComp from '@/components/ErrorComp.vue';

const AsyncChart = defineAsyncComponent({
    loader: () => import('@/components/admin/loginsChart.vue'),
    loadingComponent: SkeletonLoader,
    delay: 200,
    errorComponent: ErrorComp,
    timeout: 3000,
})

const logins:any = inject('data')
// const loginPerDay = ref<Logins[] | null>(null);

// onMounted(async () => {
//     try {
//         const { data: logins } = await useAxios.get('/auth/admin/users/loginPerDay');
//         loginPerDay.value = logins
//     } catch (error) {
//         console.log(error)
//     }
// })

</script>


<template>
    <div class="w-full mx-auto bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md">
        <AsyncChart v-if="logins.logins" :data="logins.logins" />
        <h1 v-else class="text-4xl animate-pulse text-gray-500 dark:text-gray-300">....Loading</h1>
    </div>
</template>
