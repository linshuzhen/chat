import Vue from 'vue'
import Router from 'vue-router'

const List = resolve => require(['@/views/service/list'], resolve);
const Detail = resolve => require(['@/views/service/detail'], resolve);
const Register = resolve => require(['@/views/accont/Register'], resolve);
const Login = resolve => require(['@/views/accont/Login'], resolve);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: List,
      meta: {
        auth: true
      }
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail,
      meta: {
        auth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    }
  ]
})
