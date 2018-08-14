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

  body {
 /*   background: url('./assets/images/vizualnoj.jpgэ') no-repeat center center fixed;
    &:after {
      content: '';
      position: fixed;
    background-repeat: no-repeat;
    background-size: 80% 80%;
      top: 0;
      left: 0;
      background-color: $background-tint;
      opacity: .3;
      z-index: -1;
    }*/
  }
</style>
