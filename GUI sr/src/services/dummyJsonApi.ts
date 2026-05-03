import type { DummyCategory, DummyPaginatedResponse, Product } from '../types/dummyJson'

const API_BASE_URL = 'https://dummyjson.com'

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return (await response.json()) as T
}

export async function fetchProducts(search = '', category = ''): Promise<Product[]> {
  const normalizedSearch = search.trim()

  if (normalizedSearch.length > 0) {
    const result = await request<DummyPaginatedResponse<Product>>(
      `/products/search?q=${encodeURIComponent(normalizedSearch)}`,
    )
    return category ? result.products.filter((product) => product.category === category) : result.products
  }

  if (category) {
    const result = await request<DummyPaginatedResponse<Product>>(
      `/products/category/${encodeURIComponent(category)}`,
    )
    return result.products
  }

  const result = await request<DummyPaginatedResponse<Product>>('/products?limit=100')
  return result.products
}

export async function fetchProductById(productId: number): Promise<Product> {
  return request<Product>(`/products/${productId}`)
}

export async function fetchCategories(): Promise<DummyCategory[]> {
  return request<DummyCategory[]>('/products/categories')
}
