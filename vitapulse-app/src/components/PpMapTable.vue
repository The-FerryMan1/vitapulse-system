<script setup lang="ts">
import { computed, ref } from 'vue';
import type { TableColumn } from '@nuxt/ui'
import { getPaginationRowModel } from '@tanstack/vue-table'
import { useTemplateRef } from 'vue';
import type { TableDate } from '@/types/types';
import Indicator from './Indicator.vue';


const props = defineProps<{
    Data: TableDate[]
}>();

const table = useTemplateRef('table');

const pagination = ref({
    pageIndex: 0,
    pageSize: 5
});

const globalFilter = ref('')

const columns = computed(() => {
    const columns: TableColumn<TableDate>[] = [
        {
            accessorKey: 'id',
            header: '#',
            cell: ({ row }) => `#${row.getValue('id')}`
        },
        {
            accessorKey: 'pulsePressure',
            header: 'Pulse pressure(Pp)',
            cell: ({ row }) => `${row.getValue('pulsePressure')}`
        },
        {
            accessorKey: 'ppStatus',
            header: 'Pulse pressure(Pp) Status',
            cell: ({ row }) => `${row.getValue('ppStatus')}`
        },
        {
            accessorKey: 'map',
            header: 'Mean Arterial Pressure(Map)',
            cell: ({ row }) => `${row.getValue('map')}`
        },
        {
            accessorKey: 'mapStatus',
            header: 'Mean Arterial Pressure(Map) Status',
            cell: ({ row }) => `${row.getValue('mapStatus')}`
        },
        {
            accessorKey: 'timestamp',
            header: 'Timestamp',
            cell: ({ row }) => {
                return new Date(row.getValue('timestamp')).toLocaleString('en-US', {
                    day: 'numeric',
                    month: "short",
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                })
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


    </div>


    <div>
        <div class="flex px-4 py-3.5  w-1/2 ">
            <UInput icon="i-lucide-search" v-model="globalFilter" class="w-full" placeholder="search..." />
        </div>
    </div>
    <Indicator />
    <UTable sticky v-model:pagination="pagination" v-model:global-filter="globalFilter" :pagination-options="{
        getPaginationRowModel: getPaginationRowModel()
    }" ref="table" :data="tableData" :empty="'No data found'" :columns="columns" class="w-full">

        <template #ppStatus-cell="{ row }">
            <div class="flex items-center gap-3">
                <p> {{ row.original.ppStatus }}</p>
                <UTooltip v-if="row.original.ppStatus === 'Low'" text="May indicate heart failure, blood loss
">
                    <UIcon name="i-lucide-circle-alert" class="size-5 text-amber-500 drop-shadow-2xl" />
                </UTooltip>
                <UTooltip v-else-if="row.original.ppStatus ==='High'"
                    text="Can indicate stiffness of arteries, hypertension, or other issues">
                    <UIcon name="i-lucide-triangle-alert" class="size-5 text-red-500 drop-shadow-2xl" />
                </UTooltip>
                <UTooltip v-else text="Normal in healthy people">
                    <UIcon name="i-lucide-circle-check" class="size-5 text-green-500 drop-shadow-2xl" />
                </UTooltip>


            </div>

        </template>
        <template #mapStatus-cell="{ row }">
            <div class="flex items-center gap-3">
                <p> {{ row.original.mapStatus }}</p>
                <UTooltip v-if="row.original.mapStatus === 'Low'" text="	May not be enough to perfuse vital organs">
                    <UIcon name="i-lucide-circle-alertt" class="size-5 text-amber-500 drop-shadow-2xl" />
                </UTooltip>
                <UTooltip v-else-if="row.original.mapStatus === 'High'"
                    text="May indicate hypertension or overperfusion">
                    <UIcon name="i-lucide-triangle-alert" class="size-5 text-red-500 drop-shadow-2xl" />
                </UTooltip>
                <UTooltip v-else text="Normal (optimal perfusion)">
                    <UIcon name="i-lucide-circle-check" class="size-5 text-green-500 drop-shadow-2xl" />
                </UTooltip>
            </div>

        </template>
    </UTable>

    <div class="flex justify-end items-center border-t border-(--ui-border) pt-4">

        <UPagination :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
            :items-per-page="table?.tableApi?.getState().pagination.pageSize"
            :total="table?.tableApi?.getFilteredRowModel().rows.length"
            @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)" />
    </div>
</template>