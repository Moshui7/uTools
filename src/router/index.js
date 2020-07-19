import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

const routes = [
  {
    path: '/slidshow/my',
    component: () => import('@/components/slideshow/q')
  },
  {
    path: '/slidshow/temp1',
    component: ()=>import('@/components/slideshow/inde1x')
  }
]

const router = new Router({
  routes
})

export default router