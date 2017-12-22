import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './components/App'
import router from './router'
import store from './store'
import $ from 'jquery'
window.$ = $

import {ClientTable} from 'vue-tables-2';

Vue.use(ClientTable);

// var plotly = require('plotly')("capecodcommission", "AzpU2sNELWO5ePF7rkNi")


sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }
