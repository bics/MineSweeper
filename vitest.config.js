/*Code block taken from chatGPT*/
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // Enables `document`, `window`, etc.
  },
});
