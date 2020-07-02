/* jshint esversion: 6 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const constRouter = [
  // {
  //   path: '/',
  //   name: '首页',
  //   component: () => import('@/components/reconfiguration/index.vue')
  // }

  {
    path: '/login',
    name: '登录页',
    component: () => import('@/components/Login')
  },
  {
    path: '*',
    name: '主页面',
    redirect: '/login'
    // component: () => import('@/components/EarthBox')
  },
  {
    path: '/earth',
    name: '主页面',
    component: () => import('@/components/reconfiguration/index.vue')
  },
]
const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constRouter
})
router.afterEach(() => {
})
export default router
