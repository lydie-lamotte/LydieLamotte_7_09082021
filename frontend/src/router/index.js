import { createRouter, createWebHistory} from 'vue-router';
import Login from '@/views/Login.vue';
import Signup from '@/views/Signup.vue';
import Home from '@/views/Home.vue';
import MonProfil from '@/views/MonProfil.vue';
import UpdatedProfil from '@/views/UpdatedProfil.vue'

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
    }, {
        name:'MonProfil',
        path:'/MonProfil',
        component: MonProfil,
    }, {
        name:'UpdatedProfil',
        path: '/UpdatedProfil',
        component: UpdatedProfil,
    }
];
const router = createRouter({
    mode: 'history',
    history: createWebHistory(),
    routes
})

export default router;
  