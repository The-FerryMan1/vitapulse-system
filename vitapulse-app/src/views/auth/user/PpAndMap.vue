<script setup lang="ts">
import SkeletonLoader from '@/components/SkeletonLoader..vue';
import ErrorComp from '@/components/ErrorComp.vue';
import userLayout from '@/layouts/userLayout.vue';
import { defineAsyncComponent, onMounted, ref, watch } from 'vue';
import { useBpStore } from '@/stores/UseBp';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/stores/useUser'
import ExportToCsv from '@/components/ExportToCsv.vue';
const router = useRouter();
const route = useRoute();
interface Data {
    pulsePressure: number,
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

const auth = useUserStore().auth;

const { getBp, getBpCustom, analyzeBpTrend } = useBpStore();


const AsyncFilterComp = defineAsyncComponent({
    loader: () => import('@/components/FilterDate.vue'),
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
    <userLayout>
        <h1 class="text-2xl mx-2 my-10 font-bold self-start">Pulse pressure and Mean Arterial Pressure</h1>
        <div class="flex gap-4 mt-3 px-3 items-end justify-start w-full">
            <ExportToCsv class="self-start me-auto" v-if="data?.length !== undefined && data?.length > 0  && auth?.id"
                :Data="data" :name='auth?.id' />
            <AsyncFilterComp v-model:filter="dateFilter" v-model:custom-from="customFrom" v-model:custom-to="customTo"
                class="self-end " />
            <UButton class="shadow-xl" label="Apply Filter" @click="submitFilter" />
        </div>
        <div class="w-full p-2">
            <AsyncPpMapChart v-if="data?.length !== undefined && data?.length > 0" :Data="data" />
            <div v-else>
                <p class="text-center">No data found</p>
            </div>
        </div>
        <div class="w-full p-2">
            <AsyncPpMapTable v-if="data?.length !== undefined && data?.length > 0" :Data="data" />
        </div>
    </userLayout>
</template>