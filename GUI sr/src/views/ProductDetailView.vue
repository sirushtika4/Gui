<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { fetchProductById } from '../services/dummyJsonApi'
import { useCartStore } from '../stores/cart'
import type { Product } from '../types/dummyJson'

const route = useRoute()
const cartStore = useCartStore()
const product = ref<Product | null>(null)
const isLoading = ref(true)
const errorMessage = ref('')

const productId = computed(() => Number(route.params.id))

onMounted(async () => {
  isLoading.value = true
  errorMessage.value = ''

  if (Number.isNaN(productId.value)) {
    errorMessage.value = 'Invalid product ID.'
    isLoading.value = false
    return
  }

  try {
    product.value = await fetchProductById(productId.value)
  } catch {
    errorMessage.value = 'Unable to load product details.'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <main class="mx-auto max-w-5xl px-4 py-6 sm:px-6">
    <RouterLink
      :to="{ name: 'gallery' }"
      class="inline-flex rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:border-slate-700 dark:hover:bg-slate-800"
    >
      Back to gallery
    </RouterLink>

    <p v-if="isLoading" class="mt-4 text-sm text-slate-600 dark:text-slate-300" aria-live="polite">Loading product details...</p>
    <p v-else-if="errorMessage" class="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-700 dark:bg-red-950/40 dark:text-red-200">
      {{ errorMessage }}
    </p>
    <article v-else-if="product" class="mt-4 grid gap-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:grid-cols-2">
      <img :src="product.thumbnail" :alt="product.title" class="h-72 w-full rounded-lg object-cover" />
      <div>
        <p class="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">{{ product.category }}</p>
        <h1 class="mt-1 text-2xl font-bold">{{ product.title }}</h1>
        <p class="mt-3 text-sm text-slate-700 dark:text-slate-300">{{ product.description }}</p>
        <ul class="mt-4 space-y-2 text-sm">
          <li><span class="font-semibold">Price:</span> ${{ product.price.toFixed(2) }}</li>
          <li><span class="font-semibold">Rating:</span> {{ product.rating }} / 5</li>
          <li><span class="font-semibold">Stock:</span> {{ product.stock }}</li>
          <li><span class="font-semibold">Brand:</span> {{ product.brand }}</li>
          <li><span class="font-semibold">Warranty:</span> {{ product.warrantyInformation }}</li>
        </ul>
        <button
          type="button"
          class="mt-5 inline-flex rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          @click="cartStore.addToCart(product)"
        >
          Add to Cart
        </button>
      </div>
    </article>
  </main>
</template>
