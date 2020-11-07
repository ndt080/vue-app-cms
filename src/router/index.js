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
        meta: { layout: 'home', auth: true  },
        component: () => import('../views/Home.vue')
    },
    {
      path: '/login',
      name: 'Login',
      meta: { layout: 'empty', auth: false  },
      component: () => import('../views/Login.vue')
    },
    {
      path: '/about',
      name: 'About',
      meta: { layout: 'empty' },
      component: () => import('../views/About.vue')
    },
    {
      path: '/schedule',
      name: 'Schedule',
      meta: { layout: 'main', auth: true,  data: 'schedule'},
      component: () => import('../views/Schedule.vue')
    },
    {
      path: '/queue',
      name: 'Queue',
      meta: { layout: 'main', auth: true, data: 'queue'},
      component: () => import('../views/Schedule.vue')
    },
    {
      path: '/faq',
      name: 'FAQ',
      meta: { layout: 'empty' },
      component: () => import('../views/FAQ.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
