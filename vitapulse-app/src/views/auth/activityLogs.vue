<script setup lang="ts">
import type { UserLogs } from '@/types/types';
import SkeletonLoader from '@/components/SkeletonLoader..vue';
import ErrorComp from '@/components/ErrorComp.vue';
import userLayout from '@/layouts/userLayout.vue';
import GenericCSVExpt from '@/components/GenericCSVExpt.vue';
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/useUser';

const {getActivityLogs} = useUserStore();
const data = ref<UserLogs[]>([]);
const AsyncTableComp = defineAsyncComponent({
    loader: () => import('@/components/GenericTable.vue'),
    loadingComponent: SkeletonLoader,
    delay: 200,
    errorComponent: ErrorComp,
    timeout: 3000,
});

onMounted(async()=>{
    data.value = await getActivityLogs();
})

</script>

<template>
    <userLayout>
        <!-- Title with dark mode support -->
        <h1 class="text-2xl mx-2 font-bold self-start text-gray-800 dark:text-white">
            Activity logs
        </h1>

        <!-- Export Button for CSV, only when data exists -->
        <GenericCSVExpt v-if="data?.length !== undefined && data?.length > 0" :data="data" name="ActiviyLogs"
            class="px-2 mt-10" />

        <!-- Table Section -->
        <div class="w-full p-2 rounded-2xl bg-white dark:bg-gray-800 shadow-md">
            <AsyncTableComp v-if="data?.length !== undefined && data?.length > 0" :data="data" :column-config="[
                {
                    accessorKey: 'activity',
                    header: 'Activity',
                    cell: ({ row }) => `${row.getValue('activity')}`,
                },
                {
                    accessorKey: 'timestamp',
                    header: 'Timestamp',
                    cell: ({ row }) => new Date(row.getValue('timestamp')).toLocaleString(),
                },
            ]" class="dark:text-white dark:border-gray-700" />
        </div>
    </userLayout>
</template>