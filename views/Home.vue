<template>
  <h1 class="h1">Каталог</h1>

  <div class="filters">
    <Select
        :options="cats"
        v-model="selected"
    />

    <div class="search">
      <Search
          v-model="search"
      />
    </div>

    <div class="rangeFilter">
      <div class="rangeFilter__title">Фильтр по цене:</div>
      <RangeSlider
          :min-price="0"
          :max-price="10000"
          v-model="rangeSlider"
      />
    </div>

    <button @click="resetFilter">Сброс</button>
  </div>

  <button
      @click="$router.push({name: 'Cart'})"
      class="catalogLink"
  >
    Корзина: {{ cart.length }}
  </button>

  <div class="catalog">
    <CatalogItem
        v-for="p in products"
        :key="p.name"
        :product="p"
        @addToCart="addToCart"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, computed} from 'vue';
import {useStore} from '../store';
import CatalogItem from '../components/CatalogItem.vue';
import Select from '../components/ui/Select.vue';

import {ICatalogTypeItem} from '../types/catalog.type';
import {ICartItem} from '../types/cart.type';
import RangeSlider from '../components/ui/RangeSlider.vue';
import Search from '../components/ui/Search.vue';

const store = useStore();

store.dispatch('catalogModule/products').catch(error => {
});

const productsData = computed(() => store.getters['catalogModule/getProducts'] as ICatalogTypeItem[]);
const cart = computed(() => store.getters['cartModule/getCart']);

const addToCart = (product: ICartItem) => {
  store.dispatch('cartModule/addToCart', product);
};

const cats = reactive([
  {name: 'Все', value: 'all'},
  {name: 'Мужские', value: 'Мужские'},
  {name: 'Женские', value: 'Женские'},
]);

const selected = ref('all');
const rangeSlider = ref<string[]>([]);
const search = ref('');

const products = computed(() => productsData.value
    .filter(el => {
      if (selected.value === 'all') {
        return el;
      }

      return el.category === selected.value;
    })
    .filter(el => {
      if (search.value) {
        return el.name.toLowerCase().includes(search.value.toLowerCase());
      }

      return el;
    })
    .filter(el => {
      if (rangeSlider.value.length) {
        return el.price >= +rangeSlider.value[0] && el.price <= +rangeSlider.value[1];
      }

      return el;
    }),
);

const resetFilter = () => {
  selected.value = 'all';
  rangeSlider.value = [];
  search.value = '';
};
</script>

<style lang="scss" scoped>
.catalog {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}

.filters {
  margin-bottom: 30px;
}

.search {
  margin-top: 30px;
}

.rangeFilter {
  margin: 30px 0 30px 0;

  &__title {
    margin-bottom: 20px;
  }
}
</style>