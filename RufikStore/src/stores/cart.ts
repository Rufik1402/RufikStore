import {defineStore} from 'pinia';
import {ref, computed, watch} from 'vue';
import type {Product} from "../types/product";

export const useCartStore = defineStore('cart', () => {
    const items = ref<
        {
            product: Product
            quantity: number
    }[]
    >([])

    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
        items.value = JSON.parse(savedCart)
    }

    watch(
        items,
        (newItems) => {
            localStorage.setItem('cart', JSON.stringify(newItems));
        },
        {deep: true}
    )

    const totalCount = computed(() =>
        items.value.reduce((sum, item) => sum + item.quantity, 0))

    const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity * item.product.price, 0))

    const addToCart = (product: Product) => {
        const existingItem = items.value.find(
            item => item.product.id === product.id
        )

        if (existingItem) {
            existingItem.quantity += 1
        } else {
            items.value.push({
                product,
                quantity: 1
            })
        }
    }

    const findItem = (productId: number) => {
        return items.value.find(i => i.product.id === productId)
    }

    const increaseQuantity = (productId: number) => {
        const item = findItem(productId)
        if (item) item.quantity += 1
    }
    const decreaseQuantity = (productId: number) => {
        const item = findItem(productId)
        if (item) {
            item.quantity -= 1
            if (item.quantity <= 0) removeFromCart(productId)
        }
    }

    const removeFromCart = (productId: number) => {
        items.value = items.value.filter(item => item.product.id !== productId)
    }

    const clearCart = () => {
        items.value = []
    }

    return {
        items,
        totalCount,
        totalPrice,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
    }
})