<template>
  <div class="home">
    <div class="items">
      <ShopItem
        v-for="item in items"
        :key="item.name"
        v-bind="item"
      />
    </div>
  </div>
</template>
<script>
import ShopItem from '@/components/ShopItem.vue';

export default {
  name: 'shop',
  components: { ShopItem },
  data() {
    return {
      items: [
        { name: 'T-Shirt', price: 19.99 },
        { name: 'Sweatshirt', price: 39.99 },
        { name: 'Jeans', price: 99.99 },
      ],
    };
  },
};
</script>
<style scoped>
.items {
  margin: 0 20vw;
}
</style>
