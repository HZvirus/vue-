import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import Index from '@/components/index'
import Air from '@/components/air'
import Citylist from '@/components/citylist'


Vue.use(Router)
Vue.use(Vuex)
export default new Router({
  routes: [
  	{
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/air',
      name: 'Air',
      component: Air
    },
    {
      path: '/citylist',
      name: 'Citylist',
      component: Citylist
    },
  ]
})
