<script setup lang="ts">
import AdminLayout from '@/layouts/adminLayout.vue';
import SkeletonLoader from '@/components/SkeletonLoader..vue';
import ErrorComp from '@/components/ErrorComp.vue';
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { useAxios } from '@/axios/useAxios';
import type { alerts } from '@/types/types';
import GenericCSVExpt from '@/components/GenericCSVExpt.vue';
const asyncAlertsList = defineAsyncComponent({
    loader: () => import('@/components/GenericTable.vue'),
    loadingComponent: SkeletonLoader,
    delay: 200,
    errorComponent: ErrorComp,
    timeout: 3000,
})
//fetch data with high or low bp, pulse
const data = ref<alerts[] | null>(null);
onMounted(async () => {
    const { data: alerts } = await useAxios.get(`/auth/admin/users/users-alerts?filter=${'weekly'}`);
    data.value = alerts;
})
</script>

<template>
    <AdminLayout>
        <h1 class="text-2xl mx-2 my-10 font-bold self-start">Alerts</h1>
        <GenericCSVExpt v-if="data" :data="data" name="admin" />
        <asyncAlertsList v-if="data" :data="data" :columnConfig="[
            {
                accessorKey: 'message',
                header: 'Message',
                cell: ({ row }) => `${row.getValue('message')}`
            },
            {
                accessorKey: 'timestamp',
                header: 'Timestamp',
                cell: ({ row }) => new Date(row.getValue('timestamp')).toLocaleString()
            },
        ]" />
    </AdminLayout>

</template>