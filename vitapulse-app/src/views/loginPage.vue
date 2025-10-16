<script setup lang="ts">
import userLayout from '@/layouts/userLayout.vue';
import FormGroupComp from '@/components/FormGroupComp.vue';
import errorMessage from '@/components/errorMessage.vue';
import {useAxios} from '@/axios/useAxios.ts';
import defaultLayout from '@/layouts/defaultLayout.vue'
import * as z from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';
import { reactive, ref, watch } from 'vue';
import { useUserStore } from '@/stores/useUser';
import { useRouter } from 'vue-router';

const {verify} = useUserStore();
const router = useRouter();

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

interface errorType{
    response: {
        data:{
            message: string
        }
    }
} 

type Schema = z.infer<typeof schema>

const isLoading = ref<boolean>(false)
const errorMess = ref<string | null>(null);
const state = reactive<Partial<Schema>>({
    email: undefined,
    password: undefined
})

watch(()=>state.email,  ()=>{
    errorMess.value = null
   
})

const toast = useToast()

const Submit = async(event:FormSubmitEvent<Schema>)=>{
    try {
        isLoading.value = true
        
       const {status} =  await useAxios.post('/login', {email:event.data.email, password:event.data.password}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(status !== 200) throw new Error('invalid credentials');
        toast.add({ title: 'Success', description: 'Welcome back!', color: 'success' })
           
        await verify();
        router.push({ name: 'dashboard' })
    
       
        return 
       
    } catch (error) {
        errorMess.value = (error as errorType)?.response?.data?.message
        toast.add({ title: 'Warning', description: 'Invalid credentials', color: 'warning' })
        console.log(error)
    }finally{
        isLoading.value = false
        state.password = undefined
    }
   
    
}
</script>

<template>
    <defaultLayout>
        <div
            class="flex justify-between items-center h-full w-full lg:bg-linear-90 bg-linear-65 from-white dark:from-slate-900 via-white dark:via-slate-900 to-red-600 transition-colors duration-300">
            <UForm :schema="schema" :state="state" @submit="Submit"
                class="lg:w-2/5 w-full lg:mx-30 justify-self-center flex flex-col justify-center items-center space-y-6 p-10 bg-white dark:bg-slate-800 rounded-[8px] dark:border dark:border-gray-700 transition-all duration-300">
                <div class="self-start text-3xl font-semibold gap-2 flex flex-col text-gray-900 dark:text-white">
                    <h1>Login.</h1>
                    <small class="text-lg font-light text-gray-600 dark:text-gray-300">Welcome back!</small>
                </div>

                <errorMessage v-if="errorMess" :message="errorMess" />

                <FormGroupComp label="Email" name="email" required type="email" icon="i-lucide-mail"
                    placeholder="Enter your email" v-model="state.email" />

                <FormGroupComp label="Password" name="password" required type="password" icon="i-lucide-key-round"
                    placeholder="*******" v-model="state.password" />

                <div class="flex items-center self-start gap-3 justify-between w-full text-gray-700 dark:text-gray-300">
                    <div class="flex items-center gap-3">
                        <label for="remember" class="md:text-base text-sm">Remember me</label>
                        <UCheckbox />
                    </div>

                    <div>
                        <UButton loading-icon="i-lucide-loader-circle" :disabled="isLoading" :loading="isLoading"
                            type="submit" icon="i-lucide-log-in"
                            class="md:text-base text-sm bg-red-500 hover:bg-red-600 text-white w-full transition-all duration-300">
                            Sign in
                        </UButton>
                    </div>
                </div>

                <div class="flex justify-between w-full flex-row-reverse">
                    <ULink href="/register"
                        class="underline text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">
                        Create Account?
                    </ULink>
                    <ULink href="/reset-password"
                        class="underline text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-blue-300 transition-colors duration-200">
                        Forgot password?
                    </ULink>

                </div>
            </UForm>

            <!-- Right-side image and overlay content -->
            <div class="h-full relative lg:flex hidden">
                <img src="../assets/imgs/loginWallpaper.png" alt="Login wallpaper"
                    class="h-[90%] w-full z-10 object-contain rounded-md bg-transparent aspect-square" />
                <div class="absolute w-full h-full top-0 left-0 flex flex-col justify-start items-center p-5
                    ">
                    <h1 class="font-bold text-5xl p-5 text-shadow-2xs text-white text-center">
                        "Check your pressure before it checks you."
                    </h1>
                    <h1 class="font-bold text-3xl p-5 text-shadow-2xs mt-60 text-white">VitaPulse</h1>
                    <h1 class="font-bold text-2xl px-5 text-shadow-2xs text-center text-white">
                        Your health companion system — track your well-being
                    </h1>
                </div>
            </div>
        </div>
    </defaultLayout>
</template>
