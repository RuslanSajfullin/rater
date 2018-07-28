<template>
  <div class="game">
    <h1>Add game</h1>
    <div class="form">
	      <div id="app">
          <select v-model="selectedUser">
            <option v-for="girlType in girlTypes" v-bind:value="girlType">{{girlType.name}}</option>
          </select>
        </div>
    <div class="slide slide--1"><h3>Выбрано: {{selectedUser.name}}</h3></div>
    </div>
    <div>
      <button class="app_post_btn" @click="addGirl">Add</button>
    </div>
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
</template>
<script>
import GameService from '@/services/GameService'
export default {
  name: 'Girls',
  data () {
    return {
      newTodoText: '',
      girlTypes:[],
      selectedUser:'',
      girls:[]
    }
  },
  mounted () {
    this.getGirlTypes(),
    this.getGirls()
  },
  methods: {
    async getGirlTypes () {
      const response = await GameService.fetchGirlTypes()
      this.girlTypes = response.data.girlTypes
    },
    async getGirls() {
      const response = await GameService.fetchGirls()
      this.girls = response.data.girls
      console.log(this.girls)
    },
    async addGirl () {
      await GameService.addGirl({
        id: this.selectedUser._id
      })
      this.$router.push({ name: 'Game' })
      this.getGirls()
    },
    async updateGirl (id) {
      await GameService.updateGirl(id)
      id: this.girl._id
      this.$router.push({name: 'Game'})
      this.getGirls()
    },
    async deleteGirl (id) {
      await GameService.deleteGirl(id)
      this.$router.push({ name: 'Game' })
      this.getGirls()
    },
    addNewTodo: function () {
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText,
        level: 0
      })
      this.newTodoText = ''
    },
    removeElement: function (index) {
      delete this.todos[index]
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
