<script setup lang="ts">
import SkeletonLoader from './SkeletonLoader..vue';
import ErrorComp from './ErrorComp.vue';
import { defineAsyncComponent, onMounted, ref, shallowRef, watch } from 'vue';
import { useBpStore } from '@/stores/UseBp';
import { useRouter, useRoute } from 'vue-router';
import ExportToCsv from './ExportToCsv.vue';
const router = useRouter();
const route = useRoute();
interface Data {
    pulsePressure:number,
    map: number,
    mapStatus: string
    diastolic: number,
    id: number,
    status: string,
    systolic: number,
    bpStatus: string,
    pulseStatus: string,
    ppStatus: string,
    pulse: number,
    message: string,
    timestamp: string,
    user_id: number
};

const props = defineProps<{
    name: string
}>()

const { getBp, getBpCustom, analyzeBpTrend } = useBpStore();

const AsyncTableChart = defineAsyncComponent({
    loader: () => import('@/components/TableChart.vue'),
    loadingComponent: SkeletonLoader,
    delay: 200,
    errorComponent: ErrorComp,
    timeout: 3000,
});
const AsyncTableComp = defineAsyncComponent({
    loader: () => import('@/components/TableComp.vue'),
    loadingComponent: SkeletonLoader,
    delay: 200,
    errorComponent: ErrorComp,
    timeout: 3000,
});
const AsyncFilterComp = defineAsyncComponent({
    loader: () => import('./FilterDate.vue'),
    loadingComponent: SkeletonLoader,
    delay: 200,
    errorComponent: ErrorComp,
    timeout: 3000,
});
const AsyncAnalyzeComp = defineAsyncComponent({
    loader: () => import('@/components/Abnoymalitites.vue'),
    loadingComponent: SkeletonLoader,
    delay: 200,
    errorComponent: ErrorComp,
    timeout: 3000,
});
const AsyncPpMapTable = defineAsyncComponent({
    loader: () => import('@/components/PpMapTable.vue'),
    loadingComponent: SkeletonLoader,
    delay: 200,
    errorComponent: ErrorComp,
    timeout: 3000,
});
const AsyncPpMapChart = defineAsyncComponent({
    loader: () => import('@/components/PpMapCahrt.vue'),
    loadingComponent: SkeletonLoader,
    delay: 200,
    errorComponent: ErrorComp,
    timeout: 3000,
});


const dateFilter = ref<string | undefined>(route?.query?.filter?.toString() || 'daily');

const date = new Date();
const customTo = ref<Date>(date);
const customFrom = ref<Date>(date);

watch(dateFilter, async () => {
    if (dateFilter?.value !== 'custom') {
        router.replace({ query: { filter: dateFilter.value } })

    }

})




const data = ref<Data[] | null>(null);
const analyzeResult = ref();
watch(data, async () => {
    if (!data.value || data.value.length === 0) return
    analyzeResult.value = await analyzeBpTrend(data.value)
})

onMounted(async () => {
    if (dateFilter.value !== 'custom') {
        data.value = await getBp(route?.query?.filter?.toString());
    }

});


const submitFilter = async () => {


    if (dateFilter.value !== 'custom') {
        data.value = await getBp(route?.query?.filter?.toString());
        return
    }

    if (dateFilter.value === 'custom') {
       
        if (customFrom.value && customTo.value) {
           
            router.replace({ query: { filter: 'custom', from: new Date(customFrom.value).toISOString(), to: new Date(customTo.value).toISOString() } });
            await getBpCustom(customFrom.value.toISOString(), customTo.value.toISOString());
            return
        }
    }


};


</script>

<template>
    <div class=" backdrop-blur-lg flex flex-col w-full gap-3 items-center drop-shadow-sm rounded-xl">
    
    </div>
</template>