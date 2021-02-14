import { createRouter, createWebHistory } from 'vue-router'
import Doodle from '@/views/Doodle.vue'
import Home from '@/views/Home.vue'

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
      path: '/doodle/:room_id',
      component: Doodle,
      props: true,
    },
  ],
})

export default router
