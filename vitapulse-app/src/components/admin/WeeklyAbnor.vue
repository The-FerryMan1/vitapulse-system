<script setup lang="ts">
import { defineAsyncComponent, inject, onMounted, ref } from 'vue';
import type {  Abnormal } from '@/types/types';
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

const Abnormal:any = inject('data');


</script>


<template>
    <div class="w-full  mx-auto bg-white p-5 rounded-2xl shadow-md">
        <AsyncChart v-if="Abnormal" :data="Abnormal" />
    </div>
</template>