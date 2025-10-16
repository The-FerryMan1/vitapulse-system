<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import { computed, ref} from 'vue';

const computedItems = computed(() => {
    const items: NavigationMenuItem[] = [

        [

            {
                label: 'Sign up',
                icon: 'i-heroicons-outline:user-add',
                to: 'register',
                class: 'sm:text-base text-sm'
            },
            {
                label: 'Sign in',
                icon: 'i-heroicons-outline:user-circle',
                to: '/login',
                class: 'sm:text-base text-sm'
            },
        ]

    ]
    return items
})
const isOpen = ref(false);
</script>

<template>
    <UNavigationMenu arrow orientation="horizontal" content-orientation="vertical" color="error" :items="computedItems"
        class="ms-auto" />



    <UButton @click="isOpen = !isOpen" icon="i-lucide-menu" class="sm:hidden flex" />

    <Teleport defer to="#main">
        <div v-if="isOpen" class="w-full sm:hidden flex z-50 fixed shadow-lg p-3 rounded-b-lg bg-white">
            <UNavigationMenu arrow orientation="vertical" color="error" :items="computedItems"
                class="w-full md:hidden flex" />
        </div>
    </Teleport>
</template>