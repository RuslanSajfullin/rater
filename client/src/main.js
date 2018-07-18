import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router/index'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
}).$mount('#app')