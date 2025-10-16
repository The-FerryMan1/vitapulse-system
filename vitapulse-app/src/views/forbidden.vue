<script setup lang="ts">
// No script logic needed
</script>

<template>
    <div class="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center text-center px-4">
        <h1 class="text-6xl font-bold text-red-600 dark:text-red-500 mb-4 animate-pulse">403</h1>
        <p class="text-2xl md:text-3xl text-gray-800 dark:text-gray-200 mb-2">Access Forbidden</p>
        <p class="text-gray-500 dark:text-gray-400 mb-6">You don't have permission to view this page.</p>
        <NuxtLink to="/"
            class="inline-block px-6 py-3 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-300">
            Return Home
        </NuxtLink>
    </div>
</template>
