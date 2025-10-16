<script setup lang="ts" generic="T extends Abnormal">
import type { Abnormal } from '@/types/types';
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title,
    Filler,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Filler, Legend, LineElement, CategoryScale, LinearScale, PointElement);

// Props
const props = defineProps<{ data: T[] }>();

// Format date to 'YYYY-MM-DD'
function formatDate(dateStr: string) {
    return new Date(dateStr).toISOString().split('T')[0];
}

// Group data by date and status
const groupedData = computed(() => {
    const map = new Map<string, Record<string, number>>();
    const statusSet = new Set<string>();

    for (const item of props.data) {
        const date = formatDate(item.timestamp);
        const status = item.bpStatus;
        statusSet.add(status);

        if (!map.has(date)) {
            map.set(date, {});
        }

        const dateGroup = map.get(date)!;
        dateGroup[status] = (dateGroup[status] || 0) + 1;
    }

    const dates = Array.from(map.keys()).sort();
    const statuses = Array.from(statusSet);

    const datasets = statuses.map((status) => {
        return {
            label: status,
            data: dates.map((date) => map.get(date)?.[status] || 0),
            borderColor: getRandomColor(),
            backgroundColor: 'transparent',
            fill: false,
        };
    });

    return {
        labels: dates,
        datasets,
    };
});

// Random color generator
function getRandomColor() {
    const r = Math.floor(Math.random() * 200);
    const g = Math.floor(Math.random() * 200);
    const b = Math.floor(Math.random() * 200);
    return `rgb(${r}, ${g}, ${b})`;
}

// Chart options
const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
        x: {
            title: { display: true, text: 'Date' },
        },
        y: {
            title: { display: true, text: 'Count' },
            beginAtZero: true,
        },
    },
};
</script>

<template>
    <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
        <h2 class="font-semibold text-lg text-gray-800 dark:text-white">Abnormal BP Status Trends</h2>
        <Line :data="groupedData" :options="chartOptions" />
    </div>
</template>
