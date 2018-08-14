<template>
  <div class="game">
    <h1>Add game</h1>
    <div class="form">
	      <div id="app">
          <select v-model="selectedGirl">
            <option v-for="girlType in girlTypes" v-bind:value="girlType">{{girlType.name}}</option>
          </select>
        </div>
      <div class="slide slide--1"><h3>Выбрано: {{selectedGirl.name}}</h3></div>
      <div class="slide slide--1"><h3>Баланс: {{user.balance}}</h3></div>
    </div>
    <div>
      <button class="app_post_btn" @click="addGirl">Add</button>
    </div>
    <div  class="table-wrap">
    <table>
      <tr>
        <td width="100">name</td>
        <td width="100">price</td>
        <td width="100">level</td>
        <td width="100">IncomeInHour</td>
        <td width="100">created</td>
        <td width="100" align="center">Action</td>
      </tr>
      <tr v-for="girl in girls" :key="girl._id">
        <td>{{ girl.name }}</td>
        <td>{{ girl.price }}</td>
        <td>{{ girl.level }}</td>
        <td>{{ girl.incomeInHour }}</td>
        <td>{{ girl.created }}</td>
        <td align="center">
          <a href="#" @click="updateGirl(girl._id)">Level Up</a>|
          <a href="#" @click="deleteGirl(girl._id)">Delete</a>
        </td>
      </tr>
    </table>
    </div>
  </div>
</template>
<script>
  import GameService from '@/services/GameService';
  import UserService from '../services/UserService';

  export default {
  name: 'Girls',
  data () {
    return {
      newTodoText: '',
      girlTypes:[],
      selectedGirl: '',
      girls: [],
      user: [],
    }
  },
  mounted () {
    this.getGirlTypes(),
      this.getGirls(),
      this.getUser()
  },
  methods: {
    async getGirlTypes () {
      const response = await GameService.fetchGirlTypes();
      this.girlTypes = response.data.girlTypes
    },
    async getGirls() {
      const response = await GameService.fetchGirls();
      this.girls = response.data.girls
    },
    async getUser() {
      const response = await UserService.fetchUser();
      this.user = response.data.user;
    },
    async addGirl () {
      await GameService.addGirl({
        id: this.selectedGirl._id,
      });
      this.$router.push({name: 'Game'});
      this.getGirls()
    },
    async updateGirl (id) {
      await GameService.updateGirl(id);
      this.$router.push({name: 'Game'});
      this.getGirls()
    },
    async deleteGirl (id) {
      await GameService.deleteGirl(id);
      this.$router.push({name: 'Game'});
      this.getGirls()
    },
    addNewTodo: function () {
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText,
        level: 0
      });
      this.newTodoText = ''
    },
    removeElement: function (index) {
      delete this.todos[index];
      this.$delete(this.todos, index)
    }
  }
}
</script>
<style type="text/css">
  .form input, .form textarea {
    width: 500px;
    padding: 10px;
    border: 1px solid #e0dede;
    outline: none;
    font-size: 12px;
  }
  .form div {
    margin: 20px;
  }
  .table-wrap {
    width: 60%;
    margin: 0 auto;
    text-align: center;
  }
  table th, table tr {
    text-align: left;
  }
  table thead {
    background: #f2f2f2;
  }
  table tr td {
    padding: 11px;
  }
  table tr:nth-child(odd) {
    background: #f2f2f2;
  }
  table tr:nth-child(1) {
    background: #4d7ef7;
    color: #fff;
  }
  a {
    color: #4d7ef7;
    text-decoration: none;
  }
  a.add_post_link {
    background: #4d7ef7;
    color: #fff;
    padding: 10px 80px;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
  }
  .app_post_btn {
    background: #4d7ef7;
    color: #fff;
    padding: 10px 80px;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
    width: 520px;
    border: none;
    cursor: pointer;
  }

</style>
