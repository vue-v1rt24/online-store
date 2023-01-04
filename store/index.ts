import {InjectionKey} from 'vue';
import {createStore, useStore as baseUseStore, Store} from 'vuex';

import catalogModule from './modules/catalog.module';
import cartModule from './modules/cart.module';

export interface State {
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        catalogModule,
        cartModule,
    },
});

export function useStore() {
    return baseUseStore(key);
}