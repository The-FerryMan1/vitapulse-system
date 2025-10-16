<script setup lang="ts">
import FormGroupComp from '@/components/FormGroupComp.vue';
import errorMessage from '@/components/errorMessage.vue';
import { useAxios } from '@/axios/useAxios.ts';
import * as z from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';
import { onMounted, reactive, ref, watch } from 'vue';
import {useUserStore} from '@/stores/useUser';
import { useRouter } from 'vue-router';

const router = useRouter();
const {getUser} = useUserStore();



const schema = z.object({
    name: z.string().min(6).max(255),
    email: z.string().email(),
    birthday: z.string().date(),
    sex: z.string(),
    contact: z.string().max(11),  
});

interface errorType {
    response: {
        data: {
            message: string
        }
    }
}

type Schema = z.infer<typeof schema>

const isLoading = ref<boolean>(false)
const errorMess = ref<string | null>(null);
const state = reactive<Partial<Schema>>({
    name: undefined,
    email: undefined,
    birthday: undefined,
    sex: undefined,
    contact: undefined,
})

watch(() => state.email, () => {
    errorMess.value = null

})

onMounted(async()=>{
    const data = await getUser();
    state.name = data?.name
    state.email = data?.email
    state.birthday = data?.birthday
    state.sex = data?.sex
    state.contact = data?.contact

})

const toast = useToast()

const Submit = async (event: FormSubmitEvent<Schema>) => {
    try {
        isLoading.value = true

        await useAxios.put('/auth/user', state, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        toast.add({ title: 'Success', description: 'The information has been updated', color: 'success' },)

        router.push({ name: 'settings' })
        return

    } catch (error) {
        errorMess.value = (error as errorType)?.response?.data?.message
        console.log(error)
    } finally {
        isLoading.value = false
    }


}
</script>

<template>
    <UContainer class="flex justify-start items-start  w-full">
        <UForm :schema="schema" :state="state" @submit="Submit"
            class="md:w-full flex flex-col mt-10  w-full overflow-y-auto justify-center items-center space-y-6 p-10 dark:bg-slate-800 bg-white shadow-2xl  rounded-[8px] dark:border dark:border-gray-500">
            <div class="self-start text-4xl font-semibold gap-2 flex flex-col">
                <h1 class="">Account Settings.</h1>
                <small class="text-lg font-light">Change Information</small>
            </div>
            <errorMessage v-if="errorMess" :message="errorMess" />

            <FormGroupComp label="Name" name="name" required type="text" icon="i-lucide-circle-user"
                placeholder="Enter your Name" v-model="state.name" />

            <FormGroupComp label="Email" name="email" required type="email" icon="i-lucide-mail"
                placeholder="Enter your valid email" :disable="true" v-model="state.email" />

            <FormGroupComp label="Birthday" name="birthday" required type="date" icon="i-lucide-calendar"
                placeholder="Enter your birthday" v-model="state.birthday" min="1" max="150" />

            <div class="w-full">
                <label for="" class="text-semibold">Sex <span class="text-red-500">*</span></label>
                <USelect icon="i-lucide-venus-and-mars" class="w-full" v-model="state.sex"
                    :items="['Male', 'Female']" />
            </div>


            <FormGroupComp label="Contact" name="contact" required type="text" icon="i-lucide-contact"
                placeholder="Enter your Age" v-model="state.contact" />

            <div class="flex items-center self-start gap-3 justify-end w-full">
                <div class="self-end">
                    <UButton loading-icon="i-lucide-loader-circle" :disabled="isLoading" :loading="isLoading"
                        type="submit" class="self-end md:text-base text-sm bg-red-500  w-full">
                        Save</UButton>
                </div>
            </div>


        </UForm>
    </UContainer>
</template>