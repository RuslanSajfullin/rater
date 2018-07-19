<template>
  <div class="game">
    <h1>Add game</h1>
    <div class="form">
  
	      <div id="app">
		  <ui>
		 
    <select v-model="selectedUser">
        <option v-for="user in users" v-bind:value="user.name">{{user.name}}</option>
	    </select>


	</ui>
</div>
<agile>
    <div class="slide slide--1"><h3>Выбрано: {{selectedUser}}</h3></div>
</agile>
    </div>

  </div>
</template>
<script>
import GameService from '@/services/GameService'
export default {
  name: 'Game',
  data () {
    return {
      newTodoText: '',
      description: '',
      users:[
                {name:'Asakawa', age:22},
                {name:'Vikki', age:25},
                {name:'Dana', age:28},
                {name:'Alice', age:26}
            ],
            selectedUser:''
    }
  },
  methods: {
    async addGame () {
      await GameService.addGame({
        title: this.title,
        description: this.description
      })
      this.$router.push({ name: 'Game' })
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
