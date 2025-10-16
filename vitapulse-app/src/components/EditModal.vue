<script setup lang="ts">
import FormGroupComp from '@/components/FormGroupComp.vue';
import errorMessage from '@/components/errorMessage.vue';
import { useAxios } from '@/axios/useAxios.ts';
import * as z from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const emit = defineEmits(['change'])
const props = defineProps<{
    data: { id:number, name:string, email:string, birthday:number, sex:string, contact:string, role:string }
}>();


const schema = z.object({
    name: z.string().min(6).max(255),
    email: z.string().email(),
    birthday: z.string().date(),
    sex: z.string(),
    contact: z.string().max(11), 
    role: z.string(),
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
    name: props?.data?.name,
    email: props?.data?.email,
    birthday: String(props?.data?.birthday),
    sex: props?.data?.sex,
    contact: props?.data?.contact,
    role: props?.data.role
})

const toast = useToast()

const Submit = async (event: FormSubmitEvent<Schema>) => {
    try {
        isLoading.value = true

        await useAxios.put(`/auth/admin/userManagement/update/${props?.data?.id}`, event.data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        toast.add({ title: 'Success', description: 'The information has been updated', color: 'success' },)
        emit('change')
        router.go(0)
        return

    } catch (error) {
        toast.add({ title: 'Failed', description: 'An error occured, please try again later', color: 'warning' },)
        errorMess.value = (error as errorType)?.response?.data?.message
        console.log(error)
    } finally {
        isLoading.value = false
    }


}
</script>

<template>

    <UForm :schema="schema" :state="state" @submit.prevent="Submit" class="w-full flex flex-col gap-3 z-50">
        <errorMessage v-if="errorMess" :message="errorMess" />

        <FormGroupComp label="Name" name="name" required type="text" icon="i-lucide-circle-user"
            placeholder="Enter your Name" v-model="state.name" />

        <FormGroupComp label="Email" name="email" required type="email" icon="i-lucide-mail"
            placeholder="Enter your valid email" :disable="true" v-model="state.email" />

        <FormGroupComp label="Birthday" name="birthday" required type="date" icon="i-lucide-calendar"
            placeholder="Enter your birthday" v-model="state.birthday" min="1" max="150" />

        <div class="w-full">
            <label for="" class="text-semibold">Sex <span class="text-red-500">*</span></label>
            <USelect icon="i-lucide-venus-and-mars" disabled class="w-full" v-model="state.sex"
                :items="['Male', 'Female']" />
        </div>


        <FormGroupComp label="Contact" name="contact" required type="text" icon="i-lucide-contact"
            placeholder="Enter your Age" v-model="state.contact" />

        <div class="w-full">
            <label for="" class="text-semibold">Role <span class="text-red-500">*</span></label>
            <USelect icon="i-lucide-square-user" placeholder="Select role" class="w-full" v-model="state.role" :items="['general', 'admin']" />
        </div>

        <div class="flex items-center self-start gap-3 justify-end w-full">
            <div class="self-end">
                <UButton loading-icon="i-lucide-loader-circle" :disabled="isLoading" :loading="isLoading" type="submit"
                    class="self-end md:text-base text-sm bg-red-500  w-full">
                    Save</UButton>
            </div>
        </div>


    </UForm>

</template>