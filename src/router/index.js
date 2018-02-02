import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import Index from '@/components/index'
import Air from '@/components/air'


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
  ]
})
