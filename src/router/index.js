import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from "firebase/app";

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
  {
      path: '/',
      name: 'Home',
      meta: { layout: 'home' },
      component: () => import('../views/Home.vue')
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
      meta: { layout: 'main', auth: true },
    component: () => import('../views/Schedule.vue')
  },
  {
    path: '/login',
        name: 'Login',
      meta: { layout: 'empty' },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/registration',
        name: 'Registration',
      meta: { layout: 'empty' },
    component: () => import('../views/Registration.vue')
  },
  {
    path: '/profile',
        name: 'Profile',
      meta: { layout: 'main', auth: true },
    component: () => import('../views/Profile.vue')
  },
    {
      path: '/faq',
      name: 'FAQ',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/FAQ.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
