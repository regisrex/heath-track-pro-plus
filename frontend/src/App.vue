<script  lang="ts">
import { reactive } from 'vue';
import PatientGraph from './components/units/PatientGraph.vue';
import Patients from './components/units/Patients.vue';
import { API_BASEURL } from './constants';
import BaseLayout from './layouts/BaseLayout.vue';
export default {
  setup() {
    let state = reactive({
      patients: [],
      selected_patient : 1
    });
    return {
      state
    }
  },
  mounted() {
    (async () => {
      let res = await fetch(`${API_BASEURL}/patients`);
      let data = await res.json();
      this.state.patients = data.patients;
    })();
  },

  methods  : {
    setSelectedPatient(id : number){
      this.state.selected_patient = id ;
    }
  },
  components: {
    BaseLayout,
    Patients,
    PatientGraph
  }
}
</script>

<template>
  <base-layout>
    <h1 class="text-center  uppercase text-dark">Health Track Pro plus</h1>
    <p class="text-center text-slate">Dashboard for previewing data recorded by <span class="font-bold">Health track pro
        plus&trade;</span> </p>
    <div class="grid grid-cols-2 gap-4 min-h-[60vh]">
      <patients :patients="state.patients" :selected_patient="state.selected_patient" :set-selected-patient="setSelectedPatient"/>
      <patient-graph :patient_id="state.selected_patient" />
    </div>

  </base-layout>
</template>

<style scoped></style>
