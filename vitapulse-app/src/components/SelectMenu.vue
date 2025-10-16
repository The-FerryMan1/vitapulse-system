<script setup lang="ts" generic="T extends User">
import type {User} from'@/types/types';
import { computed, ref } from 'vue';
const props = defineProps<{
    data: T[],
}>()
const value = defineModel<number>();


const userNames = computed(()=>{
    return props.data.map(item => ({id: item.id, label:item.name}));
})

</script>

<template>
    <USelectMenu v-model="value" value-key="id" :items="[...userNames, {id: 0, label:'Select user'}]" class="w-48" />
</template>
