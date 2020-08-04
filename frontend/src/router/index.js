import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import Files from '@/views/Files'

import Error403 from '@/views/errors/403'
import Error404 from '@/views/errors/404'
import Error500 from '@/views/errors/500'
import store from '@/store'
import { baseURL } from '@/utils/constants'

Vue.use(Router)

const router = new Router({
  base: baseURL,
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if (store.getters.isLogged) {
          return next({ path: '/files' })
        }

        document.title = 'Login'
        next()
      }
    },
    {
      path: '/*',
      component: Layout,
      children: [
        {
          path: '/share/*',
          name: 'Share',
          component: Files
        },
        {
          path: '/files/*',
          name: 'Files',
          component: Files,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/403',
          name: 'Forbidden',
          component: Error403
        },
        {
          path: '/404',
          name: 'Not Found',
          component: Error404
        },
        {
          path: '/500',
          name: 'Internal Server Error',
          component: Error500
        },
        {
          path: '/files',
          redirect: {
            path: '/files/'
          }
        },
        {
          path: '/*',
          redirect: to => `/files${to.path}`
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.name

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLogged) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })

      return
    }

    if (to.matched.some(record => record.meta.requiresAdmin)) {
      if (!store.state.user.perm.admin) {
        next({ path: '/403' })
        return
      }
    }
  }

  next()
})

export default router
