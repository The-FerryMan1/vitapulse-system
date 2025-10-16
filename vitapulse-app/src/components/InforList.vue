<script setup lang="ts">
import type {User} from '@/types/types';

defineProps<{auth: User}>()
</script>

<template>
    <ul class="flex gap-5 flex-wrap">
        <!-- Name -->
        <li class="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md flex items-center gap-3 dark:text-white">
            <UIcon name="i-lucide-circle-user" class="size-5" mode="svg" />
            <p>Name:</p>
            {{ auth.name }}
        </li>
        
        <!-- Sex -->
        <li class="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md flex items-center gap-3 dark:text-white">
            <UIcon name="i-lucide-venus-and-mars" class="size-5" mode="svg" />
            <p>Sex:</p>
            {{ auth.sex }}
        </li>

        <!-- Birthday -->
        <li class="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md flex items-center gap-3 dark:text-white">
            <UIcon name="i-lucide-calendar" class="size-5" mode="svg" />
            <p>Birthday:</p>
            {{ auth.birthday }}
        </li>

        <!-- Contact -->
        <li class="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md flex items-center gap-3 dark:text-white">
            <UIcon name="i-lucide-phone" class="size-5" mode="svg" />
            <p>Contact:</p>
            {{ auth.contact }}
        </li>
    </ul>
</template>
