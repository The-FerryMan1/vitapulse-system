<script setup lang="ts" generic="T extends Counts">
import type { Counts } from '@/types/types';
import { inject } from 'vue';
// const props = defineProps<{
//     data: T
// }>();

const count: any = inject('data')
</script>

<template>
    <div v-if="count" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
        <!-- Card 1 -->
        <div v-memo="[count.userCount]"
            class="h-40 flex flex-col justify-between bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md">
            <div class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <UIcon name="i-lucide-users" class="size-8 text-blue-500" />
                <h2 class="text-lg font-semibold">Total Users</h2>
            </div>
            <h1 v-if="count.userCount" class="text-4xl font-bold text-gray-900 dark:text-gray-100">{{ count.userCount }}
            </h1>
            <h1 v-else class="text-4xl animate-pulse text-gray-500 dark:text-gray-400">....Loading</h1>
        </div>

        <!-- Card 2 -->
        <div v-memo="[count.alertCount]"
            class="h-40 flex flex-col justify-between bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md">
            <div class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <UIcon name="i-lucide-triangle-alert" class="size-8 text-red-500" />
                <h2 class="text-lg font-semibold">Total alert sent</h2>
            </div>
            <h1 v-if="count.alertCount > 0" class="text-4xl font-bold text-gray-900 dark:text-gray-100">{{ count.alertCount
                }}</h1>
            <h1 v-else-if="count.alertCount < 1">No data found</h1>
            <h1 v-else class="text-4xl animate-pulse text-gray-500 dark:text-gray-400">....Loading</h1>
        </div>

        <!-- Card 3 -->
        <div v-memo="[count.statusCount]"
            class="h-40 flex flex-col justify-between bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md">
            <div class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <UIcon name="i-lucide-activity" class="size-8 text-green-500" />
                <h2 class="text-lg font-semibold">Total active users</h2>
            </div>
            <h1 v-if="count.statusCount" class="text-4xl font-bold text-gray-900 dark:text-gray-100">{{
                count.statusCount}}</h1>
            <h1 v-else class="text-4xl animate-pulse text-gray-500 dark:text-gray-400">....Loading</h1>
        </div>
    </div>
</template>
