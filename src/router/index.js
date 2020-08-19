import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'main' },
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    meta: { layout: 'main' },
    component: () => import('../views/About.vue')
  },
  {
    path: '/schedule',
    name: 'Schedule',
    meta: { layout: 'main' },
    component: () => import('../views/Schedule.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
