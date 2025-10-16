<script setup lang="ts">
const props = defineProps<{
    bp:{
        systolic: number | null,
        diastolic: number | null,
    }
}>()
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { computed } from 'vue';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = computed(()=>{
    return {
        datasets: [
            {
                label: 'Systolic',
                data: [props.bp.systolic],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Diastolic',
                data: [props.bp.diastolic],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    }
}) 
</script>

<template>
    <div v-if="props.bp" class="w-full h-[300px] bg-white rounded-[8px] shadow-md p-4">
        <Bar :data="chartData" :options="{ responsive: true, maintainAspectRatio: false }"/>
    </div>
</template>