<script setup lang="ts">
import { ref } from 'vue'
interface abnormalAnalysis{
    res:{
        highBp: number,
        lowBp: number,
        highPulse: number,
        lowPulse: number,
    }
   
}

const props = defineProps<{
    data: abnormalAnalysis,
}>();

</script>

<template>
    <div v-if="props?.data?.res" class="p-4 flex flex-col rounded-md w-full">
        <h2 class="font-bold mb-5 text-lg">Your Health Analysis:</h2>

        <!-- High Blood Pressure Section -->
        <p v-if="props.data.res.highBp > 0" class="text-red-600 flex gap-4 mb-2">
            <span class="font-bold">High Blood Pressure: </span>{{ props.data.res.highBp }} readings
            <span v-if="props.data.res.highBp > 10" class="text-red-500">- Please consult with a healthcare
                professional.</span>
        </p>

        <!-- Low Blood Pressure Section -->
        <p v-if="props.data.res.lowBp > 0" class="text-blue-600 flex gap-4">
            <span class="font-bold">Low Blood Pressure: </span>{{ props.data.res.lowBp }} readings
            <span v-if="props.data.res.lowBp > 5" class="text-red-500">- It may be a sign of an underlying
                condition.</span>
        </p>

        <!-- High Pulse Rate Section -->
        <p v-if="props.data.res.highPulse > 0" class="text-yellow-600">
            <span class="font-bold">High Pulse Rate: </span>{{ props.data.res.highPulse }} readings
            <span v-if="props.data.res.highPulse > 10" class="text-red-500">- May indicate stress or health risks.
                Please monitor closely.</span>
        </p>

        <!-- Low Pulse Rate Section -->
        <p v-if="props.data.res.lowPulse > 0" class="text-blue-600">
            <span class="font-bold">Low Pulse Rate: </span>{{ props.data.res.lowPulse }} readings
            <span v-if="props.data.res.lowPulse > 5" class="text-red-500">- May require medical attention if symptoms
                persist.</span>
        </p>

        <div v-if="props.data.res.highBp > 0 || props.data.res.lowBp > 0 || props.data.res.highPulse > 0 || props.data.res.lowPulse > 0"
            class="mt-4 p-3 bg-gray-100 shadow-lg rounded-md">
            <p class="font-bold text-gray-700 mb-2">What does this mean for you?</p>
            <p class="text-gray-600">
                Based on your recent readings, there might be some abnormal trends with your blood pressure or pulse
                rate. While occasional changes are common, if these trends persist or worsen, it could suggest an
                underlying condition like hypertension (high blood pressure) or hypotension (low blood pressure).
            </p>
            <p class="text-gray-600">
                We recommend you consult with a healthcare professional for further evaluation. Regular monitoring can
                help detect issues early and ensure appropriate steps are taken for your health.
            </p>
        </div>
    </div>
</template>