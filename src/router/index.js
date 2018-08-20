import Vue from 'vue'
import Router from 'vue-router'
import ProjectList from '@/views/ProjectList'
import Home from '@/views/Home'
import Test from '@/views/test'
import userRouterArr from './user.js'




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/projectList',
      name: 'ProjectList',
      component: ProjectList
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    ...userRouterArr
  ]
})
