<script setup lang="ts">
import type { TableDate } from '@/types/types'
import type { ChartOptions } from 'chart.js'
const props = defineProps<{
    Data: TableDate[]   
}>()

import { Line } from 'vue-chartjs'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { computed } from 'vue'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const chartData = computed(() => {
    return {
        labels: props.Data.map(d => new Date(d.timestamp).toLocaleTimeString()),
        datasets: [
            {
                label: 'Systolic',
                data: props.Data.map(d => d.systolic),
                borderColor: '#3b82f6', // Tailwind blue-500
                backgroundColor: '#3b82f6',
                tension: 0.4,
                fill: false,
                pointRadius: 2,
                borderWidth: 1
            },
            {
                label: 'Diastolic',
                data: props.Data.map(d => d.diastolic),
                borderColor: '#ef4444', // Tailwind red-500
                backgroundColor: '#ef4444',
                tension: 0.4,
                fill: false,
                pointRadius: 2,
                borderWidth: 1
            },
            {
                label: 'Pulse',
                data: props.Data.map(d => d.pulse),
                borderColor: '#22c55e', // Tailwind green-500
                backgroundColor: '#22c55e',
                tension: 0.4,
                fill: false,
                pointRadius: 2,
                borderWidth: 1
            }
        ]
    }
})

const chartOptions = computed<ChartOptions<'line'>>(() => {
    return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Measurement',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                },
                ticks: {
                    font: {
                        size: 12
                    },
                    color: '#6b7280'
                },
                grid: {
                    color: '#e5e7eb'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Time',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                },
                ticks: {
                    font: {
                        size: 12
                    },
                    color: '#6b7280'
                },
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#374151',
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                backgroundColor: '#111827',
                titleColor: '#f9fafb',
                bodyColor: '#f9fafb',
                borderColor: '#f87171',
                borderWidth: 1
            },
            title: {
                display: true,
                text: 'Blood pressure Overview',
                color: '#111827',
                font: {
                    size: 16,
                    weight: 'bold'
                },
                padding: {
                    top: 10,
                    bottom: 15
                }
            }
        }
    }
})
</script>

<template>
    <Line id="my-chart-id" :options="chartOptions" :data="chartData" class="w-full h-[350px]" />
</template>
