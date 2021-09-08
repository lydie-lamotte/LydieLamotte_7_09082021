import { createRouter, createWebHistory} from 'vue-router';
import Login from '@/views/Login.vue';
import Signup from '@/views/Signup.vue';
import Home from '@/views/Home.vue';

const routes = [
    {
        name: 'Login',
        path:'/',
        component: Login,
    }, {
        name: 'signup',
        path:'/signup',
        component: Signup,
    }, {
        name: 'home',
        path:'/home',
        component: Home,
    },

];
const router = createRouter({
    mode: 'history',
    history: createWebHistory(),
    routes
})

export default router;
  