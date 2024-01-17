<script setup lang="ts">
import { computed, reactive } from 'vue';
import { type IAlert } from '../interfaces/interfaces';
import AlertComponent from './AlertComponent.vue';

const emit = defineEmits([
  'update:animal_name',
  'update:tutor_name',
  'update:email',
  'update:date',
  'update:symptoms',
  'save-patient'
]);

const props = defineProps({
  id: {
    type: [String, null],
    required: true
  },
  animal_name: {
    type: String,
    required: true
  },
  tutor_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  symptoms: {
    type: String,
    required: true
  }
});

const alert = reactive<IAlert>({
  type: '',
  message: ''
});

const validate = () => {
  if (Object.values(props).includes('')) {
    alert.message = 'Todos os campos são obrigatórios!';
    alert.type = 'error';

    setTimeout(() => {
      Object.assign(alert, {
        type: '',
        message: ''
      });
    }, 3000);

    return;
  }

  emit('save-patient');
  alert.message = 'Paciente Salvo com Sucesso!';
  alert.type = 'success';

  setTimeout(() => {
    Object.assign(alert, {
      type: '',
      message: ''
    });
  }, 3000);
};

const editing = computed(() => {
  console.log(props.id);
  return props.id;
});
</script>

<template>
  <div class="md:w-1/2">
    <h3 class="font-black text-3xl text-center">Seguimento Pacientes</h3>
    <p class="text-lg mt-5 text-center mb-10">
      Cadastar Pacientes e <span class="text-indigo-600 font-bold">Administra-los</span>
    </p>

    <AlertComponent v-if="alert.message" :alert="alert" />

    <form class="bg-white shadow-md rounded-md py-10 px-5 mb-10" @submit.prevent="validate">
      <div class="mb-5">
        <label class="block text-gray-700 uppercase font-bold" for="animal_name">Nome Pet</label>
        <input
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          type="text"
          id="animal_name"
          placeholder="Nome do animal de estimação"
          :value="animal_name"
          @input="$emit('update:animal_name', ($event.target as HTMLInputElement).value)"
        />
      </div>

      <div class="mb-5">
        <label class="block text-gray-700 uppercase font-bold" for="tutor_name">Nome Tutor</label>
        <input
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          type="text"
          id="tutor_name"
          placeholder="Nome tutor do animal de estimação"
          :value="tutor_name"
          @input="$emit('update:tutor_name', ($event.target as HTMLInputElement).value)"
        />
      </div>

      <div class="mb-5">
        <label class="block text-gray-700 uppercase font-bold" for="email">Email</label>
        <input
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          type="email"
          id="email"
          placeholder="email@mail.com"
          :value="email"
          @input="$emit('update:email', ($event.target as HTMLInputElement).value)"
        />
      </div>

      <div class="mb-5">
        <label class="block text-gray-700 uppercase font-bold" for="date">Data Consulta</label>
        <input
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          type="date"
          id="date"
          :value="date"
          @input="$emit('update:date', ($event.target as HTMLInputElement).value)"
        />
      </div>

      <div class="mb-5">
        <label class="block text-gray-700 uppercase font-bold" for="symptoms">Sintomas</label>
        <textarea
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          id="symptoms"
          placeholder="Descreva os sintomas"
          :value="symptoms"
          @input="$emit('update:symptoms', ($event.target as HTMLTextAreaElement).value)"
        />
      </div>

      <input
        class="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors rounded-md"
        type="submit"
        :value="[editing ? 'Salvar Alterações' : 'Salvar']"
      />
    </form>
  </div>
</template>
