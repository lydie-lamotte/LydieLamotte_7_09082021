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
        name: 'Signup',
        path:'/Signup',
        component: Signup,
    }, {
        name: 'Home',
        path:'/Home',
        component: Home,
    },

];
const router = createRouter({
    mode: 'history',
    history: createWebHistory(),
    routes
})

export default router;
  