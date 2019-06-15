import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const localStorageKey = 'vuex';

const vuexPersistence = new VuexPersistence({
  key: localStorageKey,
  storage: window.localStorage,
  reducer: state => ({ cart: state.cart }),
});

/* eslint-disable no-param-reassign */
export default new Vuex.Store({
  state: {
    cart: {},
    listener: null,
  },
  getters: {
    cartCount(state) {
      return Object.values(state.cart).reduce((acc, cur) => acc + cur.count, 0);
    },
    cartTotal(state) {
      return Object.values(state.cart)
        .reduce((acc, cur) => acc + cur.price * cur.count, 0)
        .toFixed(2);
    },
  },
  mutations: {
    addToCart(state, item) {
      if (!state.cart[item.name]) {
        state.cart[item.name] = { ...item, count: 0 };
      }
      state.cart[item.name].count += 1;
    },
    setListener(state, listener) {
      state.listener = listener;
    },
    setCart(state, cart) {
      state.cart = cart;
    },
    setItemCount(state, { name, count }) {
      if (count === 0) {
        Vue.delete(state.cart, name);
        return;
      }
      state.cart[name].count = count;
    },
    removeCartItem(state, name) {
      Vue.delete(state.cart, name);
    },
  },
  actions: {
    listenToStorage({ commit, state }) {
      console.log('listening');

      const listener = (e) => {
        if (e.key !== localStorageKey) {
          return;
        }
        const current = JSON.stringify({ cart: state.cart });
        if (current === e.newValue) {
          return;
        }
        console.log('updating cart from other tab');

        commit('setCart', JSON.parse(e.newValue).cart);
      };
      window.addEventListener('storage', listener);
      commit('setListener', listener);
    },
    unlisten({ commit, state }) {
      if (state.listener) {
        window.removeEventListener('storage', state.listener);
        commit('setListener', null);
      }
    },
  },
  plugins: [vuexPersistence.plugin],
});
