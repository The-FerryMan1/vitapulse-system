<script setup lang="ts">
import Guidelines from '@/components/Guidelines.vue';
import adminLayout from '@/layouts/adminLayout.vue';
</script>

<template>
    <adminLayout>
        <div>
            <h1 class="font-semibold text-2xl p-2">Blood pressure guidelines (AHA)</h1>
            <Guidelines />
        </div>
    </adminLayout>
</template>