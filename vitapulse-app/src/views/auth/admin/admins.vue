<script setup lang="ts">
import ErrorComp from '@/components/ErrorComp.vue';
import SkeletonLoader from '@/components/SkeletonLoader..vue';
import AdminLayout from '@/layouts/adminLayout.vue';
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { useAdminStore } from '@/stores/useAdmin';
import type { User } from '@/types/types';
import { useAxios } from '@/axios/useAxios';
const { getAllUser } = useAdminStore();

const asyncAdminList = defineAsyncComponent({
    loader: () => import('@/components/admin/adminList.vue'),
    loadingComponent: SkeletonLoader,
    delay: 200,
    errorComponent: ErrorComp,
    timeout: 3000
});

const admins = ref<User[] | null>(null);


onMounted(async () => {
    const { data } = await useAxios.get('/auth/admin/users/admin-list');

    admins.value = data;
})
</script>

<template>
    <AdminLayout>
        <UContainer>
            <h1 class="text-2xl font-semibold my-4">List of admins</h1>
            <asyncAdminList v-if="admins !== null && admins?.length > 0" :userList="admins" />
        </UContainer>

    </AdminLayout>
</template>