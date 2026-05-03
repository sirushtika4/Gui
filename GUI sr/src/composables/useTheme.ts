import { computed, onMounted, ref, watch } from 'vue'

type Theme = 'light' | 'dark'

const THEME_KEY = 'gui_sr_theme'

export function useTheme() {
  const theme = ref<Theme>('light')

  const isDark = computed(() => theme.value === 'dark')

  function applyTheme(value: Theme): void {
    theme.value = value
    document.documentElement.classList.toggle('dark', value === 'dark')
    localStorage.setItem(THEME_KEY, value)
  }

  function toggleTheme(): void {
    applyTheme(theme.value === 'light' ? 'dark' : 'light')
  }

  onMounted(() => {
    const savedTheme = localStorage.getItem(THEME_KEY)
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme: Theme =
      savedTheme === 'dark' || savedTheme === 'light' ? (savedTheme as Theme) : systemPrefersDark ? 'dark' : 'light'
    applyTheme(initialTheme)
  })

  watch(theme, (value) => {
    document.documentElement.classList.toggle('dark', value === 'dark')
  })

  return { theme, isDark, toggleTheme }
}
