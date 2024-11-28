import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 80,
  },
  define: {
    'import.meta.env.VITE_GOOGLE_API_KEY': {
      type: 'string',
      value: process.env.GOOGLE_API_KEY
    },
  }
})
