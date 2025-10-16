<script setup lang="ts">
import userLayout from '@/layouts/userLayout.vue';
import FormGroupComp from '@/components/FormGroupComp.vue';
import errorMessage from '@/components/errorMessage.vue';
import { useAxios } from '@/axios/useAxios.ts';
import * as z from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';
import { reactive, ref, watch } from 'vue';
import defaultLayout from '@/layouts/defaultLayout.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const schema = z.object({
    name: z.string().min(6).max(255),
    email: z.string().email(),
    birthday: z.string().date(),
    sex: z.string(),
    contact: z.string().min(11).max(12),
    password: z.string().min(8),
    confirm: z.string().min(8),
    role: z.string().optional()
}).refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
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
    password: undefined,
    confirm: undefined,
    role: undefined,
})

watch(() => state.email, () => {
    errorMess.value = null

})

const toast = useToast()

const Submit = async (event: FormSubmitEvent<Schema>) => {
    try {
        isLoading.value = true

        await useAxios.post('/register', state, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        toast.add({ title: 'Success', description: 'User has been addded', color: 'success' },)
        router.go(0)
        return

    } catch (error) {
        errorMess.value = (error as errorType)?.response?.data?.message
        console.log(error)
    } finally {
        isLoading.value = false
        state.password = undefined
        state.confirm = undefined
    }


}
</script>

<template>
    <UForm :schema="schema" :state="state" @submit="Submit" class="w-full flex flex-col gap-3 !h-1/2 ">
        <errorMessage v-if="errorMess" :message="errorMess" />

        <FormGroupComp label="Name" name="name" required type="text" icon="i-lucide-circle-user"
            placeholder="Enter your Name" v-model="state.name" />

        <FormGroupComp label="Email" name="email" required type="email" icon="i-lucide-mail"
            placeholder="Enter your valid email" v-model="state.email" />

        <FormGroupComp label="Birthday" name="birthday" required type="date" icon="i-lucide-calendar"
            placeholder="Enter your Age" v-model="state.birthday" min="1" max="150" />

        <div class="w-full">
            <label for="" class="text-semibold">Sex <span class="text-red-500">*</span></label>
            <USelect icon="i-lucide-venus-and-mars" class="w-full" v-model="state.sex" :items="['Male', 'Female']" />
        </div>


        <FormGroupComp label="Contact" name="contact" required type="text" icon="i-lucide-contact"
            placeholder="Enter your contact number" v-model="state.contact" />


        <FormGroupComp label="Password" name="password" required type="password" icon="i-lucide-lock"
            placeholder="Enter your password" v-model="state.password" />

        <FormGroupComp label="Confirm Password" name="confirm" required type="password" icon="i-lucide-lock-keyhole"
            placeholder="Confirm your password" v-model="state.confirm" />

        <div class="w-full">
            <label for="" class="text-semibold">Role <span class="text-red-500">*</span></label>
            <USelect icon="i-lucide-square-user" class="w-full" v-model="state.role" :items="['general', 'admin']" />
        </div>

        <div class="flex items-center self-start gap-3 justify-end w-full">
            <div class="self-end">
                <UButton loading-icon="i-lucide-loader-circle" :disabled="isLoading" :loading="isLoading" type="submit"
                    icon="i-lucide-log-in" class="self-end md:text-base text-sm bg-red-500  w-full">
                    Add user</UButton>
            </div>
        </div>
    </UForm>
</template>