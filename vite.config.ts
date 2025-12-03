import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
// Vite configuration with React support and a proxy setup to forward /api requests to the external StarNavi API.
export default defineConfig({
  plugins: [react()],
  base: '/starnavi-test-task/',
});
