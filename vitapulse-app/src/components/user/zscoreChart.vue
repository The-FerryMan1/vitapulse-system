<script setup lang="ts">
import type { TableDate } from '@/types/types';
const props = defineProps<{
    Data: TableDate[]
}>();

import { Line } from 'vue-chartjs'
import type { ChartOptions, ScriptableContext, TooltipItem } from 'chart.js';
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
        labels: props?.Data?.map(d => new Date(d.timestamp).toLocaleTimeString()),
        datasets: [
            {
                label: 'Systolic z-score',
                data: props.Data.map(d => d.systolicZ),
                borderColor: 'blue',
                backgroundColor: 'blue',
                tension: 0.4,
                fill: false,
                borderWidth: 1
            },
            {
                label: 'Diastolic z-score',
                data: props.Data.map(d => d.diastolicZ),
                borderColor: 'red',
                backgroundColor: 'red',
                tension: 0.4,
                fill: false,
                borderWidth: 1
            }, {
                label: 'Pulse z-score',
                data: props.Data.map(d => d.pulseZ),
                borderColor: 'green',
                backgroundColor: 'green',
                tension: 0.4,
                fill: false,
                borderWidth: 1
            },
        ]
    }
})

const chartOptions = computed<ChartOptions<'line'>>(() => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            min: -3,
            max: 3,
            title: {
                display: true,
                text: 'Z-score',
                font: {
                    size: 14,
                    weight: 'bold'
                }
            },
            ticks: {
                stepSize: 1,
                color: '#6b7280', // Tailwind gray-500
                font: {
                    size: 12
                }
            },
            grid: {
                color: (ctx: { tick: { value: number } }) =>
                    ctx.tick.value === 2 || ctx.tick.value === -2
                        ? '#f87171' // Tailwind red-400
                        : '#e5e7eb' // Tailwind gray-200
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
                color: '#6b7280',
                font: {
                    size: 12
                }
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
                color: '#374151', // Tailwind gray-700
                font: {
                    size: 12
                }
            }
        },
        tooltip: {
            backgroundColor: '#111827', // Tailwind gray-900
            titleColor: '#f9fafb', // Tailwind gray-50
            bodyColor: '#f9fafb',
            borderColor: '#f87171',
            borderWidth: 1,
            callbacks: {
                label: (tooltipItem: TooltipItem<'line'>) => {
                    const value = tooltipItem.raw as number;
                    const isAbnormal = Math.abs(value) > 2;
                    return `${tooltipItem.dataset.label}: ${value.toFixed(2)}${isAbnormal ? ' 🚩' : ''}`;
                }
            }
        },
        title: {
            display: true,
            text: 'Z-score Monitoring',
            font: {
                size: 16,
                weight: 'bold'
            },
            color: '#111827',
            padding: {
                top: 10,
                bottom: 15
            }
        }
    }
}));
</script>

<template>
    <Line id="my-chart-id" :options="chartOptions" :data="chartData" class="w-full h-[350px]" />
</template>
