<script lang="ts">
import { reactive, toRefs } from 'vue';
// import { Bar }  from "chart.js";
import axios from "axios";
import { API_BASEURL } from '../../constants';
export  default  {
    props : {
        patient_id :  Number
    },
    setup(props) {
        const { patient_id } = toRefs(props);
        console.log(patient_id.value)
        axios.get(API_BASEURL + `/records/${patient_id}`)
            .then((res) => {
                state.patient_records =  res.data.records
            }).catch(err => {
                console.log(err)
            })

        const state = reactive({
            patient_records : []
        })
    },
}
</script>

<template>
    <div v-if="patient_id == null" class="mt-10 rounded-lg bg-slate/10 text-center flex items-center justify-center">
        <div class="w-[200px]">
            <h4 class="opacity-30"> ___ </h4>
            <h4 class=""> No patient selected </h4>
            <p>Click on a patient to check how his graph has been like</p>
        </div>
    </div>
    <div v-else>
        <h1  class="text-2xl"> {{ patient_id }}</h1>
        <h1>Patient graph</h1>

    </div>
</template>