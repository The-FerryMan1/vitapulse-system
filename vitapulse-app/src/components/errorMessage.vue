<script setup lang="ts">
defineProps<{
    message: string,
}>()
</script>

<template>
    <small class="p-2 shadow-sm w-full rounded-lg flex items-center gap-3 text-center text-sm text-red-600 font-semibold">
        <UIcon name="i-lucide-circle-alert" class="size-5"/>
        {{ message }}
    </small>
</template>