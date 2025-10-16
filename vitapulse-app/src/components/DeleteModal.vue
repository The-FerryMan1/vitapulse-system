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
    id: number
}>();


const schema = z.object({
    password: z.string().min(8)
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
   
    password: undefined,
})


const toast = useToast()

const Submit = async (event: FormSubmitEvent<Schema>) => {
    try {
        isLoading.value = true

        await useAxios.post(`/auth/admin/userManagement/delete/${props?.id}`, event.data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        toast.add({ title: 'Success', description: 'User deleted successfully', color: 'success' },)
        emit('change')
        router.push({ name: 'users' })
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

    <UForm :schema="schema" :state="state" @submit="Submit" class="w-full flex flex-col gap-3 z-50">
        <errorMessage v-if="errorMess" :message="errorMess" />

        <FormGroupComp label="Password" name="password" required type="password" icon="i-lucide-contact"
            placeholder="Confirm your password" v-model="state.password" />

        <div class="flex items-center self-start gap-3 justify-end w-full">
            <div class="self-end">
                <UButton loading-icon="i-lucide-loader-circle" :disabled="isLoading" :loading="isLoading" type="submit"
                    class="self-end md:text-base text-sm bg-red-500  w-full">
                    Confirm delete</UButton>
            </div>
        </div>


    </UForm>

</template>