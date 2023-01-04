<template>
  <div class="catalog__item">
    <img class="catalog__item_image" :src="loadImg(product.image)" :alt="product.name">
    <p class="catalog__item_title">{{ product.name }}</p>
    <p class="catalog__item_price">Стоимость: {{ formattedPrice(product.price) }}</p>

    <button
        class="btn"
        @click="modalOpen"
    >
      Посмотреть детали
    </button>

    <button class="btn" @click="addToCart">Добавить в корзину</button>
  </div>

  <teleport to="body">
    <Modal
        v-if="isModalVisible"
        :title="product.name"
        @addToCart="addToCart"
        @close="isModalVisible = false"
        rightNameBtn="Добавить в корзину"
    >
      <img class="catalog__item_image" :src="loadImg(product.image)" :alt="product.name">
      <div class="slotContent">
        <p class="catalog__item_title">{{ product.name }}</p>
        <p class="catalog__item_price">Стоимость: {{ formattedPrice(product.price) }}</p>
      </div>
    </Modal>
  </teleport>
</template>

<script setup lang="ts">
import {ICatalogTypeItem} from '../types/catalog.type';
import Modal from './ui/Modal.vue';
import {UseModal} from '../use/useModal';
import {formattedPrice} from '../utils/formattedPrice';

const props = defineProps<{
  product: ICatalogTypeItem;
}>();

const emit = defineEmits<{
  (e: 'addToCart', product: ICatalogTypeItem): void
}>();

const loadImg = (img: string) => {
  return `images/${img}`;
};

const addToCart = () => {
  emit('addToCart', props.product);
};

const {isModalVisible, modalOpen} = UseModal();
</script>

<style lang="scss" scoped>
.catalog__item {
  flex-basis: 25%;
  text-align: center;
  box-shadow: 0 0 8px 0 #e0e0e0;
  padding: $padding * 2;

  &_image {
    width: 100px;
  }

  &_title {
    margin: 20px 0;
  }

  &_price {
    margin: 20px 0;
  }
}

.slotContent {
  padding-left: 30px;
}
</style>