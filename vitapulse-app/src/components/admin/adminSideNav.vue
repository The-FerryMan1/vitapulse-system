<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { ref } from 'vue';

const items = ref<NavigationMenuItem[][]>([
    [
        {
            label:'Dashboard',
            icon: 'i-lucide-layout-dashboard',
            to: {name: 'admin'},
        },
        {
            label: 'Users',
            icon: 'i-lucide-user-round-cog',
            to: {name: 'users'}
        },
        {
            label: 'Admins',
            icon: 'i-lucide-shield-user',
            to: { name: 'admin-list'}
        },
        {
            label: 'Analytics',
            icon: 'i-lucide-chart-line',
            children: [
                {
                    label:'Historical',
                    icon: 'i-lucide-chart-line',
                    to: { name: 'historical-admin'}
                },
                {
                    label:'Z-score',
                    icon: 'i-lucide-chart-line',
                    to: { name: 'z-score-admin'}
                },
                
            ]
        },
        {
            label: 'Alerts',
            icon: 'i-lucide-siren',
            to: { name: 'alerts' }
        },
    ]
])
</script>

<template>
    <UNavigationMenu orientation="vertical" :items="items" class="data-[orientation=vertical]:w-48" />
</template>