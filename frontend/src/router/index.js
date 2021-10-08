import { createRouter, createWebHistory} from 'vue-router';
import Login from '@/views/Login.vue';
import Signup from '@/views/Signup.vue';
import Home from '@/views/Home.vue';
import MonProfil from '@/views/MonProfil.vue';

const routes = [
    {
        name: 'Login',
        path:'/Login',
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
    }
];
const router = createRouter({
    mode: 'history',
    history: createWebHistory(),
    routes
})

export default router;
  