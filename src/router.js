import { createRouter, createWebHistory } from 'vue-router'
import Doodle from '/src/views/Doodle.vue'
import Home from '/src/views/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/doodle',
      component: Doodle,
    },
    {
      path: '/doodle/:roomId',
      component: Doodle,
      props: true,
    },
  ],
})

export default router
