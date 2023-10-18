<script lang="ts">
import { toRefs } from 'vue';
export default {
    props: {
        patients: Array<any>,
        selected_patient: Number,
        setSelectedPatient: Function
    },
    setup(props) {
        const { patients, selected_patient } = toRefs(props);
        console.log(patients, selected_patient)
    }
}

</script>
<template>
    <div class="rounded-lg w-fill  p-6 mt-10">
        <div class="flex items-center justify-between">
            <h1 class="font-black text-2xl">Patients</h1>
            <div class="w-fit  border-4 border-b border-slate bg-slate/10 p-1 rounded-md">
                <input type="search" placeholder="Search" class="p-2 border-none placeholder:text-md bg-transparent text-dark/70 outline-none ">
            </div>
        </div>
        <div>
            <div v-for="patient in patients" :key="patient.id"
                :class="`hover:bg-amber/10 grid grid-cols-3 my-1 cursor-pointer p-2 rounded bg-slate/10 text-dark/70`"
                @click="setSelectedPatient!(patient.id)">
                <div class="flex items-center gap-3">

                    <span> {{ patient.id }}</span>
                    <span> {{ patient.patient_name }}</span>

                </div>
                <span> {{ patient.patient_national_id }}</span>
                <span> {{ patient.frequent_sickness }}</span>
            </div>
        </div>
    </div>
</template>