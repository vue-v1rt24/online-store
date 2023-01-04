<template>
  <div class="rangeSlider">
    <input type="range" min="0" max="10000" step="10" v-model="minPrice">
    <input type="range" min="0" max="10000" step="10" v-model="maxPrice">

    <div class="rangeSlider__value">
      <div>Минимальная цена: {{ minPrice }}</div>
      <div>Максимальная цена: {{ maxPrice }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue';

const props = defineProps<{
  minPrice: number,
  maxPrice: number,
  modelValue: string[]
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', values: object): void
}>();

const minPrice = ref(props.minPrice);
const maxPrice = ref(props.maxPrice);

watch([minPrice, maxPrice], vals => {
  emit('update:modelValue', [vals[0], vals[1]]);
});

watch(
    () => props.modelValue,
    val => {
      !val.length && (minPrice.value = props.minPrice, maxPrice.value = props.maxPrice);
    });
</script>

<style scoped>

</style>