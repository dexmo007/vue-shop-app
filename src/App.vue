<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Shop</router-link> |
      <router-link to="/cart">Cart ({{cartCount}})</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: { ...mapGetters(['cartCount']) },
  methods: mapActions(['listenToStorage']),
  created() {
    this.listenToStorage();
  },
};
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
