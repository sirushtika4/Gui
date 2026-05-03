<script setup lang="ts">
import type { DummyCategory } from '../types/dummyJson'

const props = defineProps<{
  modelValue: string
  selectedCategory: string
  categories: DummyCategory[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'update:selectedCategory', value: string): void
}>()

function onSearchInput(event: Event): void {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function onCategoryChange(event: Event): void {
  const target = event.target as HTMLSelectElement
  emit('update:selectedCategory', target.value)
}
</script>

<template>
  <section class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
    <h2 class="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">Filter products</h2>
    <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
      <label class="md:col-span-2">
        <span class="mb-1 block text-sm font-medium">Search</span>
        <input
          :value="props.modelValue"
          type="search"
          placeholder="Search by title or keyword..."
          class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:border-slate-700 dark:bg-slate-800"
          @input="onSearchInput"
        />
      </label>
      <label>
        <span class="mb-1 block text-sm font-medium">Category</span>
        <select
          :value="props.selectedCategory"
          class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:border-slate-700 dark:bg-slate-800"
          @change="onCategoryChange"
        >
          <option value="">All categories</option>
          <option v-for="category in props.categories" :key="category.slug" :value="category.slug">
            {{ category.name }}
          </option>
        </select>
      </label>
    </div>
  </section>
</template>
