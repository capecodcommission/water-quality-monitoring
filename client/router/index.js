import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Table from '../views/Table'
import Charts from '../views/Charts'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
    },
    {
    	name: 'table',
      path: '/Station/:id',
      component: Table
    },
    {
      name: 'charts',
      path: '/charts',
      component: Charts
    }
  ]
})
