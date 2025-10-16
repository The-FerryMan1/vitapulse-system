<script setup lang="ts">
import Skeleton from '@nuxt/ui/runtime/components/Skeleton.vue'
import { defineProps } from 'vue'
import { Pie } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement, // For Pie and Doughnut charts
} from 'chart.js'

// Register the necessary components for Pie chart
ChartJS.register(Title, Tooltip, Legend, ArcElement)

// Define props with typing
const props = defineProps<{
    data: Record<string, number>
}>()

// Prepare chart data
const chartData = {
    labels: Object.keys(props.data),
    datasets: [
        {
            label: 'Age Groups',
            data: Object.values(props.data),
            backgroundColor: ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#d0ed57'],
            borderWidth: 1
        }
    ]
}

// Prepare chart options
const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: {
            position: 'bottom' as const, // Ensuring the correct type
        },
        tooltip: {
            enabled: true
        }
    }
}
</script>


<template>

    <div>
        <h2 class="font-semibold text-lg">Age Distribution</h2>
        <Pie v-if="data" :data="chartData" :options="chartOptions" />
        <Skeleton v-else/>
    </div>
</template>