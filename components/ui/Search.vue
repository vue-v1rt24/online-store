<template>
  <input
      type="search"
      v-model="inpVal"
      placeholder="Поиск"
      @keydown.enter="searchVal"
      @blur="searchVal"
  >
</template>

<script setup lang="ts">
import {ref, watch} from 'vue';

const props = defineProps<{
  modelValue: string,
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
}>();

const inpVal = ref('');

const searchVal = () => {
  emit('update:modelValue', inpVal.value);
};

watch(
    () => props.modelValue,
    val => {
      !val && (inpVal.value = '');
    },
);
</script>

<style scoped>

</style>