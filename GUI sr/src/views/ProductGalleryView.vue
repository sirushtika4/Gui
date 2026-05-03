<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import CartSummary from '../components/CartSummary.vue'
import ProductCard from '../components/ProductCard.vue'
import ProductFilters from '../components/ProductFilters.vue'
import { fetchCategories, fetchProducts } from '../services/dummyJsonApi'
import { useCartStore } from '../stores/cart'
import type { Product } from '../types/dummyJson'
import type { DummyCategory } from '../types/dummyJson'

const cartStore = useCartStore()
const products = ref<Product[]>([])
const categories = ref<DummyCategory[]>([])
const searchQuery = ref('')
const selectedCategory = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const debouncedSearch = ref('')

let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(searchQuery, (query) => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  debounceTimer = setTimeout(() => {
    debouncedSearch.value = query
  }, 350)
})

async function loadProducts(): Promise<void> {
  isLoading.value = true
  errorMessage.value = ''
  try {
    products.value = await fetchProducts(debouncedSearch.value, selectedCategory.value)
  } catch {
    errorMessage.value = 'Unable to fetch products. Please try again.'
  } finally {
    isLoading.value = false
  }
}

watch([debouncedSearch, selectedCategory], () => {
  void loadProducts()
})

onMounted(async () => {
  isLoading.value = true
  try {
    const [loadedProducts, loadedCategories] = await Promise.all([fetchProducts(), fetchCategories()])
    products.value = loadedProducts
    categories.value = loadedCategories
  } catch {
    errorMessage.value = 'Unable to fetch products. Please check your connection.'
  } finally {
    isLoading.value = false
  }
})

const productsById = computed(() => new Map(products.value.map((product) => [product.id, product])))

function addProductById(productId: number): void {
  const product = productsById.value.get(productId)
  if (product) {
    cartStore.addToCart(product)
  }
}
</script>

<template>
  <main class="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:px-6 lg:grid-cols-4">
    <section class="space-y-4 lg:col-span-3">
      <ProductFilters
        v-model="searchQuery"
        v-model:selected-category="selectedCategory"
        :categories="categories"
      />
      <p v-if="errorMessage" class="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-700 dark:bg-red-950/40 dark:text-red-200">
        {{ errorMessage }}
      </p>
      <p v-if="isLoading" class="text-sm text-slate-600 dark:text-slate-300" aria-live="polite">Loading products...</p>
      <p v-else-if="products.length === 0" class="text-sm text-slate-600 dark:text-slate-300">No products match the current filters.</p>
      <div
        v-else
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
        role="list"
        aria-label="Product gallery"
      >
        <div v-for="product in products" :key="product.id" role="listitem">
          <ProductCard :product="product" @add-to-cart="cartStore.addToCart" />
        </div>
      </div>
    </section>

    <CartSummary
      class="self-start lg:sticky lg:top-20"
      :items="cartStore.items"
      :subtotal="cartStore.subtotal"
      @add="addProductById"
      @decrease="cartStore.decreaseItem"
      @remove="cartStore.removeItem"
      @clear="cartStore.clearCart"
    />
  </main>
</template>
