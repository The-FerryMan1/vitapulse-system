

<script setup lang="ts" generic="T extends Logins">
import type {Logins} from '@/types/types';
import { computed, ref, watchEffect } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Filler, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Filler, Legend, LineElement, CategoryScale, LinearScale, PointElement);

// Props data passed from the parent (login stats)
const props = defineProps<{
    data: T[]
}>();

const logins = props?.data?.map((item) => item.logins)
const chartData = computed(()=>{
   
    return {
        labels: props?.data?.map((item)=> new Date(item.date).toLocaleDateString()), // Dates
        datasets: [
            {
                label: 'Logins',
                data: props?.data?.map((item)=> item.logins ), // Login counts
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    }
})

const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
        x: {
            title: {
                display: true,
                text: 'Date',
            },
        },
        y: {
            title: {
                display: true,
                text: 'Logins',
            },
            beginAtZero: true,
        },
    },
};

// Watch for prop changes to update the chart data
</script>

<template>
    <div>
        <h2 class="font-semibold text-lg">Logins per Day</h2>
        <Line :data="chartData" :options="chartOptions" />
        
    </div>
</template>

