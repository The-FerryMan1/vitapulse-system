<script setup lang="ts" generic="T extends Object">
import { useUserStore } from '@/stores/useUser';
const { activiyLogs } = useUserStore();

const props = defineProps<{
    data: T[],
    name: string,
}>();


const exportCsv = async () => {
    const headers = Object.keys(props?.data[0]).join(",") + "\n";

    console.log(headers)
    const rows = props.data.map(row =>
        Object.values(row).join(",")
    ).join("\n");

    console.log(rows)

    const csvContent = headers + rows;

    // Create a Blob from the CSV
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Create a temporary link to trigger download
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `table-${props.name}.csv`);
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