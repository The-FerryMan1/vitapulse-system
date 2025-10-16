<script setup lang="ts">
const props = defineProps<{
    Data: {
        pulsePressure: number,
        map: number,
        diastolic: number,
        id: number,
        status: string,
        systolic: number,
        bpStatus: string,
        pulseStatus: string,
        pulse: number,
        message: string,
        timestamp: string,
        user_id: number

    }[]
}>();

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
        labels: props?.Data?.map(d => new Date(d.timestamp).toLocaleTimeString()),
        datasets: [
            {
                label: 'Pulse pressure(Pp)',
                data: props.Data.map(d => d.pulsePressure),
                borderColor: 'blue',
                backgroundColor: 'blue',
                tension: 0.4,
                fill: false,
            },
            {
                label: 'Mean Arterial Pressure(Map)',
                data: props.Data.map(d => d.map),
                borderColor: 'red',
                backgroundColor: 'red',
                tension: 0.4,
                fill: false,
            }
        ]
    }
})

const chartOptions = computed(() => {
    return {
        responsive: true,
        maintainAspectRatio: false
    }
})
</script>

<template>
    <Line id="my-chart-id" :options="chartOptions" :data="chartData" class="w-full h-[350px]" />
</template>
