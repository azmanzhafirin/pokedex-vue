import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import { store } from './store'
import { routes } from './router';
import BootstrapVue from "bootstrap-vue";

require("./shared/pokemonTypes.scss");


Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
