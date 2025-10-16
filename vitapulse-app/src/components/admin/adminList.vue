<script setup lang="ts">
import { computed, useTemplateRef, ref, h, resolveComponent } from 'vue';
import type { TableColumn } from '@nuxt/ui';
import type { Row } from '@tanstack/vue-table';
import { getPaginationRowModel } from '@tanstack/vue-table';
import type { User } from '@/types/types';
import { getTheAge } from '@/utils/getTheAge';
import RegisterModal from '../RegisterModal.vue';
import { summaryhealtReport } from '@/utils/pdfExport';
import { exportCsv } from '@/utils/csvExporter';
const UButton = resolveComponent('UButton');

const UDropdownMenu = resolveComponent('UDropdownMenu');
const toast = useToast();
const table = useTemplateRef('table');

const props = defineProps<{
    userList: User[]
}>()

const pagination = ref({
    pageIndex: 0,
    pageSize: 10
})

const open = ref(false)
const deleteOpen = ref(false)
const selectedUser = ref<{ id: number, name: string, email: string, birthday: number, sex: string, contact: string, role:string } | null>(null);
const selectedUserId = ref<number | null>(null);
const data = computed(() => {
    return props?.userList
})

const columns: TableColumn<User>[] = [
    {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => `${row.getValue('role')}`
    },
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => `${row.getValue('name')}`
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => `${row.getValue('email')}`
    },
    {
        accessorKey: 'sex',
        header: 'Sex',
        cell: ({ row }) => `${row.getValue('sex')}`
    },
    {
        accessorKey: 'birthday',
        header: 'Age',
        cell: ({ row }) => {
            return getTheAge(row.getValue('birthday'))
        }
    },
    {
        accessorKey: 'contact',
        header: 'Contact',
        cell: ({ row }) => `${row.getValue('contact')}`
    },
    {
        accessorKey: 'isVerified',
        header: 'Verified',
        cell: ({ row }) => `${row.getValue('isVerified')}`
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => `${row.getValue('status')}`
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            return h(
                'div',
                { class: 'text-right' },
                h(
                    UDropdownMenu,
                    {
                        content: {
                            align: 'end'
                        },
                        items: getRowItems(row),
                        'aria-label': 'Actions dropdown'
                    },
                    () =>
                        h(UButton, {
                            icon: 'i-lucide-ellipsis-vertical',
                            color: 'neutral',
                            variant: 'ghost',
                            class: 'ml-auto',
                            'aria-label': 'Actions dropdown'
                        })
                )
            )
        }
    }
]

function getRowItems(row: Row<User>) {
    return [

        {
            type: 'label',
            label: 'Action',
        },
        {
            type: 'separator',

        },
        {
            label: 'Edit',
            icon: 'i-lucide-pencil',
            async onSelect() {
                selectedUser.value = {
                    id: row.original.id,
                    name: row.original.name,
                    email: row.original.email,
                    birthday: row.original.birthday,
                    sex: row.original.sex,
                    contact: row.original.contact,
                    role: row.original.role,
                }
                open.value = !open.value;

            }
        },
        {
            label: 'Delete',
            icon: 'i-lucide-trash',
            async onSelect() {
                selectedUserId.value = row.original.id;

                deleteOpen.value = !deleteOpen.value
            }
        },
    ]
}
const globalFilter = ref('')
</script>

<template>




    <UModal v-if="selectedUser" v-model:open="open" :title="`Edit ${selectedUser.name}'s information `">
        <UButton class="hidden" icon="i-lucide-user-plus" label="Add user" color="primary" variant="subtle" />
        <template #body>
            <EditModal v-if="selectedUser || selectedUser !== null" :data="selectedUser" @change="() => open = !open" />
        </template>
    </UModal>

    <UModal v-if="selectedUserId" v-model:open="deleteOpen" :title="`delete ${selectedUserId}'s account`">
        <UButton class="hidden" icon="i-lucide-user-plus" label="Add user" color="primary" variant="subtle" />
        <template #body>
            <DeleteModal v-if="selectedUserId" :id="selectedUserId" />
        </template>
    </UModal>
    <div class="flex flex-col gap-3">
        <div class="w-full flex items-center gap-2">
            <UInput v-model="globalFilter" type="text" icon="i-lucide-search" placeholder="Search......"
                class="  my-2 w-full" />
            <UModal title="Add admin">
                <UButton icon="i-lucide-user-plus" label="Add admin" color="primary" variant="subtle" />
                <template #body>
                    <RegisterModal />
                </template>
            </UModal>
        </div>

        <UTable :data="data" ref="table" :pagination-options="{ getPaginationRowModel: getPaginationRowModel() }"
            :columns="columns" v-model:pagination="pagination" v-model:global-filter="globalFilter"
            class="flex-1 shadow-xl border border-gray-200 rounded-md">
            <template #isVerified-cell="{ row }">
                <UIcon :name="!row.original.isVerified ? 'i-lucide-circle-x' : 'i-lucide-circle-check'"
                    :class="!row.original.isVerified ? 'text-red-500' : 'text-green-500'" class="size-5" />
            </template>
            <template #status-cell="{ row }">
                <UIcon :name="!row.original.status ? 'i-lucide-circle' : 'i-lucide-circle'"
                    :class="!row.original.status ? 'text-red-500' : 'text-green-500'" class="size-5" />
            </template>
        </UTable>
    </div>
    <div class="flex justify-end border-t border-(--ui-border) pt-4">
        <UPagination :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
            :items-per-page="table?.tableApi?.getState().pagination.pageSize"
            :total="table?.tableApi?.getFilteredRowModel().rows.length"
            @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)" />
    </div>
</template>