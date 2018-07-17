<template>
  <div class="game">
    <h1>Add game</h1>
    <div class="form">    
	  
    <div>
    <form v-on:submit.prevent="addNewTodo">
    <label for="new-todo">Добавить девку</label>
    <input
      v-model="newTodoText"
      id="new-todo"
      placeholder="Имя конфетки"
    >
    <button>Добавить</button>
  </form>
  <ul>
    <li
      v-for="(todo, index) in todos"
      v-bind:key="todo.id"
      v-bind:title="todo.title"
    >{{todo.id +  todo.title }}<button v-on:click="addNewTodo11(todo)">Повысить</button><button v-on:click.prevent="removeElement(todo.id-1)">Удалить</button></li>
  </ul>
      </div>
    </div>
  </div>
</template>

<script>
  //import Vue from '@vue.vue'
  import GameService from '@/services/GameService'
  export default {
    name: 'Game',
    data () {
      return {
	   newTodoText: '',
	      description: '',
       todos: [
      {
        id: 1,
        title: 'Viki',
		level:0
      },
      {
        id: 2,
        title: 'Dana',
		level:0
      },
      {
        id: 3,
        title: 'Asakawa',
		level:0
      }
    ],
    nextTodoId: 4,
     
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
		level:0
      })
      this.newTodoText = ''
    },
		async valid11  (title) { 
		     console.log("dana da" +title)
       },
	   
	   removeElement : function(index){
       
	   delete this.todos[index];
	   this.$delete(this.todos, index);	
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