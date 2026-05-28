<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import AppHeader from './components/AppHeader.vue'
import { useTheme } from './composables/useTheme'
import { useCartStore } from './stores/cart'

const cartStore = useCartStore()
const { totalItems } = storeToRefs(cartStore)
const { isDark, toggleTheme } = useTheme()
const isLoggedIn = ref(false)
const toggleLogin = () => {
  isLoggedIn.value = !isLoggedIn.value
}
</script>

<template>
  <div class="min-h-screen">
    <AppHeader
      :cart-count="totalItems"
      :is-dark="isDark"
      :is-logged-in="isLoggedIn"
      @toggle-theme="toggleTheme"
      @toggle-login="toggleLogin"
    />
    <RouterView />
  </div>
</template>
