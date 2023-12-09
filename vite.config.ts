import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: false,
    coverage: {
      provider: 'v8',
      reporter: ['text'],
      all: true,
      exclude: [
        ...configDefaults.exclude,
        'src/types/*',
        'src/constants/*',
        '**/*.d.ts ',
        'src/mock/*',
        'src/main.tsx',
      ],
    },
  },
});
