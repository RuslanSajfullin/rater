// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// Импорт компонента App
import App from './App'
// Импорт роутера vue
import VueRouter from 'vue-router'
// Говорим Vue использовать маршрутизатор
Vue.use(VueRouter)
// Испортируем пути
import routes from './router/index'
// Создаем экземпляр маршрутизатора и передаем
// опцию `routes`. Здесь вы можете передать
// дополнительные опции, но мы пока не будем
const router = new VueRouter({
  routes,
  mode: 'history'
})

Vue.config.productionTip = false

//Установка экземпляра Vue
new Vue({
//Определяем селектор для корневого компонента
  el: '#app',
  // Передаем шаблон корневому компоненту
  template: '<App/>',
  // Объявляем компоненты, к которым корневой
  // компонент может получить доступ
  components: { App },
  // Передаем в роутер экземпляр Vue
  router
}).$mount('#app')// Монтируем роутер в приложении
