<template>
  <div class="cartBx">
    <img class="cartBx__img" :src="loadImg(cartItem.image)" :alt="cartItem.name">

    <div class="cartBx__info">
      <p>{{ cartItem.name }}</p>
      <p>{{ formattedPrice(cartItem.price) }}</p>
      <p>{{ cartItem.article }}</p>
    </div>

    <div class="cartBx__quantity">
      <p>Количество:</p>
      <button @click="emit('changeCount', -1)">-</button>
      {{ cartItem.count }}
      <button @click="emit('changeCount', 1)">+</button>
    </div>

    <button class="del" @click="emit('delFromCart')">Удалить</button>
  </div>
</template>

<script setup lang="ts">
import {formattedPrice} from '../utils/formattedPrice';
import {ICartItem} from '../types/cart.type';

const props = defineProps<{
  cartItem: ICartItem,
}>();

const emit = defineEmits<{
  (e: 'delFromCart'): void
  (e: 'changeCount', val: number): void
}>();

const loadImg = (img: string) => {
  return `images/${img}`;
};
</script>

<style lang="scss" scoped>
.cartBx {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 8px 0 #e0e0e0;
  padding: $padding * 2;
  margin-bottom: $margin * 2;

  &__img {
    max-width: 50px;
  }

  &__info {
    line-height: 27px;
  }

  &__quantity {
    text-align: center;
    line-height: 27px;
  }
}
</style>