<template>
  <div id="app">
    <top-menu></top-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  import menu from './components/TopMenu.vue';
  export default {
    name: 'app',
    components: {
      'top-menu': menu
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    text-align: center;
    margin-top: 60px;
  }
</style>
