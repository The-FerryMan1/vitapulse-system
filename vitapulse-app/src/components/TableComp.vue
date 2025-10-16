<script setup lang="ts">
import { computed, ref, h, toRaw, resolveComponent } from 'vue';
import type { TableColumn } from '@nuxt/ui'
import { getPaginationRowModel } from '@tanstack/vue-table'
import { useTemplateRef } from 'vue';
import Indicator from './Indicator.vue';
import type {TableDate} from '@/types/types';
import {useAxios} from '@/axios/useAxios.ts';

const UBadge = resolveComponent('UBadge');
const UCheckbox = resolveComponent('UCheckbox');
const props = defineProps<{
    Data: TableDate[]
}>();

const table = useTemplateRef('table');
const pagination = ref({
    pageIndex: 0,
    pageSize: 5
});

const globalFilter = ref('')

const columns = computed(()=>{
    const columns: TableColumn<TableDate>[] = [
         {
    id: 'select',
    header: ({ table }) =>
      h(UCheckbox, {
        modelValue: table.getIsSomePageRowsSelected()
          ? 'indeterminate'
          : table.getIsAllPageRowsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
          table.toggleAllPageRowsSelected(!!value),
        'aria-label': 'Select all'
      }),
    cell: ({ row }) =>
      h(UCheckbox, {
        modelValue: row.getIsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
        'aria-label': 'Select row'
      })
  },
        {
            accessorKey: 'systolic',
            header: 'Systolic',
            cell: ({ row }) => `${row.getValue('systolic')}`
        },
        {
            accessorKey: 'diastolic',
            header: 'Diastolic',
            cell: ({ row }) => `${row.getValue('diastolic')}`
        },
        {
            accessorKey: 'bpStatus',
            header: 'Blood pressure status',
            cell: ({ row }) => `${row.getValue('bpStatus')}`
        },
        {
            accessorKey: 'clinicalBpLabel',
            header: 'Clinical BP label',
            cell: ({ row }) => `${row.getValue('clinicalBpLabel')}`
        },
        {
            accessorKey: 'pulse',
            header: 'Pulse',
            cell: ({ row }) => `${row.getValue('pulse')}`
        },
        {
            accessorKey: 'pulseStatus',
            header: 'Pulse status',
            cell: ({ row }) => `${row.getValue('pulseStatus')}`
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




const deleteSelectedRow = async()=>{

    let data = [] as {id: number}[];

    table?.value?.tableApi?.getFilteredSelectedRowModel().rows.forEach(element => {
       data.push({id:toRaw(element.original.id)})
    });

    try {
        await  useAxios.post('/auth/bp/delete', data)
    } catch (error) {
        console.error(error)
    }

}

const tableData = computed(()=>{
    return props?.Data
})



</script>

<template>
    <div>
        <div class="flex px-4 py-3.5  w-full ">
            <UInput icon="i-lucide-search" v-model="globalFilter" class="w-full" placeholder="search..." />
        </div>
    </div>
    <Indicator />
    

       
        <form @submit.prevent="deleteSelectedRow" class="flex justify-end items-center" v-if="table?.tableApi?.getFilteredSelectedRowModel().rows?.length > 0">
            
            <button class="p-2 bg-red-500 text-sm my-1 rounded-md">
                Delete selected row
            </button>
        </form>

        
     <div class="px-4 py-3.5 border-t border-accented text-sm text-muted">
        {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }} of
        {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} row(s) selected.
      </div>
    <UTable  sticky v-model:pagination="pagination" v-model:global-filter="globalFilter" :pagination-options="{
        getPaginationRowModel: getPaginationRowModel()
    }" ref="table" :data="Data" :empty="'No data found'" :columns="columns" class="w-full">
        
        
        
        <template #bpStatus-cell="{ row }">
            <div class="flex gap-3 items-center">
                <p>{{ row.original.bpStatus }}</p>
                <UTooltip
                   v-if="['Hypertensive Crisis', 'Hypertension Stage 2', 'Hypertension Stage 1', 'Elevated'].includes(row.original.bpStatus)"

                    text="High blood pressure">
                    <UIcon name="i-lucide-triangle-alert" class="size-5 text-red-500 drop-shadow-2xl" />
                </UTooltip>
                <UTooltip v-else-if="row.original.bpStatus === 'Normal'" text="Normal blood pressure">
                    <UIcon name="i-lucide-circle-check" class="size-5 text-green-500 drop-shadow-2xl" />
                </UTooltip>
                <UTooltip v-else text="Low blood pressure">
                    <UIcon name="i-lucide-circle-alert" class="size-5 text-amber-500 drop-shadow-2xl" />
                </UTooltip>

            </div>
        </template>


        <template #pulseStatus-cell="{ row }">
            <div class="flex gap-3 items-center">
                <p>{{ row.original.pulseStatus }}</p>
                <UTooltip v-if="row.original.pulseStatus === 'High'" text="High Pusle rate">
                    <UIcon name="i-lucide-triangle-alert" class="size-5 text-red-500 drop-shadow-2xl" />
                </UTooltip>
                <UTooltip v-else-if="row.original.pulseStatus  === 'Low'" text="Low Pusle rate">
                    <UIcon name="i-lucide-circle-alert" class="size-5 text-amber-500 drop-shadow-2xl" />
                </UTooltip>
                <UTooltip v-else text="Normal Pulse rate">
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