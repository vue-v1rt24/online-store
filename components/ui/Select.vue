<template>
  <select v-model="selectVal" @change="changeSelect">
    <option
        v-for="opt in options"
        :key="opt.name"
        :value="opt.value"
    >
      {{ opt.name }}
    </option>
  </select>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue';
import {ISelect} from '../../types/select-ui.type';

const props = defineProps<{
  options: ISelect[],
  modelValue: string
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
}>();

const selectVal = ref(props.modelValue);

const changeSelect = () => {
  emit('update:modelValue', selectVal.value);
};

watch(
    () => props.modelValue,
    val => {
      selectVal.value = val;
    },
);
</script>

<style scoped>

</style>