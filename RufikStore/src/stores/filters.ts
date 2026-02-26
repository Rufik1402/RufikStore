import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Product } from '../types/product'

export type SortOrder = 'none' | 'price-asc' | 'price-desc'

export const useFiltersStore = defineStore('filters', () => {
  const products = ref<Product[]>([])
  const searchQuery = ref('')
  const sortOrder = ref<SortOrder>('none')
  const minPrice = ref<number | null>(null)
  const maxPrice = ref<number | null>(null)

  const filteredProducts = computed(() => {
    const normalizedSearch = searchQuery.value.trim().toLowerCase()

    const byFilters = products.value.filter((product) => {
      const titleMatch = product.title.toLowerCase().includes(normalizedSearch)
      const minMatch = minPrice.value === null || product.price >= minPrice.value
      const maxMatch = maxPrice.value === null || product.price <= maxPrice.value

      return titleMatch && minMatch && maxMatch
    })

    if (sortOrder.value === 'price-asc') {
      return [...byFilters].sort((a, b) => a.price - b.price)
    }

    if (sortOrder.value === 'price-desc') {
      return [...byFilters].sort((a, b) => b.price - a.price)
    }

    return byFilters
  })

  const setProducts = (newProducts: Product[]) => {
    products.value = newProducts
  }

  const updateMinPrice = (value: number | null) => {
    minPrice.value = value
  }

  const updateMaxPrice = (value: number | null) => {
    maxPrice.value = value
  }

  return {
    searchQuery,
    sortOrder,
    minPrice,
    maxPrice,
    filteredProducts,
    setProducts,
    updateMinPrice,
    updateMaxPrice,
  }
})
