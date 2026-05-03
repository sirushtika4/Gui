import { createRouter, createWebHistory } from 'vue-router'
import ProductDetailView from '../views/ProductDetailView.vue'
import ProductGalleryView from '../views/ProductGalleryView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'gallery',
      component: ProductGalleryView,
    },
    {
      path: '/product/:id',
      name: 'productDetail',
      component: ProductDetailView,
      props: true,
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
