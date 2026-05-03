import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { CartProduct, Product } from '../types/dummyJson'

const STORAGE_KEY = 'gui_sr_cart'

function getPersistedCart(): CartProduct[] {
  const cartSnapshot = localStorage.getItem(STORAGE_KEY)

  if (!cartSnapshot) {
    return []
  }

  try {
    return JSON.parse(cartSnapshot) as CartProduct[]
  } catch {
    return []
  }
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartProduct[]>(getPersistedCart())

  const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const subtotal = computed(() => items.value.reduce((sum, item) => sum + item.price * item.quantity, 0))

  function addToCart(product: Product): void {
    const existing = items.value.find((item) => item.id === product.id)

    if (existing) {
      existing.quantity += 1
      return
    }

    items.value.push({ ...product, quantity: 1 })
  }

  function decreaseItem(productId: number): void {
    const existing = items.value.find((item) => item.id === productId)

    if (!existing) {
      return
    }

    if (existing.quantity <= 1) {
      removeItem(productId)
      return
    }

    existing.quantity -= 1
  }

  function removeItem(productId: number): void {
    items.value = items.value.filter((item) => item.id !== productId)
  }

  function clearCart(): void {
    items.value = []
  }

  watch(
    items,
    (value) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    },
    { deep: true },
  )

  return { items, totalItems, subtotal, addToCart, decreaseItem, removeItem, clearCart }
})
