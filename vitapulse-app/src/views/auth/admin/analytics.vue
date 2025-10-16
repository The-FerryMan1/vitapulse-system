<script setup lang="ts">
import adminLayout from '@/layouts/adminLayout.vue';
import SkeletonLoader from '@/components/SkeletonLoader..vue';
import ErrorComp from '@/components/ErrorComp.vue';
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { useAdminStore } from '@/stores/useAdmin';

// const AsyncCounterAbnor = defineAsyncComponent({
//     loader: () => import('@/components/admin/analytics/averageReadings.vue'),
//     loadingComponent: SkeletonLoader,
//     delay: 200,
//     errorComponent: ErrorComp,
//     timeout: 3000,
// })

const {getReadings} = useAdminStore();


const data = ref([]);
onMounted(async()=>{
    data.value = await getReadings();
})
</script>

<template>
    <adminLayout class="overflow-y-auto">
        <div v-if="data">
            {{ data }}
            <h1 class="text-2xl font-semibold">Users Readings</h1>
            <!-- <AsyncCounterAbnor /> -->
        </div>
    </adminLayout>
</template>