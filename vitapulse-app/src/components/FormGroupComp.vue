<script setup lang="ts">


const model = defineModel<string | undefined | number>()
const {disable = false} = defineProps<{
    label: string,
    name: string,
    required: boolean,
    type: string,
    icon : string,
    placeholder: string,
    disable?: boolean
}>()
</script>

<template>
    <UFormField :label="label" :name="name" :required="required" class=" w-full">
        <UInput :type="type" :disabled="disable" :icon="icon" :placeholder="placeholder" v-model="model" size="xl"
            class="w-full" />
    </UFormField>
</template>