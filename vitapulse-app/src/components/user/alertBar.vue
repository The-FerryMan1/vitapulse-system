<script setup lang="ts">
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import type { alerts } from '@/types/types'
import { computed } from 'vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps<{
    Data: alerts[]
}>()

// ✅ Group by Hour+Date (e.g., "Apr 22, 10 AM")
const groupedAlerts = computed(() => {
    const groups: Record<string, number> = {}

    props.Data.forEach((alert) => {
        const date = new Date(alert.timestamp)
        const label = date.toLocaleString(undefined, {
            hour: 'numeric',
            hour12: true,
            day: '2-digit',
            month: 'short',
        })

        groups[label] = (groups[label] || 0) + 1
    })

    return groups
})

const chartData = computed(() => ({
    labels: Object.keys(groupedAlerts.value),
    datasets: [
        {
            label: 'Alerts',
            data: Object.values(groupedAlerts.value),
            backgroundColor: 'rgba(248, 113, 113, 0.8)', // red-400
            borderRadius: 8,
            barPercentage: 0.6,
            categoryPercentage: 0.8,
        },
    ],
}))

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false, // 🧼 cleaner, unless you expect multiple datasets
        },
        tooltip: {
            callbacks: {
                label: (context: any) => `Alerts: ${context.parsed.y}`,
            },
        },
    },
    scales: {
        x: {
            ticks: {
                maxRotation: 45,
                minRotation: 30,
                font: {
                    size: 11,
                },
            },
            grid: {
                display: false,
            },
        },
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 1,
            },
        },
    },
}
</script>

<template>
    <div class="h-[300px] w-full bg-white dark:bg-gray-800 rounded-xl p-4 shadow dark:shadow-lg">
        <Bar :data="chartData" :options="chartOptions" />
    </div>
</template>
