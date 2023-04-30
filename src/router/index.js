import { createRouter, createWebHistory } from 'vue-router'
import Registration from "@/components/auth/Registration.vue";
import Login from "@/components/auth/Login.vue";
import Welcome from "@/components/Welcome.vue";
import Profile from "@/components/user/Profile.vue";
import Home from "@/components/home/Main.vue";
import AddSolution from "@/components/solutions/AddSolution.vue";
import Main from "@/components/solutions/Main.vue";

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
    {
      path: '/posts',
      name: 'main',
      component: Home,
    },
    {
      path: '/solution/add',
      name: 'AddSolution',
      component: AddSolution,
    },
    {
      path: '/solution',
      name: 'solution',
      component: Main,
      props: {
        propDepartmentData: JSON.parse(localStorage.getItem('departmentData')),
      }
    },
  ]
})

export default router
