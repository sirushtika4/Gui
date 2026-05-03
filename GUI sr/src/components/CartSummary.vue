<script setup lang="ts">
import type { CartProduct } from '../types/dummyJson'

defineProps<{
  items: CartProduct[]
  subtotal: number
}>()

const emit = defineEmits<{
  (e: 'add', id: number): void
  (e: 'decrease', id: number): void
  (e: 'remove', id: number): void
  (e: 'clear'): void
}>()
</script>

<template>
  <aside class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
    <div class="mb-3 flex items-center justify-between">
      <h2 class="text-base font-semibold">Shopping Cart</h2>
      <button
        type="button"
        class="text-sm font-medium text-red-600 hover:underline disabled:cursor-not-allowed disabled:opacity-40"
        :disabled="items.length === 0"
        @click="emit('clear')"
      >
        Clear
      </button>
    </div>

    <ul v-if="items.length > 0" class="space-y-3">
      <li v-for="item in items" :key="item.id" class="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-sm font-semibold">{{ item.title }}</p>
            <p class="text-xs text-slate-600 dark:text-slate-300">${{ item.price.toFixed(2) }} each</p>
          </div>
          <button
            type="button"
            class="text-xs font-medium text-red-600 hover:underline"
            :aria-label="`Remove ${item.title} from cart`"
            @click="emit('remove', item.id)"
          >
            Remove
          </button>
        </div>
        <div class="mt-2 flex items-center gap-2">
          <button
            type="button"
            class="h-7 w-7 rounded-md border border-slate-300 text-sm dark:border-slate-700"
            :aria-label="`Decrease quantity of ${item.title}`"
            @click="emit('decrease', item.id)"
          >
            -
          </button>
          <span class="text-sm font-medium">Qty: {{ item.quantity }}</span>
          <button
            type="button"
            class="h-7 w-7 rounded-md border border-slate-300 text-sm dark:border-slate-700"
            :aria-label="`Increase quantity of ${item.title}`"
            @click="emit('add', item.id)"
          >
            +
          </button>
        </div>
      </li>
    </ul>
    <p v-else class="text-sm text-slate-600 dark:text-slate-300">Your cart is empty.</p>

    <p class="mt-4 border-t border-slate-200 pt-3 text-sm font-semibold dark:border-slate-700">
      Subtotal: ${{ subtotal.toFixed(2) }}
    </p>
  </aside>
</template>
