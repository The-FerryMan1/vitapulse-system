<script setup lang="ts">
import { computed, ref, h, resolveComponent, toRaw } from 'vue';
import type { TableColumn } from '@nuxt/ui'
import { getPaginationRowModel } from '@tanstack/vue-table'
import { useTemplateRef } from 'vue';
import type { alerts } from '@/types/types';
import { useAxios } from '@/axios/useAxios';
import { useRouter } from 'vue-router';



const router = useRouter()
const UCheckbox = resolveComponent('UCheckbox');


const props = defineProps<{
    Data: alerts[]
}>();

const table = useTemplateRef('table');
const globalFilter = ref('')
const pagination = ref({
    pageIndex: 0,
    pageSize: 5
});

const columns = computed(() => {
    const columns: TableColumn<alerts>[] = [
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


const alert_Datas = ref<alerts[]>(props.Data)
const deleteSelectedRow = async()=>{

    let data = [] as {id: number}[];

    table?.value?.tableApi?.getFilteredSelectedRowModel().rows.forEach(element => {
       data.push({id:toRaw(element.original.id)})
       
    });

    try {
        await  useAxios.post('/auth/alerts/delete', data)

        router.back();
    } catch (error) {
        console.error(error)
    }

}


const tableData = computed(() => {
    return alert_Datas.value
})
</script>

<template>
    <div>
        <div class="flex px-4 py-3.5  w-1/2 ">
            <UInput icon="i-lucide-search" v-model="globalFilter" class="w-full" placeholder="search..." />
        </div>  
    </div>

      <form @submit.prevent="deleteSelectedRow" class="flex justify-end items-center" v-if="table?.tableApi?.getFilteredSelectedRowModel().rows?.length > 0">
            
            <button class="p-2 bg-red-500 text-sm my-1 rounded-md">
                Delete selected row
            </button>
        </form>

        
     <div class="px-4 py-3.5 border-t border-accented text-sm text-muted">
        {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }} of
        {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} row(s) selected.
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