<script setup lang="ts">
import { storeToRefs } from 'pinia'
import AppHeader from './components/AppHeader.vue'
import { useTheme } from './composables/useTheme'
import { useCartStore } from './stores/cart'

const cartStore = useCartStore()
const { totalItems } = storeToRefs(cartStore)
const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <div class="min-h-screen">
    <AppHeader :cart-count="totalItems" :is-dark="isDark" @toggle-theme="toggleTheme" />
    <RouterView />
  </div>
</template>
