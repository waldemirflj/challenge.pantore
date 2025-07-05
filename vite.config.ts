import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/__tests__/**/*.test.ts'],
    exclude: ['dist', 'node_modules'],
    setupFiles: ['./node_modules/reflect-metadata'],
    reporters: ['verbose'],
    coverage: {
      provider: process.env.COVERAGE_PROVIDER === 'istanbul' ? 'istanbul' : 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: 'coverage',
      include: ['src/**/*.ts'],
      exclude: ['dist/**', 'src/**/dto/**', 'src/**/enum/**', 'src/**/__tests__/**'],
    },
  },
  plugins: [tsconfigPaths()],
});
