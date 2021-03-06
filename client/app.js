import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './components/App'
import router from './router'
import store from './store'
import $ from 'jquery'
var _ = require('lodash');
var moment = require('moment')
window.$ = $

require('offline-plugin/runtime').install();

import {ClientTable} from 'vue-tables-2';

Vue.use(ClientTable);


sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }
