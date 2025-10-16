<script setup lang="ts">
import { useAxios } from '@/axios/useAxios';
import GenericTable from '@/components/GenericTable.vue';
import adminLayout from '@/layouts/adminLayout.vue';
import ExportToCsv from '@/components/ExportToCsv.vue';
import { onMounted, ref } from 'vue';
const data = ref(null);
onMounted(async()=>{
    try {
       const {data:logs} =  await useAxios.get('/auth/admin/logs');
       data.value = logs
    } catch (error) {
        data.value = null
    }
})
</script>

<template>
    <adminLayout>
        <h1 class="text-2xl mx-2 my-10 font-bold self-start">Users' activity logs</h1>
        <ExportToCsv v-if="data" :Data="data" :name="'burat'"/>
         <GenericTable v-if="data" :data="data" :column-config="[
        {
            accessorKey: 'name',
            header: 'Name',
            cell: ({row}) => `${row.getValue('name')}`
        },
        {
            accessorKey: 'activity',
            header: 'Activity',
            cell: ({ row }) => `${row.getValue('activity')}`
        },
        {
            accessorKey: 'timestamp',
            header: 'Timestamp',
            cell: ({ row }) => {
                return new Date(row.getValue('timestamp')).toLocaleString()
            }
        },
    ]" />
    </adminLayout>
</template>