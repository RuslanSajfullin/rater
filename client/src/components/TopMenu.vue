<template>
  <div class="menu-main"   :style="{backgroundImage:'url(bg1.jpg)'}">
 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEvfbVN5yzKSyZtzBw7AM-VofU7UbTKT1ADsi_KTFmE8cw8cmK">
  <ul>
    <li><router-link v-bind:to="'/'">Home</router-link></li>
    <li><router-link v-bind:to="'/authorization'">Authorization</router-link></li>
    <li><router-link v-bind:to="'/posts'">Posts</router-link></li>
    <li><router-link v-bind:to="'/param'">Param Link</router-link></li>
    <li><router-link v-bind:to="'/game'">Game Girls</router-link></li>
    <li> <a href="#" @click="exit()">EXIT</a></li>
  </ul>
  </div>
</template>

<script>
 export default {
  name: 'test',
   methods: {
    exit: function () {
      localStorage.clear();
      this.$router.push({ name: 'Authorization' });
    }
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Ubuntu+Condensed');
  .menu-main {
    list-style: none;
    margin: 40px 0 5px;
    padding: 25px 0 5px;
    text-align: center;

  }
  .menu-main li {display: inline-block;}
  .menu-main li:after {
    content: "|";
    color: #606060;
    display: inline-block;
    vertical-align:top;
  }
  .menu-main li:last-child:after {content: none;}
  .menu-main a {
    text-decoration: none;
    font-family: 'Ubuntu Condensed', sans-serif;
    letter-spacing: 2px;
    position: relative;
    padding-bottom: 20px;
    margin: 0 34px 0 30px;
    font-size: 25px;
    text-transform: uppercase;
    display: inline-block;
    transition: color .2s;
    color: #fff;
  }
  .menu-main a, .menu-main a:visited {color: #2f5687;}
  .menu-main a.current, .menu-main a:hover{color: #feb386;}
  .menu-main a:before,
  .menu-main a:after {
    content: "";
    position: absolute;
    height: 4px;
    top: auto;
    right: 50%;
    bottom: -5px;
    left: 50%;
    background: #feb386;
    transition: .8s;
  }
  .menu-main a:hover:before, .menu-main .current:before {left: 0;}
  .menu-main a:hover:after, .menu-main .current:after {right: 0;}
  @media (max-width: 550px) {
    .menu-main {padding-top: 0;}
    .menu-main li {display: block;}
    .menu-main li:after {content: none;}
    .menu-main a {
      padding: 25px 0 20px;
      margin: 0 30px;
    }
  }
</style>
