import { createRouter, createWebHistory } from "vue-router";
import TheHome from './components/pages/TheHome.vue';
import LoginPage from './components/pages/LoginPage.vue';
import SignupPage from './components/pages/SignupPage.vue';
import pageNotFound from './components/pages/pageNotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path:'/',
            redirect: '/home'
        },
        {
            path: "/signup",
            name: "signup",
            component: SignupPage
        },
        {
            path: "/login",
            name: "login",
            component: LoginPage,
        },
        {
            path: "/home",
            name: "home",
            component: TheHome,
            meta: {
                requiresAuth: true
            },
            //setting auth gaurd for the home page
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('auth') === 'true') {
                    next();
                }
                else {
                    next('/login');
                }    
            }
        },
        {
            path: '/:pathMatch(.*)*',
            name: '404',
            component: pageNotFound
        }]
    })

export default router;