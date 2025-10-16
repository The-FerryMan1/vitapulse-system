<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';
import { ref } from 'vue';



interface Bloodpressure {
    blood_pressure_category: string
    systolic: string
    and_or: string
    diastolic: string
}

interface Guide {
    age_group: string
    lowBp: string
    normal_range: string
    highBp: string
}

interface Pulse {
    age_group: string
    lowPulse: string
    normal_range: string
    highPulse: string
}


const clinicalLabel = ref<Bloodpressure[]>([
    {
        blood_pressure_category: "Normal",
        systolic: "Less than 120",
        and_or: "and",
        diastolic: "Less than 80"
    },
    {
        blood_pressure_category: "Elevated",
        systolic: "120 - 129",
        and_or: "and",
        diastolic: "Less than 80"
    },
    {
        blood_pressure_category: "High Blood Pressure (Hypertension) Stage 1",
        systolic: "130 - 139",
        and_or: "or",
        diastolic: "80 - 89"
    },
    {
        blood_pressure_category: "High Blood Pressure (Hypertension) Stage 2",
        systolic: "140 or Higher",
        and_or: "or",
        diastolic: "90 or Higher"
    },
    {
        blood_pressure_category: "Hypertensive Crisis (consult your doctor immediately)",
        systolic: "Higher than 180",
        and_or: "and/or",
        diastolic: "Higher than 120"
    },
])

const clinicalLabelColumn: TableColumn<Bloodpressure>[] = [
    {
        accessorKey: 'blood_pressure_category',
        header: 'Blood Pressure Category',
        cell: ({ row }) => `${row.getValue('blood_pressure_category')}`
    },
    {
        accessorKey: 'systolic',
        header: 'Systolic mmHg',
        cell: ({ row }) => `${row.getValue('systolic')}`
    },
    {
        accessorKey: 'and_or',
        header: '',
        cell: ({ row }) => `${row.getValue('and_or')}`
    },
    {
        accessorKey: 'diastolic',
        header: 'Diastolic mmHg',
        cell: ({ row }) => `${row.getValue('diastolic')}`
    },

]

const data = ref<Guide[]>([
    {
        age_group: "Children (1–5)",
        lowBp: "< 80/50 mmHg",
        normal_range: "~95/65 mmHg",
        highBp: "> 110/75 mmHg",
    },
    {
        age_group: "Children (6–13)",
        lowBp: "< 90/55 mmHg",
        normal_range: "~105/70 mmHg",
        highBp: "> 120/80 mmHg",
    },
    {
        age_group: "Teenagers (14–18)",
        lowBp: "< 90/60 mmHg",
        normal_range: "~117/77 mmHg",
        highBp: "> 130/85 mmHg",
    },
    {
        age_group: "Young Adults (19–39)",
        lowBp: "< 95/60 mmHg",
        normal_range: "110–135 / 70–85 mmHg",
        highBp: "> 140/90 mmHg",
    },
    {
        age_group: "Middle-Aged Adults (40–59)",
        lowBp: "< 100/60 mmHg",
        normal_range: "120–140 / 75–90 mmHg",
        highBp: "> 140/90 mmHg",
    },
    {
        age_group: "Older Adults (60+)",
        lowBp: "< 100/60 mmHg",
        normal_range: "120–140 / 70–90 mmHg",
        highBp: "> 150/90 mmHg (depending on health)",
    },

])

const columns: TableColumn<Guide>[] = [
    {
        accessorKey: 'age_group',
        header: 'Age Group',
        cell: ({ row }) => `${row.getValue('age_group')}`
    },
    {
        accessorKey: 'lowBp',
        header: 'Low BP',
        cell: ({ row }) => `${row.getValue('lowBp')}`
    },
    {
        accessorKey: 'normal_range',
        header: 'Normal',
        cell: ({ row }) => `${row.getValue('normal_range')}`
    },
    {
        accessorKey: 'highBp',
        header: 'High BP',
        cell: ({ row }) => `${row.getValue('highBp')}`
    },
]

const dataPulse = ref<Pulse[]>([
    {
        age_group: "Preschool (4–5 yrs)",
        lowPulse: "< 70 bpm",
        normal_range: "80–140 bpm",
        highPulse: "> 140 bpm",
    },
    {
        age_group: "School-age (6–12 yrs)",
        lowPulse: "< 60 bpm",
        normal_range: "75–120 bpm",
        highPulse: "> 120 bpm",
    },
    {
        age_group: "Teen (13–18 yrs)",
        lowPulse: "< 50 bpm",
        normal_range: "60–100 bpm",
        highPulse: "> 100 bpm",
    },
    {
        age_group: "Adult (18–60 yrs)",
        lowPulse: "< 60 bpm",
        normal_range: "60–100 bpm",
        highPulse: "> 100 bpm",
    },
    {
        age_group: "Older Adult (60+ yrs)",
        lowPulse: "< 60 bpm",
        normal_range: "60–100 bpm",
        highPulse: "> 100 bpm",
    },



])

const columnsdataPulse: TableColumn<Pulse>[] = [
    {
        accessorKey: 'age_group',
        header: 'Age Group',
        cell: ({ row }) => `${row.getValue('age_group')}`
    },
    {
        accessorKey: 'lowPulse',
        header: 'Low Pulse',
        cell: ({ row }) => `${row.getValue('lowPulse')}`
    },
    {
        accessorKey: 'normal_range',
        header: 'Normal',
        cell: ({ row }) => `${row.getValue('normal_range')}`
    },
    {
        accessorKey: 'highPulse',
        header: 'High Pulse',
        cell: ({ row }) => `${row.getValue('highPulse')}`
    },

]


</script>

<template>

    <div>
        <div class="mb-10 p-2">
            <h1 class="font-semibold text-2xl p-2">Blood pressure clinical label
            </h1>
            <UTable :data="clinicalLabel" :columns="clinicalLabelColumn" class="flex-1" />

            <small class="flex gap-2 italic items-center p-2">Ref:
                <a class="underline text-blue-500"
                    href="https://www.heart.org/en/health-topics/high-blood-pressure">heart.org</a>
            </small>
        </div>
    </div>
    <div class="mb-10 p-2">
        <h1 class="font-semibold text-2xl p-2">Blood pressure guidelines by age <a class="underline text-blue-500"></a>
        </h1>
        <UTable :data="data" :columns="columns" class="flex-1" />

        <small class="flex gap-2 italic items-center p-2">Ref:
            <a class="underline text-blue-500"
                href="https://www.heart.org/en/health-topics/high-blood-pressure">heart.org</a>
            <a class="underline text-blue-500"
                href="https://www.who.int/news-room/fact-sheets/detail/hypertension">who.int</a>
        </small>
    </div>
    <div class="mb-10 p-2">
        <h1 class=" font-semibold text-2xl p-2">Pulse rate guidelines <a class="underline text-blue-500"></a></h1>
        <UTable :data="dataPulse" :columns="columnsdataPulse" class="flex-1" />

        <small class="flex gap-2 italic items-center p-2">Ref:
            <a class="underline text-blue-500"
                href="https://www.heart.org/en/healthy-living/fitness/fitness-basics/target-heart-rates">heart.org</a>
        </small>
    </div>

</template>
