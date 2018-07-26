import Vue from 'vue'
import Router from 'vue-router'
import ProjectList from '@/views/ProjectList'
import Home from '@/views/Home'
//import userRouterArr from './user.js'
import UserManager from '@/views/UserManager'

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
      path: '/usermanager',
      name: 'UserManager',
      component: UserManager
    }
    //...userRouterArr
  ]
})
