import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Table from '../views/Table'
import Charts from '../views/Charts'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [

    // Default route
    {
      name: 'home',
      path: '/',
      component: Home
    },

    // Table component with station id parameter
    {
    	name: 'table',
      path: '/Station/:embayName/:id/Table',
      component: Table
    },

    // Chart component with station id parameter
    {
      name: 'charts',
      path: '/Station/:embayName/:id/Charts',
      component: Charts
    }
  ]
})
