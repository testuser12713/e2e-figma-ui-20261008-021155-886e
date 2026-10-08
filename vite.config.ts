import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
    globals: false,
    // Only the unit/component tests under src/ belong to Vitest.
    // The office-owned Playwright smoke spec in e2e/ must not be collected here.
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
})
