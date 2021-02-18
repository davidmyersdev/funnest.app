import { createRouter, createWebHistory } from 'vue-router'
import Doodle from '/src/views/Doodle.vue'
import Home from '/src/views/Home.vue'
import Invite from '/src/components/Invite.vue'
import Room from '/src/components/Room.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      name: 'doodle',
      path: '/doodle',
      component: Doodle,
    },
    {
      name: 'doodle_invite',
      path: '/doodle/invites/:inviteId',
      component: Invite,
      props: true,
    },
    {
      name: 'doodle_room',
      path: '/doodle/rooms/:roomId',
      component: Room,
      props: true,
    },
  ],
})

export default router
