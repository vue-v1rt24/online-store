import {Module} from 'vuex';

import {ICartType, ICartItem} from '../../types/cart.type';

const cartModule: Module<ICartType, any> = {
    namespaced: true,
    state: () => ({
        cart: [],
    }),
    getters: {
        getCart: (state: ICartType) => state.cart,
    },
    mutations: {
        setCart(state: ICartType, product: ICartItem) {
            const elProduct = state.cart.find(el => el.name === product.name);

            if (elProduct) {
                elProduct!.count!++;
            } else {
                state.cart.push({...product, count: 1});
            }
        },
        setDelToCart(state: ICartType, idx: number) {
            state.cart.splice(idx, 1);
        },
        setChangeCount(state: ICartType, {val, idx}) {
            const cartProduct = state.cart[idx];

            if (cartProduct) {
                cartProduct.count += val;

                if (cartProduct.count! < 1) {
                    cartProduct.count = 1;
                }
            }
        },
    },
    actions: {
        addToCart({commit}, product: ICartItem) {
            commit('setCart', product);
        },
        delToCart({commit}, idx) {
            commit('setDelToCart', idx);
        },
        changeCount({commit}, data) {
            commit('setChangeCount', data);
        },
    },
};

export default cartModule;