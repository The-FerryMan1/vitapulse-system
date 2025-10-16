<script setup lang="ts">
import { getBpAndPulseByAge } from '@/utils/BpByAge';
import { computed, watch, ref } from 'vue';
const toast = useToast();

const props = defineProps<{
    PulseRate: {
        age: number
        pulse_rate: number
    }
}>()

const pulse = computed(() => {

    if (props?.PulseRate.pulse_rate === 254 || props?.PulseRate.pulse_rate === 255 ){
        return 'Error';
    }


    if (props?.PulseRate.age <= 5) {
        if (props?.PulseRate.pulse_rate > 120) return 'High';
        if (props?.PulseRate.pulse_rate < 80) return 'Low';
    } else if (props?.PulseRate.age <= 12) {
        if (props?.PulseRate.pulse_rate > 110) return 'High';
        if (props?.PulseRate.pulse_rate < 70) return 'Low';
    } else if (props?.PulseRate.age <= 18) {
        if (props?.PulseRate.pulse_rate > 100) return 'High';
        if (props?.PulseRate.pulse_rate < 60) return 'Low';
    } else if (props?.PulseRate.age <= 40) {
        if (props?.PulseRate.pulse_rate > 100) return 'High';
        if (props?.PulseRate.pulse_rate < 60) return 'Low';
    } else if (props?.PulseRate.age <= 60) {
        if (props?.PulseRate.pulse_rate > 95) return 'High';
        if (props?.PulseRate.pulse_rate < 60) return 'Low';
    } else {
        if (props?.PulseRate.pulse_rate > 90) return 'High';
        if (props?.PulseRate.pulse_rate < 55) return 'Low';
    }

    return 'Normal';
})

watch(pulse, () => {
    if (pulse.value) {
        if (pulse.value === "High") {
            toast.add({ title: 'Warning', description: 'High Pulse rate detected', color: 'error'})
        }

        if (pulse.value === "Low") {
            toast.add({ title: 'Warning', description: 'High Pulse rate  detected', color: 'warning' })
        }
    }


})


</script>

<template>
    <UCard class="w-full shadow-xl">
        <template #header>
            <div class=" flex items-center gap-3">
                <div class="bg-slate-100 backdrop-blur-md rounded-[8px] flex justify-center w-[65px] p-2">
                    <img v-once src="/src/assets/imgs/heart-rate.png" alt="" class="w-[40px] object-contain">
                </div>

                <h2 class="text-lg font-semibold">Pulse Rate</h2>
            </div>
        </template>

        <div class="flex items-start justify-between gap-2 py-4">
            <div class="text-nowrap w-[200px]">
                <h1 class="text-slate-700 text-6xl font-semibold">{{ PulseRate.pulse_rate }}
                    <small class="font-semibold sm:text-3xl text-xl text-slate-400">bpm</small>
                </h1>
            </div>
            <div>
                <img src="/src/assets/imgs/heart.png" class="sm:w-[120px] w-[90px] lg:w-[100px] animate-pulse object-contain" alt="">
            </div>
        </div>
        <template #footer>
            <div class="p-1.5 md:text-xl text-sm rounded-[6px] w-1/2  text-center text-white drop-shadow-xl transition-colors"
                :class="{ 'bg-green-400': pulse === 'Normal', 'bg-red-500': pulse === 'High'|| pulse ==='Error', 'bg-amber-400': pulse === 'Low', }">
                {{ pulse }}</div>
        </template>
    </UCard>
</template>