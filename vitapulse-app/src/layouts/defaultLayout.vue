<script setup lang="ts">
import HeadUlo from '@/components/HeadUlo.vue';
</script>

<template>
    <header
        class="sticky top-0 z-50 backdrop-blur-md bg-white dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-700">
        <UContainer>
            <HeadUlo />
        </UContainer>
    </header>

    <main
        class="h-[calc(100vh-64px)] overflow-y-auto bg-white relative dark:bg-gray-900 transition-colors duration-300">
        <slot />
    </main>
</template>