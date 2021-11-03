import { createRouter, createWebHistory} from 'vue-router';
import Login from '@/views/Login.vue';
import Signup from '@/views/Signup.vue';
import Home from '@/views/Home.vue';
import MonProfil from '@/views/MonProfil.vue';
import UpdatedProfil from '@/views/UpdatedProfil.vue'

import {isAuthenticated} from "../helpers" 

const routes = [
    {
        name: 'Login',
        path:'/',
        component: Login,
    }, {
        name: 'Signup',
        path:'/Signup',
        component: Signup,
    }, {
        name: 'Home',
        path:'/Home',
        component: Home,
        meta: {
            requiresAuth: true
        }
    }, {
        name:'MonProfil',
        path:'/MonProfil',
        component: MonProfil,
        meta: {
            requiresAuth: true
        }
    }, {
        name:'UpdatedProfil',
        path: '/UpdatedProfil',
        component: UpdatedProfil,
        meta: {
            requiresAuth: true
        }
    }
];
const router = createRouter({
    mode: 'history',
    history: createWebHistory(),
    routes
})
//vérifie si l'utilisateur est déjà connecté 
router.beforeEach((to, from, next) => {
    if (!isAuthenticated) next({ name: '/' }) //si pas connecté il est redirigé vers page login
    else  if (to.name == '/' && isAuthenticated) next({ name: 'Home' }) //si connecté il est redirigé vers page accueil
    else next()
  })

export default router;
  