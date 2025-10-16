<script setup lang="ts">
import defaultLayout from '@/layouts/defaultLayout.vue';
import { useUserStore } from '@/stores/useUser';
import { ref } from 'vue';

const {auth, sendVerificationCode, getUser} = useUserStore();
const isSent = ref(false);
const verify  = async()=>{
    let data = null
    try {
        data = await getUser()
    } catch (error) {
        console.log(error)
    }

    if (data){
        await sendVerificationCode(data?.email)
    }
     
}
</script>

<template>
    <defaultLayout>
        <!-- Verification Sent Message -->
        <div v-if="isSent" class="p-4 mb-4 bg-green-500 text-white text-center rounded-lg shadow-md">
            <p class="font-semibold">Verification Code Sent!</p>
        </div>

        <!-- Message displaying email to send the code to -->
        <div v-if="auth" class="mb-6 text-center">
            <p class="text-lg font-medium text-gray-800 dark:text-gray-200">
                Send a verification code to <span class="text-blue-500">{{ auth?.email }}</span>
            </p>
        </div>

        <!-- Button to trigger the verification -->
        <div v-if="auth" class="flex justify-center">
            <UButton @click="verify" size="lg" color="primary"
                class="text-white bg-blue-500 hover:bg-blue-600 transition duration-200 rounded-lg p-3">
                Click to Verify
            </UButton>
        </div>
    </defaultLayout>
</template>