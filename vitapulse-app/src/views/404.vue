<script setup lang="ts">

</script>

<template>
    <div class="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center text-center px-4">
        <h1 class="text-6xl font-bold text-gray-900 dark:text-white mb-4 animate-bounce">404</h1>
        <p class="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-2">Oops! Page not found.</p>
        <p class="text-gray-500 dark:text-gray-400 mb-6">The page you're looking for doesn't exist or has been moved.
        </p>
        <NuxtLink to="/"
            class="inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300">
            Go Home
        </NuxtLink>
    </div>
</template>
