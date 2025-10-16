<script setup lang="ts">
import ChangePass from './ChangePass.vue';
import settingsPage from './settingsPage.vue';
import DeleteAccount from './DeleteAccount.vue';
import UserLayout from '@/layouts/userLayout.vue';

</script>

<template>
    <UserLayout>
        <div class="flex flex-col ">
            <settingsPage />
            <ChangePass />
        </div>
    </UserLayout>
</template>