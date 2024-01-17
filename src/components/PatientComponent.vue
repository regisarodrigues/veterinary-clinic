<script setup lang="ts">
import type { IPatient } from '@/interfaces/interfaces';
import type { PropType } from 'vue';

defineEmits(['update-patient', 'delete-patient']);

defineProps({
  patient: {
    type: Object as PropType<IPatient>,
    required: true
  }
});
</script>

<template>
  <div class="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
    <p class="font-bold mb-3 text-gray-700 uppercase">
      ID:
      <span class="font-normal normal-case">{{ patient.id }} </span>
    </p>

    <p class="font-bold mb-3 text-gray-700 uppercase">
      Nome Pet:
      <span class="font-normal normal-case">{{ patient.animal_name }} </span>
    </p>

    <p class="font-bold mb-3 text-gray-700 uppercase">
      Nome Tutor:
      <span class="font-normal normal-case">{{ patient.tutor_name }} </span>
    </p>

    <p class="font-bold mb-3 text-gray-700 uppercase">
      Email:
      <span class="font-normal normal-case">{{ patient.email }} </span>
    </p>

    <p class="font-bold mb-3 text-gray-700 uppercase">
      Data Consulta:
      <span class="font-normal normal-case">{{ patient.date }} </span>
    </p>

    <p class="font-bold mb-3 text-gray-700 uppercase">
      Sintomas:
      <span class="font-normal normal-case">{{ patient.symptoms }} </span>
    </p>

    <div class="grid md:grid-cols-2 gap-5 mt-10">
      <button
        type="button"
        class="block w-full py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
        @click="$emit('update-patient', patient.id)"
      >
        Editar
      </button>

      <button
        type="button"
        class="block w-full py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
        @click="$emit('delete-patient', patient.id)"
      >
        Excluir
      </button>
    </div>
  </div>
</template>
