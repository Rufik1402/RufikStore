import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ProductPage from '../pages/ProductPage.vue'
import CartPage from '../pages/CartPage.vue'
import CheckoutPage from "../pages/CheckoutPage.vue";
import SuccessPage from "../pages/SuccessPage.vue";
import {useCartStore} from "../stores/cart.ts";
const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },
    {
        path: '/product/:id',
        name: 'product',
        component: ProductPage
    },
    {
        path: '/cart',
        name: 'cart',
        component: CartPage
    },
    {
        path: '/checkout',
        name: 'checkout',
        component: CheckoutPage,
        beforeEnter: () => {
            const cart = useCartStore()

            if (cart.items.length === 0) {
                return '/'
            }
        }
    },
    {
        path: '/success',
        name: 'success',
        component: SuccessPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router