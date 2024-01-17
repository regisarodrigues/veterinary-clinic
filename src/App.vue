<script setup lang="ts">
import { uid } from 'uid';
import { onMounted, reactive, ref, watch } from 'vue';
import FormComponent from './components/FormComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';
import PatientComponent from './components/PatientComponent.vue';
import { type IPatient } from './interfaces/interfaces';

const patients = ref<IPatient[]>([]);

const patient = reactive<IPatient>({
  id: null,
  animal_name: '',
  tutor_name: '',
  email: '',
  date: '',
  symptoms: ''
});

watch(
  patients,
  () => {
    saveLocalStorage();
  },
  { deep: true }
);

const saveLocalStorage = () => {
  localStorage.setItem('patients', JSON.stringify(patients.value));
};

onMounted(() => {
  const patientStorage = localStorage.getItem('patients');
  if (patientStorage) patients.value = JSON.parse(patientStorage);
});

const savePatient = () => {
  if (patient.id) {
    const { id } = patient;
    const i = patients.value.findIndex((patientState) => patientState.id === id);
    patients.value[i] = { ...patient };
  } else {
    patients.value.push({ ...patient, id: uid() });
  }

  //clear form
  patient.id = '';
  patient.animal_name = '';
  patient.tutor_name = '';
  patient.email = '';
  patient.date = '';
  patient.symptoms = '';
};

const updatePatient = (id: string) => {
  const patientEdit = patients.value.filter((patient) => patient.id === id)[0];
  Object.assign(patient, patientEdit);
};

const deletePatient = (id: string) => {
  patients.value = patients.value.filter((patient) => patient.id !== id);
};
</script>

<template>
  <div class="container mx-auto mt-10">
    <HeaderComponent />

    <div class="mt-12 md:flex">
      <FormComponent
        v-model:animal_name="patient.animal_name"
        v-model:tutor_name="patient.tutor_name"
        v-model:email="patient.email"
        v-model:date="patient.date"
        v-model:symptoms="patient.symptoms"
        @save-patient="savePatient"
        :id="patient.id"
      />

      <div class="md:w-1/2 md:h-screen overflow-y-scroll">
        <h3 class="font-black text-3xl text-center">Administrar os Pacientes</h3>

        <div v-if="patients.length > 0">
          <p class="text-lg mt-5 text-center mb-10">
            Informação de <span class="text-indigo-600 font-bold">Pacientes</span>
          </p>
          <PatientComponent
            v-for="patient in patients"
            :key="patient.email"
            :patient="patient"
            @update-patient="updatePatient"
            @delete-patient="deletePatient"
          />
        </div>
        <p v-else class="mt-20 text-2xl text-center">Não tem pacientes cadastrados!</p>
      </div>
    </div>
  </div>
</template>
