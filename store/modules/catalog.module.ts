import {Module} from 'vuex';

import {ICatalogType, ICatalogTypeItem} from '../../types/catalog.type';

const catalogModule: Module<ICatalogType, any> = {
    namespaced: true,
    state: () => ({
        products: [],
    }),
    getters: {
        getProducts: (state: ICatalogType) => state.products,
    },
    mutations: {
        setProducts(state: ICatalogType, products: ICatalogTypeItem[]) {
            state.products = products;
        },
    },
    actions: {
        async products({commit}) {
            try {
                const res = await fetch('db.json');
                const products = await res.json() as ICatalogType;
                commit('setProducts', products);
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
    },
};

export default catalogModule;