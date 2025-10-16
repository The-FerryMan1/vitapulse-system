<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/useUser';

const {verifyToken,userLogout} = useUserStore();
const route = useRoute();
const router = useRouter();
const token = route.params.token;
const isVerified = ref(false);

const toast = useToast();
onMounted(async () => {

    setTimeout(async()=>{
        if (token) {
            isVerified.value = await verifyToken(token),
                toast.add({title:'Verification', description:'Verification Complete, please login again', color:'success'})
            await userLogout()
            router.push({name: 'login'})
        }
    }, 2000)
    
   
})
</script>

<template>
    
    <div v-if="isVerified">Verification complete</div>
</template>