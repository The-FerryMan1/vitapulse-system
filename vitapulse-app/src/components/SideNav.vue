<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { summaryhealtReport } from '@/utils/pdfExport';
import { ref } from 'vue';
import { useUserStore } from '@/stores/useUser';

const { auth } = useUserStore();
const toast = useToast();
const userItems = ref<NavigationMenuItem[][]>([
    [
        {
            label: 'Dashboard',
            icon: 'i-lucide-layout-dashboard',
            to: { name: 'dashboard' },
        },
        {
            label: 'Analytics',
            icon: 'i-lucide-chart-bar',
            children: [
                {
                    label: 'Anomaly Detection',
                    icon: 'i-lucide-chart-line',
                    to: { name: 'anomaly' }
                },
            ]
        },
        {
            label: 'Alerts',
            icon: 'i-lucide-siren',
            to: { name: 'alerts' }
        },
        {
            label: 'Summary health report',
            icon: 'i-lucide-file-text',
            children: [
                {
                    label: 'Weekly report',
                    icon: 'i-lucide-arrow-down-from-line',
                    onClick: async () => {
                        if (!auth) return
                        const data = await summaryhealtReport('weekly', auth?.id)
                        if (data) {
                            toast.add({ title: 'Download success', description: 'Weekly health report', color: 'success' })
                        } else {
                            toast.add({ title: 'Download failed', description: 'No data to download', color: 'warning' })
                        }
                    }
                },
                {
                    label: 'Monthly report',
                    icon: 'i-lucide-arrow-down-from-line',
                    onClick: async () => {
                        if (!auth) return
                        const data = await summaryhealtReport('monthly', auth?.id)
                        if (data) {
                            toast.add({ title: 'Download success', description: 'Monthly health report', color: 'success' })
                        } else {
                            toast.add({ title: 'Download failed', description: 'No data to download', color: 'warning' })
                        }
                    }
                },
            ]
        },
        {
            label: 'Guidelines',
            icon: 'i-lucide-book-check',
            to: { name: 'guidelines' }
        },
        {
            label: 'Activity logs',
            icon: 'i-lucide-logs',
            to: { name: 'activiy-user' }
        },
    ]
])




const adminItems = ref<NavigationMenuItem[][]>([
    [
        {
            label: 'Dashboard',
            icon: 'i-lucide-layout-dashboard',
            to: { name: 'admin' },
        },
        {
            label: 'User',
            icon: 'i-lucide-user-round-cog',
            to: { name: 'users' }
        },
        {
            label: 'Admin',
            icon: 'i-lucide-shield-user',
            to: { name: 'admin-list' }
        },
        {
            label: 'Readings',
            icon: 'i-lucide-chart-line',
            children: [
                {
                    label: 'Historical',
                    icon: 'i-lucide-chart-line',
                    to: { name: 'historical-admin' }
                },
                {
                    label: 'Z-score',
                    icon: 'i-lucide-chart-line',
                    to: { name: 'z-score-admin' }
                },

            ]
        },
        {
            label: 'User alert',
            icon: 'i-lucide-siren',
            to: { name: 'users-alerts' }
        },
        {
            label: 'Guidelines',
            icon: 'i-lucide-book-check',
            to: { name: 'guidelines' }
        },
        {
            label: 'Activity logs',
            icon: 'i-lucide-logs',
            to: { name:'Activity-logs'}
        },
    ]
])
</script>

<template>


    <UCollapsible class="lg:hidden flex flex-col gap-2 sticky top-0 w-full shadow-sm bg-white dark:bg-gray-900">
        <UButton label="On this page" class="bg-white dark:bg-gray-900 shadow-sm" color="neutral" variant="subtle"
            trailing-icon="i-lucide-chevron-down" block />

        <template #content>
            <UNavigationMenu v-if="auth" orientation="vertical"
                :items="auth.role === 'general' ? userItems : adminItems"
                class="data-[orientation=vertical]:w-full lg:hidden flex py-4 bg-white dark:bg-gray-900" />
        </template>
    </UCollapsible>

    <UNavigationMenu v-if="auth" orientation="vertical" :items="auth.role === 'general' ? userItems : adminItems"
        class="data-[orientation=vertical]:w-full lg:flex hidden" />
</template>