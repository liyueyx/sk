import Vue from 'vue'
import Router from 'vue-router'
/*import Home from '@/views/Home'
import ProjectList from '@/views/ProjectList'
import Test from '@/views/test'*/
import userRouterArr from './user.js'

const Home = resolve => require(['../views/Home'],resolve);
const ProjectList = resolve => require(['../views/ProjectList'],resolve);
const Test = resolve => require(['../views/Test'],resolve);





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
