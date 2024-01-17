<script setup lang="ts">
import { computed, type PropType } from 'vue';
import { type IAlert } from '../interfaces/interfaces';

const props = defineProps({
  alert: {
    type: Object as PropType<IAlert>,
    required: true
  }
});

const isError = computed(() => {
  return props.alert.type === 'error';
});
</script>

<template>
  <div
    :class="[isError ? 'bg-red-500' : 'bg-green-500']"
    class="text-white text-center p-3 uppercase font-bold mb-3 rounded-md"
  >
    {{ alert.message }}
  </div>
</template>
