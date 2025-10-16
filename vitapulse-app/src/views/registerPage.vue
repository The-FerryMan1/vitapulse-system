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
        toast.add({ title: 'Success', description: 'Registration completed!', color: 'success' },)

        router.push({ name: 'login' })
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
    <defaultLayout>
        <div
            class="flex justify-between items-center h-full w-full lg:bg-linear-90 bg-linear-65 from-white dark:from-slate-900 via-white dark:via-slate-900 to-red-600 transition-colors duration-300">
            <UForm :schema="schema" :state="state" @submit="Submit"
                class="lg:w-2/5 w-full lg:mx-30 justify-self-center h-[80%] overflow-y-auto p-6 flex flex-col gap-4 bg-white dark:bg-slate-800 rounded-lg dark:border dark:border-gray-700 transition-all duration-300">
                <div class="self-start text-3xl font-semibold gap-2 flex flex-col text-gray-900 dark:text-white">
                    <h1>Register.</h1>
                    <small class="text-lg font-light text-gray-600 dark:text-gray-300">Fill out the form.</small>
                </div>

                <errorMessage v-if="errorMess" :message="errorMess" />

                <FormGroupComp label="Name" name="name" required type="text" icon="i-lucide-circle-user"
                    placeholder="Enter your name" v-model="state.name" />

                <FormGroupComp label="Email" name="email" required type="email" icon="i-lucide-mail"
                    placeholder="Enter your email" v-model="state.email" />

                <FormGroupComp label="Birthday" name="birthday" required type="date" icon="i-lucide-calendar"
                    v-model="state.birthday" placeholder="Birthday" />

                <div class="w-full">
                    <label for="sex" class="text-gray-700 dark:text-gray-300 font-medium mb-1 block">
                        Sex <span class="text-red-500">*</span>
                    </label>
                    <USelect icon="i-lucide-venus-and-mars" class="w-full" v-model="state.sex"
                        :items="['Male', 'Female']" />
                </div>

                <FormGroupComp label="Contact" name="contact" required type="text" icon="i-lucide-contact"
                    placeholder="Enter your contact number" v-model="state.contact" />

                <FormGroupComp label="Password" name="password" required type="password" icon="i-lucide-lock"
                    placeholder="Enter your password" v-model="state.password" />

                <FormGroupComp label="Confirm Password" name="confirm" required type="password"
                    icon="i-lucide-lock-keyhole" placeholder="Confirm your password" v-model="state.confirm" />

                <div class="flex justify-end w-full">
                    <UButton loading-icon="i-lucide-loader-circle" :disabled="isLoading" :loading="isLoading"
                        type="submit" icon="i-lucide-log-in"
                        class="md:text-base text-sm bg-red-500 hover:bg-red-600 text-white w-full transition-all duration-300">
                        Submit
                    </UButton>
                </div>

                <div>
                    <ULink to="/login"
                        class="underline text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                        Already have an account?
                    </ULink>
                </div>
            </UForm>

            <!-- Right side illustration -->
            <div class="h-full relative lg:flex hidden">
                <img src="../assets/imgs/loginWallpaper.png" alt="Login wallpaper"
                    class="h-[90%] w-full z-10 object-contain rounded-md bg-transparent aspect-square" />
                <div class="absolute w-full h-full top-0 left-0 flex flex-col justify-start items-center p-5 ">
                    <h1 class="font-bold text-5xl p-5 text-shadow-2xs text-white text-center">
                        "Check your pressure before it checks you."
                    </h1>
                    <h1 class="font-bold text-3xl text-shadow-2xs p-5 mt-60 text-white">VitaPulse</h1>
                    <h1 class="font-bold text-2xl text-shadow-2xs px-5 text-center text-white">
                        Your health companion system — track your well-being
                    </h1>
                </div>
            </div>
        </div>
    </defaultLayout>
</template>
