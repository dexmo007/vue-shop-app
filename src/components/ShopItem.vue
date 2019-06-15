<template>
  <div class="container">
    <span>{{name}}</span>
    <div class="price">
      <span>{{price}}</span>
      <button @click="addToCart($props)">Add to cart</button>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';

export default {
  props: ['name', 'price'],
  methods: {
    ...mapMutations(['addToCart']),
  },
};
</script>
<style scoped>
.container {
  display: flex;
  border: 3px solid #d3d3d3;
  padding: 1em;
  justify-content: space-between;
  align-items: center;
}
.price {
  display: flex;
  flex-direction: column;
}
.price > * {
  margin: 0.3em;
}
</style>
