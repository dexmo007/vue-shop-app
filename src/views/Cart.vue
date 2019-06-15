<template>
  <div class="cart">
    <h1>Your Cart</h1>
    <span v-if="cartItems.length === 0">
      Nothing in here yet.
    </span>
    <template v-else>
      <div class="items">
        <div
          v-for="item in cartItems"
          :key="item.name"
          class="item"
        >
          <span>{{item.name}}</span>
          <span>{{item.price}}</span>
          <div>
            <span>x</span>
            <input
              class="item-count-input"
              type="number"
              min="0"
              :value="item.count"
              @keydown="$event.key === '-' ? $event.preventDefault() : true"
              @blur="setItemCount({name: item.name,count: Number($event.target.value)})"
            >
          </div>
          <button
            class="remove-btn"
            @click="removeCartItem(item.name)"
          >X</button>
          <span>{{(item.count*item.price).toFixed(2)}}</span>
        </div>
      </div>
      <div class="total">
        <span>=</span>
        <span>{{cartTotal}}</span>
      </div>
    </template>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['cartTotal']),
    cartItems() {
      return Object.values(this.cart);
    },
  },
  methods: {
    ...mapMutations(['setItemCount', 'removeCartItem']),
  },
};
</script>
<style scoped>
.cart {
  margin: 0 20vw;
}
.item {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  border: 3px solid #d3d3d3;
  padding: 1em;
  margin: 0.3em 0;
}
.item > * {
  margin: 0.3em;
}
.total {
  display: flex;
  justify-content: flex-end;
  margin: 0.3em;
  font-weight: bold;
  text-decoration: underline;
  text-decoration-style: double;
  font-size: 2em;
}
.item-count-input {
  width: 4em;
}
.remove-btn {
  width: 1.7em;
}
</style>
