<template>
  <h1 class="h1">Корзина</h1>

  <button
      class="catalogLink"
      @click="$router.push({name: 'Home'})"
  >
    Вернуться в каталог
  </button>

  <div class="cartWrapper" v-if="cart.length">
    <CartItem
        v-for="(c, idx) in cart"
        :key="c.name"
        :cart-item="c"
        @changeCount="changeCount($event, idx)"
        @delFromCart="delFromCart(idx)"
    />

    <div class="total">
      Всего: <strong>{{ formattedPrice(allPrice) }}</strong>
    </div>
  </div>

  <p v-else>Вы пока ещё ничего не заказали</p>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {useStore} from '../store';
import CartItem from '../components/CartItem.vue';
import {formattedPrice} from '../utils/formattedPrice';
import {ICartItem} from '../types/cart.type';

const store = useStore();

const cart = computed(() => store.getters['cartModule/getCart'] as ICartItem[]);
const allPrice = computed(() => cart.value.reduce((acc, item) => acc += (item.price * item.count!), 0));

const changeCount = (val: number, idx: number) => {
  store.dispatch('cartModule/changeCount', {val, idx});
};

const delFromCart = (idxProduct: number) => {
  store.dispatch('cartModule/delToCart', idxProduct);
};
</script>

<style lang="scss" scoped>
.cartWrapper {
  padding-bottom: 60px;
}

.total {
  position: fixed;
  bottom: 10px;
  left: 0;
  width: 100%;
  height: 100px;
  background-color: #b3d4fc;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 24px;
  margin-top: 50px;

  & strong {
    font-weight: 600;
  }
}
</style>