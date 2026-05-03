<script setup lang="ts">
import type { Product } from '../types/dummyJson'

defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  (e: 'addToCart', product: Product): void
}>()
</script>

<template>
  <article class="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
    <img
      :src="product.thumbnail"
      :alt="product.title"
      class="mb-3 h-44 w-full rounded-lg object-cover"
      loading="lazy"
    />
    <p class="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">{{ product.category }}</p>
    <h3 class="mt-1 text-lg font-semibold">{{ product.title }}</h3>
    <p class="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">{{ product.description }}</p>
    <div class="mt-auto pt-4">
      <p class="text-lg font-bold">${{ product.price.toFixed(2) }}</p>
      <div class="mt-3 flex gap-2">
        <RouterLink
          :to="{ name: 'productDetail', params: { id: product.id } }"
          class="inline-flex flex-1 items-center justify-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          Details
        </RouterLink>
        <button
          type="button"
          class="inline-flex flex-1 items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          @click="emit('addToCart', product)"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </article>
</template>
