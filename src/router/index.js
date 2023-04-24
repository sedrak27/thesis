import { createRouter, createWebHistory } from 'vue-router'
import Registration from "@/components/auth/Registration.vue";
import Login from "@/components/auth/Login.vue";
import Welcome from "@/components/Welcome.vue";
import Profile from "@/components/user/Profile.vue";
// import Main from "@/components/solutions/Main.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    // {
    //   path: '/solution',
    //   name: 'solution',
    //   component: Main,
    // },
  ]
})

export default router
