<script setup lang="ts">
defineProps<{
  cartCount: number
  isDark: boolean
}>()

const emit = defineEmits<{
  (e: 'toggleTheme'): void
}>()
</script>

<template>
  <header class="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
      <h1 class="text-lg font-semibold tracking-tight sm:text-xl">DummyJSON Product Gallery</h1>
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:border-slate-700 dark:hover:bg-slate-800"
          :aria-pressed="isDark"
          @click="emit('toggleTheme')"
        >
          {{ isDark ? 'Light mode' : 'Dark mode' }}
        </button>
        <span
          class="rounded-full bg-indigo-600 px-3 py-1 text-sm font-semibold text-white"
          aria-live="polite"
          aria-label="Total cart items"
        >
          Cart: {{ cartCount }}
        </span>
      </div>
    </div>
  </header>
</template>
