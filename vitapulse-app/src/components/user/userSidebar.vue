<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import {summaryhealtReport} from '@/utils/pdfExport';
import { ref } from 'vue';
import { useUserStore } from '@/stores/useUser';

const {auth} = useUserStore();
const toast = useToast();
const items = ref<NavigationMenuItem[][]>([
    [
        {
            label:'Dashboard',
            icon: 'i-lucide-layout-dashboard',
            to: {name: 'dashboard'},
        },
        {
            label: 'Analytics',
            icon: 'i-lucide-chart-bar',
            children: [
                // {
                //     label: 'Historical',
                //     icon: 'i-lucide-chart-line',
                //     to: {name: 'historical'}
                // },
                // {
                //     label: 'Pp & Map',
                //     icon: 'i-lucide-chart-line',
                //     to: {name: 'PpAndMap'}
                // },
                {
                    label: 'Anomaly Detection',
                    icon: 'i-lucide-chart-line',
                    to: {name:'anomaly'}
                },
            ]
        },
        {
            label: 'Alerts',
            icon: 'i-lucide-siren',
            to: {name: 'alerts'}
        },
        {
            label: 'Summary health report',
            icon: 'i-lucide-file-text',
            children: [
                {
                    label: 'Weekly report',
                    icon: 'i-lucide-arrow-down-from-line',
                    onClick: async ()=>{
                        if(!auth) return
                        const data = await summaryhealtReport('weekly', auth?.id)
                            if (data){
                                toast.add({ title: 'Download success', description: 'Weekly health report', color: 'success' })
                            }else{
                                toast.add({ title: 'Download failed', description: 'No data to download', color: 'warning' })
                            }
                    }
                }
            ]
        },
        {
            label: 'Activiy logs',
            icon: 'i-lucide-logs',
            to: { name: 'activiy-user'}
        },
        // {
        //     label: 'Devices',
        //     icon: 'i-lucide-monitor-smartphone'
        // },
    ]
])
</script>

<template>
    <div class="sm:flex hidden">
        <UNavigationMenu orientation="vertical" :items="items" class="data-[orientation=vertical]:w-52 hidden" />
    </div>


    <USlideover side="left" title="Slideover with side" class="md:hidden block">
        <UButton label="Open" color="neutral" variant="subtle" />

        <template #body>
            <Placeholder class="h-full min-h-48" />
        </template>
    </USlideover>
</template>