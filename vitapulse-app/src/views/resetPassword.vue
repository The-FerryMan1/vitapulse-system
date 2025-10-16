<script setup lang="ts">
import defaultLayout from '@/layouts/defaultLayout.vue';
import { useUserStore } from '@/stores/useUser';
import { reactive, ref } from 'vue';
import type { FormSubmitEvent } from '@nuxt/ui';
import { z } from 'zod';
import { useAxios } from '@/axios/useAxios';




const toast = useToast()
const { auth, sendResetCode, getUser } = useUserStore();
const isSent = ref(false);
interface errorType {
    response: {
        data: {
            message: string
        }
    }
}
const isLoading = ref<boolean>(false)
const errorMess = ref<string | null>(null);


const schema = z.object({
   email: z.string().email()
});

type Schema = z.infer<typeof schema>
const state = reactive<Partial<Schema>>({
    email: undefined,
})

const Submit = async (event: FormSubmitEvent<Schema>) => {
    try {
        await sendResetCode(event.data.email)
        toast.add({title: 'Passoword Reset', description: 'Password Reset sent', color:'success'})
        isSent.value = true
    } catch (error) {
        console.log(error)
        toast.add({ title: 'Passoword Reset', description: 'Password Reset failed', color: 'warning' })
    }
}


const resend = async(email:string)=>{

    try {
        await useAxios.post('/password-reset/resend-request', { email }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        toast.add({ title: 'Passoword Reset', description: 'Password Reset sent', color: 'success' })
        isSent.value = true
    } catch (error) {
        console.log(error)
        toast.add({ title: 'Passoword Reset', description: 'Password Reset failed', color: 'warning' })
    }
}
</script>

<template>
    <defaultLayout>
    <UContainer>
        <UForm :schema="schema" :state="state" @submit="Submit"
            class="md:w-full flex flex-col mt-10  w-full overflow-y-auto justify-center items-center space-y-6 p-10 dark:bg-slate-800 bg-white shadow-2xl  rounded-[8px] dark:border dark:border-gray-500">
            <div class="self-start text-4xl font-semibold gap-2 flex flex-col">
                <h1 class="">Reset Password.</h1>
            </div>
            <errorMessage v-if="errorMess" :message="errorMess" />

            <FormGroupComp label="Email" name="email" required type="email" icon="i-lucide-mail"
                placeholder="Enter your email" v-model="state.email" />

            <small v-if="isSent && state.email" class="self-start text-base">Request sent! <UButton @click="resend(state.email)" type="button" variant="link" class="underline">resend request</UButton></small>

            <div class="flex items-center self-start gap-3 justify-end w-full">
                <div class="self-end">
                    <UButton loading-icon="i-lucide-loader-circle" :disabled="isLoading" :loading="isLoading"
                        type="submit" class="self-end md:text-base text-sm bg-red-500  w-full">
                        Send reset request</UButton>
                </div>
            </div>


        </UForm>
        </UContainer>
    </defaultLayout>
</template>