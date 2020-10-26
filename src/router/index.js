import Vue from 'vue'

//Vue Router
import VueRouter from 'vue-router'

//use vue router in vue
Vue.use(VueRouter)

//buat object vue router
const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () =>
                import("@/views/home/Index"),
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import("@/views/auth/Index"),
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () =>
                import("@/views/dashboard/Index")  
        },
    ],
    mode: 'history'
})

export default router