<script setup lang="ts">
import ErrorComp from '@/components/ErrorComp.vue';
import SkeletonLoader from '@/components/SkeletonLoader..vue';
import AdminLayout from '@/layouts/adminLayout.vue';
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { useAdminStore } from '@/stores/useAdmin';
import type {User} from '@/types/types';
const { getAllUser } = useAdminStore();

const asyncUserList = defineAsyncComponent({
    loader: () => import('@/components/admin/userList.vue'),
    loadingComponent: SkeletonLoader,
    delay: 200,
    errorComponent: ErrorComp,
    timeout: 3000
});

const users = ref<User[] | null>(null);


onMounted(async () => {
    users.value = await getAllUser();
})
</script>

<template>
    <AdminLayout>
        <UContainer>
            <h1 class="text-2xl font-semibold my-4">List of users</h1>
            <asyncUserList v-if="users !== null && users?.length > 0" :userList="users" />
        </UContainer>

    </AdminLayout>
</template>