<script setup lang="ts">
import { getBpAndPulseByAge } from '@/utils/BpByAge';
import { computed, watch, ref } from 'vue';
const toast = useToast();


const props = defineProps<{
    bpAndPulse: {
        systolic: number,
        diastolic: number,
        pulse: number
        age: number,
    },
}>()

const alert = ref<string | null>(null)
const ab = computed(() => {
    const { bpStatus } = getBpAndPulseByAge(props?.bpAndPulse?.systolic, props?.bpAndPulse?.diastolic, props?.bpAndPulse?.pulse, props?.bpAndPulse?.age)
    return bpStatus
})

let lastSaved = Date.now();
const isOpen = ref<boolean>(false)

</script>

<template>
    <Teleport to="body">
        <UAlert @update:open="isOpen = !isOpen" v-if="['Hypertensive Crisis', 'Hypertension Stage 2', 'Hypertension Stage 1', 'Elevated'].includes(ab) && !isOpen"
            class="fixed top-0 z-50 w-full left-0" title="Abnormal Status detected" :description="ab" close
            color="error" variant="solid" :avatar="{
    src: '/src/assets/imgs/heart-rate.png'
            }" />
    </Teleport>
    <UCard class="w-full shadow-xl">
        <template #header>
            <div class=" flex items-center gap-3">
                <div class="bg-slate-100 backdrop-blur-md rounded-[8px] flex justify-center w-[65px] p-2">
                    <img v-once src="/src/assets/imgs/blood-pressure.png" alt="" class="w-[40px] object-contain">
                </div>

                <h2 class="text-lg font-semibold">Blood Pressure</h2>
            </div>
        </template>

        <div class="flex items-start justify-between gap-2 py-4">
            <div class="text-nowrap w-[200px]">
                <h1 class="text-slate-700 sm:text-6xl text-3xl lg:text-4xl font-semibold">{{ bpAndPulse.systolic }}
                    <span>/</span>
                    <span class="text-slate-700 text-3xl">{{ bpAndPulse.diastolic }}</span>
                    <small class="font-semibold sm:text-3xl text-xl text-slate-400"> mmHg</small>
                </h1>
            </div>
            <div>
                <img src="/src/assets/imgs/blood.png" class="sm:w-[120px] w-[90px] lg:w-[100px] animate-pulse object-contain" alt="">
            </div>

        </div>
        <template #footer>
            <div class="p-1.5 md:text-xl text-sm rounded-[6px] w-1/2  text-center text-white drop-shadow-xl transition-colors"
                :class="{
                    'bg-green-400': ab === 'Normal',
                    'bg-red-400': ['Hypertensive Crisis', 'Hypertension Stage 2', 'Hypertension Stage 1', 'Elevated'].includes(ab),
                    'bg-amber-400': ['Low', 'Low BP (Hypotension)'].includes(ab),
                    'bg-red-500': ['Error'].includes(ab)
                }">
                {{ ab }}</div>
        </template>
    </UCard>
</template>