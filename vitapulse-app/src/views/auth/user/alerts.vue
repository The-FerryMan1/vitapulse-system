<script setup lang="ts">
import SkeletonLoader from '@/components/SkeletonLoader..vue';
import userLayout from '@/layouts/userLayout.vue';
import ErrorComp from '@/components/ErrorComp.vue';
import { defineAsyncComponent, onMounted, ref, shallowRef, watch } from 'vue';
import { useBpStore } from '@/stores/UseBp';
import { useUserStore } from '@/stores/useUser';
import { useRouter, useRoute } from 'vue-router';
import ExportToCsv from '@/components/ExportToCsv.vue';
import type { alerts } from '@/types/types';

const router = useRouter();
const route = useRoute();




const auth = useUserStore().auth;

const { getAlerts} = useBpStore();

const AsyncTableChart = defineAsyncComponent({
    loader: () => import('@/components/user/alertBar.vue'),
    loadingComponent: SkeletonLoader,
    delay: 200,
    errorComponent: ErrorComp,
    timeout: 3000,
});
const AsyncTableComp = defineAsyncComponent({
    loader: () => import('@/components/user/alertTable.vue'),
    loadingComponent: SkeletonLoader,
    delay: 200,
    errorComponent: ErrorComp,
    timeout: 3000,
});
const AsyncFilterComp = defineAsyncComponent({
    loader: () => import('@/components/FilterDate.vue'),
    loadingComponent: SkeletonLoader,
    delay: 200,
    errorComponent: ErrorComp,
    timeout: 3000,
});




const date = new Date();





const data = ref<alerts[] | null>(null);
onMounted(async () => {
    data.value = await getAlerts(route?.query?.filter?.toString());

});

</script>

<template>
    <userLayout>
        <h1 class="text-2xl mx-2 my-10 font-bold self-start">Alert history</h1>
        <div class="w-full p-2">
            <AsyncTableChart v-if="data?.length !== undefined && data?.length > 0" :Data="data" />
            <div v-else>
                <p class="text-center">No data found</p>
            </div>
        </div>
        <div class="w-full p-2">
            <AsyncTableComp v-if="data?.length !== undefined && data?.length > 0" :Data="data" />
        </div>
    </userLayout>
</template>