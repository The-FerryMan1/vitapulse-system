<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// Define props
const props = defineProps<{
    readings: {
        high: number,
        low: number,
        normal: number
    }
}>()

// Prepare chart data
const chartData = {
    labels: ['High', 'Low', 'Normal'],
    datasets: [
        {
            label: 'Number of Readings',
            data: [
                props.readings.high || 0,
                props.readings.low || 0,
                props.readings.normal || 0
            ],
            backgroundColor: ['#f87171', '#60a5fa', '#34d399']
        }
    ]
}

// Chart options
const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: 'Blood Pressure Status Distribution'
        }
    }
};
</script>

<template>
    <Bar :data="chartData" :options="chartOptions" class="h-[300px]" />
</template>
