<script setup lang="ts">
import { computed, ref, h } from 'vue';
import type { TableColumn } from '@nuxt/ui'
import { getPaginationRowModel } from '@tanstack/vue-table'
import { useTemplateRef } from 'vue';
import type { alerts } from '@/types/types';
const props = defineProps<{
    Data: alerts[]
}>();

const table = useTemplateRef('table');
const globalFilter = ref('')
const pagination = ref({
    pageIndex: 0,
    pageSize: 5
});
// const getZScoreClass = (z: number) => {
//     if (Math.abs(z) > 2) return 'font-bold p-2 rounded-md bg-red-600 text-white';
//     if (Math.abs(z) > 1.5) return 'bg-yellow-500 rounded-md text-white p-2';
//     return '';
// };

// id: number;
// user_id: number;
// message: string;
// timestamp: string;
const columns = computed(() => {
    const columns: TableColumn<alerts>[] = [
        {
            accessorKey: 'message',
            header: 'Message',
            cell: ({ row }) => `${row.getValue('message')}`
        },
        
        {
            accessorKey: 'timestamp',
            header: 'Timestamp',
            cell: ({ row }) => {
                return new Date(row.getValue('timestamp')).toLocaleString()
            }
        },

    ]

    return columns
});




const tableData = computed(() => {
    return props?.Data;
})
</script>

<template>
    <div>
        <div class="flex px-4 py-3.5  w-1/2 ">
            <UInput icon="i-lucide-search" v-model="globalFilter" class="w-full" placeholder="search..." />
        </div>  
    </div>
    <UTable sticky v-model:pagination="pagination" v-model:global-filter="globalFilter" :pagination-options="{
        getPaginationRowModel: getPaginationRowModel()
    }" ref="table" :data="tableData" :empty="'No data found'" :columns="columns" class="w-full">
    </UTable>
    <div class="flex justify-end items-center border-t border-(--ui-border) pt-4">

        <UPagination :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
            :items-per-page="table?.tableApi?.getState().pagination.pageSize"
            :total="table?.tableApi?.getFilteredRowModel().rows.length"
            @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)" />
    </div>
</template>