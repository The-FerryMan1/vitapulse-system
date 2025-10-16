<script setup lang="ts">
import type {TableDate} from '@/types/types';
import { useUserStore } from '@/stores/useUser';

const {activiyLogs} = useUserStore();
const props = defineProps<{
    Data: TableDate[],
    name:string | number
}>();

const exportCsv = async() =>{
    const headers = Object.keys(props?.Data[0]).join(",") + "\n";

    const rows = props.Data.map(row =>
        Object.values(row).join(",")
    ).join("\n");


    const csvContent = headers + rows;

    // Create a Blob from the CSV
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Create a temporary link to trigger download
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Userid-${props.name}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
   await activiyLogs('Export data as CSV')
}


</script>

<template>
    <div class="flex gap-3 items-center">
        <label for="" class="font-semibold ">Export as CSV</label>
        <UButton @click="exportCsv" icon="i-lucide-download" />
    </div>

</template>