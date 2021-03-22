import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/account/Login'
import Main from '@/pages/Main'

Vue.use(Router)

// 解决重复路由页面报错
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },

    {
      path: '/login',
      name: 'Login',
      component: Login
    },

    {
      name: 'main',
      path: '/',
      component: Main,
      children: [
        {
          name: 'Home',
          path: '/home',
          component: resolve => require(['../pages/home/List.vue'], resolve),
          meta: { requireAuth: true }
        }
      ]
    }
  ]
})
export default router
